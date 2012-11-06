/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 11/5/12
 * Time: 11:28 PM
 * To change this template use File | Settings | File Templates.
 */
var Line = function (startPoint,endPoint,segmentLength) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.segmentLength = segmentLength;
    this.GPUBUFFER = null;
};
Line.prototype = {
    constructor : Line,
    pushGPU : function () {
        var spx = this.startPoint[0],
            spy = this.startPoint[1],
            spz = this.startPoint[2];
        var epx = this.endPoint[0],
            epy = this.endPoint[1],
            epz = this.endPoint[2];
        var segmentsLength = this.segmentLength;
        var lineLength = Math.sqrt((spx-epx)*(spx-epx)+(spy-epy)*(spy-epy)+(spz-epz)*(spz-epz));
        var segmentNumber = lineLength / segmentsLength;
        var xStepLength = (epx-spx)/lineLength*segmentsLength;
        var yStepLength = (epy-spy)/lineLength*segmentsLength;
        var zStepLength = (epz-spz)/lineLength*segmentsLength;
        var pointVectexPoz = [];
        for(var i=0;i<segmentNumber;i++) {
            pointVectexPoz[0+3*i] = spx+i*xStepLength;
            pointVectexPoz[1+3*i] = spy+i*yStepLength;
            pointVectexPoz[2+3*i] = spy+i*zStepLength;
        }
        pointVectexPoz.push(epx);
        pointVectexPoz.push(epy);
        pointVectexPoz.push(epz);
        this.GPUBUFFER = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.GPUBUFFER);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointVectexPoz), gl.STATIC_DRAW);
        this.segmentNumber = segmentNumber;
    },
    draw : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.GPUBUFFER);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINE_STRIP, 0, this.segmentNumber+1);
    },
    debug : function (command) {
        switch (command) {
            case 'drawPoint' :
                gl.bindBuffer(gl.ARRAY_BUFFER, this.GPUBUFFER);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
                gl.drawArrays(gl.POINTS, 0, this.segmentNumber+1);
                break;
        }
    }
};

