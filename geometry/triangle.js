/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-8
 * Time: 下午12:26
 * To change this template use File | Settings | File Templates.
 */

/**
 * 三角形A,B,C,三个顶点，假定A点位于坐标原点，给定B,C点坐标绘制。
 * 绘制完成后，将三角形中心移至坐标原点。
 * @param pointBvec2
 * @param pointCvec2
 * @param hSegmentNumber
 * @param vSegmentNumber
 * @constructor
 */
var Triangle = function (pointBvec2,pointCvec2,segmentNumber) {
    Object3D.call(this);
    this.xb = pointBvec2[0];
    this.yb = pointBvec2[1];
    this.xc = pointCvec2[0];
    this.yc = pointCvec2[1];
    this.hSegmentNumber = segmentNumber;
    this.vSegmentNumber = segmentNumber;
    this._build();
};
Triangle.prototype = {
    constructor : Triangle,
    _build : function () {
        var xb = this.xb,
            yb = this.yb,
            xc = this.xc,
            yc = this.yc,
            half_width = (xc+xb)/ 4,
            half_height = (yc +yb)/ 4,
            hSegmentNum = this.hSegmentNumber,
            vSegmentNum = this.vSegmentNumber,
            hVertexNum = hSegmentNum+1,
            vVertexNum = vSegmentNum+ 1,
            hSegmentLength = {
                x : xc/hSegmentNum,
                y : yc/hSegmentNum
            },
            vSegmentLength = {
                x : -xb/vSegmentNum,
                y : -yb/vSegmentNum

            };
        var vertex = [];
        var vertexLength = 3;
        var numberOfRow = vertexLength*hVertexNum;
        for(var i=0;i<vVertexNum;i++) {
            for(var j=0;j<hVertexNum;j++) {
                vertex[i*numberOfRow+j*vertexLength] = xb+i*vSegmentLength.x + j*hSegmentLength.x - half_width;
                vertex[i*numberOfRow+j*vertexLength+1] = yb+i*vSegmentLength.y + j*hSegmentLength.y - half_height;
                vertex[i*numberOfRow+j*vertexLength+2] = 0;
            }
        }
        var element = [],
            hElementNum= hSegmentNum,
            vElementNum= vSegmentNum;
        var index = 0;
        for (i = 0; i < vElementNum; i++) {
            for (j = 0; j <=i; j++) {
                if(j<i) {
                    element[index++] = j + i * hVertexNum;
                    element[index++] = j + (i + 1) * hVertexNum;
                    element[index++] = j + 1 + (i + 1) * hVertexNum;
                    element[index++] = j + i * hVertexNum;
                    element[index++] = j + i * hVertexNum+1;
                    element[index++] = j + 1 + (i + 1) * hVertexNum;
                } else {
                    element[index++] = j + i * hVertexNum;
                    element[index++] = j + (i + 1) * hVertexNum;
                    element[index++] = j + 1 + (i + 1) * hVertexNum;
                }
            }
        }
        this.vertexs = vertex;
        this.elements = element;
        this._elementArrayLength = element.length;
        this._debugArrayLength = vertex.length/3;
    },
    pushGPU:function () {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);
        this.elementBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elements), gl.STATIC_DRAW);
    },
    draw:function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.drawElements(gl.TRIANGLES, this._elementArrayLength, gl.UNSIGNED_SHORT, 0);
    },
    _debug:function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.drawArrays(gl.POINTS, 0, this._debugArrayLength);
    }
};
Triangle.extends(Object3D);
