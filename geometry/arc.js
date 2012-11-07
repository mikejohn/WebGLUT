/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-7
 * Time: 下午4:24
 * To change this template use File | Settings | File Templates.
 */
var Arc = function (radio,startTheta,endTheta,segmentNumber) {
    Object3D.call(this);
    this.radio = radio;
    this.startTheta = startTheta;
    this.endTheta = endTheta;
    this.segmentNumber = segmentNumber;
    this.vertexBuffer = null;
    this._build();
};
Arc.prototype = {
    constructor : Arc,
    _build : function () {
        var st = this.startTheta,
            et = this.endTheta,
            segmentNumber = this.segmentNumber,
            tLength = (st - et)/segmentNumber,
            R = this.radio;
        var vertex = [];
        var vertexLength = 3;
        for(var i=0;i<=segmentNumber;i++) {
            vertex[i*vertexLength] = Math.cos(st+i*tLength)*R;
            vertex[i*vertexLength+1] = Math.sin(st+i*tLength)*R;
            vertex[i*vertexLength+2] = 0;
        }
        this.vertexs = vertex;
    },
    pushGPU : function () {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);
    },
    draw : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, this.segmentNumber);
    },
    _debug : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.drawArrays(gl.POINTS, 0, this.segmentNumber+1);
    }
};
Arc.extends(Object3D);