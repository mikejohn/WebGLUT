var Point = function (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.GPUBUFFER = null;
};
Point.prototype = {
    constructor : Point,
    pushGPU : function () {
        var pointVectexPoz = vec3.create(this.x,this.y,this.z);
        this.GPUBUFFER = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.GPUBUFFER);
        gl.bufferData(gl.ARRAY_BUFFER, pointVectexPoz, gl.STATIC_DRAW);
    },
    draw : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.GPUBUFFER);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}