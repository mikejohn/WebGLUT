/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-8
 * Time: 下午12:55
 * To change this template use File | Settings | File Templates.
 */
var BezierCurve = function (points,segmentNumber) {
    Object3D.call(this);
    this.points = points;
    this.segmentNumber = segmentNumber;
    this._build();
};
BezierCurve.prototype = {
    constructor : BezierCurve,
    _build : function () {
        var points = this.points;
        var mSize = points.length;

        var mC = [];
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
        function CalcPoint(t) {
            var p = vec3.create();
            for (var i = 0; i < mSize; i++){
                p[0] += points[i][0]* mC[i] * t_value(t, mSize - 1, i);
                p[1] += points[i][1]* mC[i] * t_value(t, mSize - 1, i);
                p[2] += points[i][2]* mC[i] * t_value(t, mSize - 1, i);
            }
            return p;
        }
        var segmentNum = this.segmentNumber,segmentLength = 1/segmentNum;
        var vertex = [],index= 0;
        for(var i=0;i<segmentNum;i++) {
            var point = CalcPoint(i*segmentLength);
            vertex[index++] = point[0];
            vertex[index++] = point[1];
            vertex[index++] = point[2];
        }
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
BezierCurve.extends(Object3D);


