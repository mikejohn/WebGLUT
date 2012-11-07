/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 11/5/12
 * Time: 11:28 PM
 * To change this template use File | Settings | File Templates.
 */
var Line = function (length,segmentNumber) {
    Object3D.call(this);
    this.length = length;
    this.segmentNumber = segmentNumber;
    this.vertexBuffer = null;
    this._build();
};
Line.prototype = {
    constructor:Line,
    _build : function () {
        var length = this.length,
            segmentNumber = this.segmentNumber;
            segmetn_length = length/segmentNumber;
            half_length = length/2;
        var vertex = [];
        var vertexLength =3;
        for(var i=0;i<=segmentNumber;i++) {
            vertex[i*vertexLength] = i*segmetn_length - half_length;
            vertex[i*vertexLength+1] = 0;
            vertex[i*vertexLength+2] = 0;
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
Line.extends(Object3D);