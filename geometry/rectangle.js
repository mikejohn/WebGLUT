/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-6
 * Time: 下午5:35
 * To change this template use File | Settings | File Templates.
 */
var Rectangle = function (width, height, wSegmentsNum, hSegmentsNum) {
    Object3D.call(this);
    this.width = width;
    this.height = height;
    this.wSegmentNum = wSegmentsNum;
    this.hSegmentNum = hSegmentsNum;
    this.vertexBuffer = null;
    this.elementBuffer = null;
    this._elementArrayLength = null;
    this._debugArrayLength = null;
    this._build();
}
Rectangle.prototype = {
    constructor:Rectangle,
    _build : function () {
        var width = this.width,
            height = this.height,
            half_width = width/ 2,
            half_height = height / 2,
            wSegmentNum = this.wSegmentNum,
            hSegmentNum = this.hSegmentNum,
            wSegmentLength = width/wSegmentNum,
            hSegmentLength = height/hSegmentNum,
            wVertexNum = wSegmentNum+ 1,
            hVertexNum = hSegmentNum +1;
            var vertex = [];
            var vertexLength = 3;
            var numberOfRow = vertexLength*wVertexNum;
            for(var i=0;i<hVertexNum;i++) {
                for(var j=0;j<wVertexNum;j++) {
                    vertex[i*numberOfRow+j*vertexLength] = j*wSegmentLength - half_width;
                    vertex[i*numberOfRow+j*vertexLength+1] = i*hSegmentLength - half_height;
                    vertex[i*numberOfRow+j*vertexLength+2] = 0;
                }
            }
            var element = [],
                wElementNum= wSegmentNum,
                hElementNum= hSegmentNum;
            var elementLength = 6;
            numberOfRow = elementLength*wElementNum;
            for (i = 0; i < hElementNum; i++) {
                for (j = 0; j < wElementNum; j++) {
                    element[i * numberOfRow + j * elementLength] = j + i * wVertexNum;
                    element[i * numberOfRow + j * elementLength + 1] = j + (i + 1) * wVertexNum;
                    element[i * numberOfRow + j * elementLength + 2] = j + 1 + i * wVertexNum;
                    element[i * numberOfRow + j * elementLength + 3] = j + (i + 1) * wVertexNum;
                    element[i * numberOfRow + j * elementLength + 4] = j + 1 + i * wVertexNum;
                    element[i * numberOfRow + j * elementLength + 5] = j + (i + 1) * wVertexNum + 1;
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
Rectangle.extends(Object3D);

