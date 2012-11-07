/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-7
 * Time: 下午4:45
 * To change this template use File | Settings | File Templates.
 */
var Sector = function (maxRadio,minRadio,radiantSegmentNumber,startTheta,endTheta,thetaSegmentNumber) {
    Object3D.call(this);
    this.maxRadio = maxRadio;
    this.minRadio = minRadio;
    this.radiantSegmentNumber = radiantSegmentNumber;
    this.startTheta = startTheta;
    this.endTheta = endTheta;
    this.thetaSegmentNumber = thetaSegmentNumber;
    this.vertexBuffer = null;
    this.elementBuffer = null;
    this._elementArrayLength = null;
    this._debugArrayLength = null;
    this._build();
};
Sector.prototype = {
    constructor : Sector,
    _build : function () {
        var maxR = this.maxRadio,
            minR = this.minRadio,
            RSegmentNum = this.radiantSegmentNumber,
            st = this.startTheta,
            et = this.endTheta,
            TSegmentNum = this.thetaSegmentNumber,
            RSegLength = (maxR - minR)/RSegmentNum,
            TSegLength = (et - st)/TSegmentNum,
            RVertexNum = RSegmentNum+ 1,
            TVertexNum = TSegmentNum+1,
            vertex = [],
            vertexLength = 3;
        var numberOfRow = vertexLength*TVertexNum;
        for(var i=0;i<RVertexNum;i++) {
            for(var j=0;j<TVertexNum;j++) {
                vertex[i*numberOfRow+j*vertexLength] =  Math.cos(st+j*TSegLength)*(minR+i*RSegLength);
                vertex[i*numberOfRow+j*vertexLength+1] = Math.sin(st+j*TSegLength)*(minR+i*RSegLength);
                vertex[i*numberOfRow+j*vertexLength+2] = 0;
            }
        }
        var element = [],
            wElementNum= TSegmentNum,
            hElementNum= RSegmentNum;
        var elementLength = 6;
        numberOfRow = elementLength*TSegmentNum;
        for (i = 0; i < hElementNum; i++) {
            for (j = 0; j < wElementNum; j++) {
                element[i * numberOfRow + j * elementLength] = j + i * TVertexNum;
                element[i * numberOfRow + j * elementLength + 1] = j + (i + 1) * TVertexNum;
                element[i * numberOfRow + j * elementLength + 2] = j + 1 + i * TVertexNum;
                element[i * numberOfRow + j * elementLength + 3] = j + (i + 1) * TVertexNum;
                element[i * numberOfRow + j * elementLength + 4] = j + 1 + i * TVertexNum;
                element[i * numberOfRow + j * elementLength + 5] = j + (i + 1) * TVertexNum + 1;
            }
        }
        this.vertexs = vertex;
        this.elements = element;
        this._elementArrayLength = element.length;
        this._debugArrayLength = vertex.length/3;
    },
    pushGPU : function () {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);
        this.elementBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elements), gl.STATIC_DRAW);
    },
    draw : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.drawElements(gl.TRIANGLES, this._elementArrayLength, gl.UNSIGNED_SHORT, 0);
    },
    _debug : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);


        gl.drawArrays(gl.POINTS, 0, this._debugArrayLength);
    }
};
Sector.extends(Object3D);