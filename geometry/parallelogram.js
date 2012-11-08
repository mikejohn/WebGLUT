/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-8
 * Time: 上午11:21
 * To change this template use File | Settings | File Templates.
 */
/**
 * 平行四边形A,B,C,D四个顶点，假定A点位于坐标原点，给定B,D点坐标绘制。
 * 绘制完成后，将平行四边形中心移至坐标原点。
 * @param pointBvec2
 * @param pointDvec2
 * @param hSegmentNumber
 * @param vSegmentNumber
 * @constructor
 */
var Parallelogram = function (pointBvec2,pointDvec2,hSegmentNumber,vSegmentNumber) {
    Object3D.call(this);
    this.xb = pointBvec2[0];
    this.yb = pointBvec2[1];
    this.xd = pointDvec2[0];
    this.yd = pointDvec2[1];
    this.hSegmentNumber = hSegmentNumber;
    this.vSegmentNumber = vSegmentNumber;
    this._build();
};
Parallelogram.prototype = {
    constructor : Parallelogram,
    _build : function () {
        var xb = this.xb,
            yb = this.yb,
            xd = this.xd,
            yd = this.yd,
            half_width = (xd+xb)/ 2,
            half_height = (yd +yb)/ 2,
            hSegmentNum = this.hSegmentNumber,
            vSegmentNum = this.vSegmentNumber,
            hVertexNum = hSegmentNum+1,
            vVertexNum = vSegmentNum+ 1,
            hSegmentLength = {
                x : xd/hSegmentNum,
                y : yd/hSegmentNum
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
        var elementLength = 6;
        numberOfRow = elementLength*hElementNum;
        for (i = 0; i < vElementNum; i++) {
            for (j = 0; j < hElementNum; j++) {
                element[i * numberOfRow + j * elementLength] = j + i * hVertexNum;
                element[i * numberOfRow + j * elementLength + 1] = j + (i + 1) * hVertexNum;
                element[i * numberOfRow + j * elementLength + 2] = j + 1 + i * hVertexNum;
                element[i * numberOfRow + j * elementLength + 3] = j + (i + 1) * hVertexNum;
                element[i * numberOfRow + j * elementLength + 4] = j + 1 + i * hVertexNum;
                element[i * numberOfRow + j * elementLength + 5] = j + (i + 1) * hVertexNum + 1;
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
Parallelogram.extends(Object3D);
