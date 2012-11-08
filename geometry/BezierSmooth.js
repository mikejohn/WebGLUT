/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-8
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */
var BezierSmooth = function (points , detail_num , sharp_factor) {
    Object3D.call(this);
    this.points = points;
    this.detail_num = detail_num;
    this.sharp_factor = sharp_factor;
    this.segmentNumber = (points.length - 3)*detail_num+1;
    this._build();
};
BezierSmooth.prototype = {
    constructor : BezierSmooth,
    _build : function () {
        var points = this.points,
            detail_num = this.detail_num,
            sharp_factor = this.sharp_factor;
        if (points.length < 4) {
            return points;
        }
        sharp_factor = sharp_factor>=1?1:sharp_factor;
        sharp_factor = sharp_factor<=0?0:sharp_factor;
        sharp_factor *= .5;

        var n = points.length;
        var vertex = [];
        var cp = [];
        var index=0;
        for (var i = 0; i + 3 < n; ++i) {
            var p0 = points[i], p1 = points[i+1], p2 = points[i+2], p3 = points[i+3];
            var m1 = vec3.create((p0[0] + p1[0])*.5,(p0[1] + p1[1])*.5,(p0[2] + p1[2])*.5),
                m2 = vec3.create((p1[0] + p2[0])*.5,(p1[1] + p2[1])*.5,(p1[2] + p2[2])*.5),
                m3 = vec3.create((p2[0] + p3[0])*.5,(p2[1] + p3[1])*.5,(p2[2] + p3[2])*.5);
            var v1 = vec3.create((m2[0] - m1[0])*sharp_factor,(m2[1] - m1[1])*sharp_factor,(m2[2] - m1[2])*sharp_factor),
                v2 = vec3.create((m3[0] - m2[0])*sharp_factor,(m3[1] - m2[1])*sharp_factor,(m3[2] - m2[2])*sharp_factor);
            cp[0] = p1,
            cp[1] = vec3.create(p1[0] + v1[0],p1[1] + v1[1],p1[2] + v1[2]),
            cp[2] = vec3.create(p2[0] - v2[0],p2[1] - v2[1],p2[2] - v2[2]),
            cp[3] = p2;
            var bz  = new Bezier(cp);
            for (var j = 0; j < detail_num; ++j) {
                var point = bz.calcPoint(j / detail_num);
                vertex[index++] = point[0];
                vertex[index++] = point[1];
                vertex[index++] = point[2];
            }
        }
        vertex[index++] = points[points.length-2][0];
        vertex[index++] = points[points.length-2][1];
        vertex[index++] = points[points.length-2][2];
        this.vertexs = vertex;
    },
    pushGPU:function () {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);
    },
    draw:function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, this.segmentNumber);
    },
    _debug:function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.drawArrays(gl.POINTS, 0, this.segmentNumber+1);

    }
};
BezierSmooth.extends(Object3D);
//function BezierSmooth(points , detail_num , sharp_factor, smooth ) {
//    if (point.length < 4) {
//        return point;
//    }
//    sharp_factor = sharp_factor>=1?1:sharp_factor;
//    sharp_factor = sharp_factor<=0?0:sharp_factor;
//    sharp_factor *= .5;
//
//    var n = point.length;
//    var cp = [];
//    var index=0;
//    for (var i = 0; i + 3 < n; ++i) {
//        var p0 = point[i], p1 = point[i+1], p2 = point[i+2], p3 = point[i+3];
//        var m1 = vec3.create((p0[0] + p1[0])*.5,(p0[1] + p1[1])*.5,(p0[2] + p1[2])*.5),
//            m2 = vec3.create((p1[0] + p2[0])*.5,(p1[1] + p2[1])*.5,(p1[2] + p2[2])*.5),
//            m3 = vec3.create((p2[0] + p3[0])*.5,(p2[1] + p3[1])*.5,(p2[2] + p3[2])*.5);
//        var v1 = vec3.create((m2[0] - m1[0])*sharp_factor,(m2[1] - m1[1])*sharp_factor,(m2[2] - m1[2])*sharp_factor),
//            v2 = vec3.create((m3[0] - m2[0])*sharp_factor,(m3[1] - m2[1])*sharp_factor,(m3[2] - m2[2])*sharp_factor);
//        var cp[0] = p1;
//            cp[1] = vec3.create(p1[0] + v1[0],p1[1] + v1[1],p1[2] + v1[2]),
//            cp[2] = vec3.create(p2[0] - v2[0],p2[1] - v2[1],p2[2] - v2[2]),
//            cp[3] = p2;
//        var bz  = new Bezier(cp);
//        for (var j = 0; j < detail_num; ++j) {
//            var point = bz.calcPoint(j / detail_num);
//            smooth[index++] = point[0];
//            smooth[index++] = point[1];
//            smooth[index++] = point[2];
//        }
//    }
//    return smooth;
//}
var Bezier = function (points) {
    this.points = points;
    this.mSize = points.length;
    this.mC = null;
    this._init();
};
Bezier.prototype = {
  _init : function () {
      var mC = [],mSize = this.mSize;
      var h = Math.floor((mSize + 1) / 2), m = mSize - 1;
      for (var i = 0; i < h; i++) {
          mC[i] = Comb(m, i);
      }
      for (var i = h; i < mSize; i++) {
          mC[i] = mC[m - i];
      }
      function Comb(n,p) {
          if (p == 0 || p == n) return 1;
          var a = 1;
          for (var i = p + 1; i <= n; i++) {
              a = a * i / (i - p);
          }
          return a;
      }
      this.mC = mC;
  },
  calcPoint : function (t) {
      var points = this.points,mC = this.mC,mSize = this.mSize;
      var p = vec3.create();
      for (var i = 0; i < mSize; i++){
          p[0] += points[i][0]* mC[i] * t_value(t, mSize - 1, i);
          p[1] += points[i][1]* mC[i] * t_value(t, mSize - 1, i);
          p[2] += points[i][2]* mC[i] * t_value(t, mSize - 1, i);
      }
      function t_value(t, n, i) {
          var a = 1.0, nt = 1 - t;
          for (var k = 0; k < i; k++) {
              a *= t
          }
          for (var k = 0; k < n - i; k++) {
              a *= nt;
          }
          return a;
      }
      return p;

  }
};