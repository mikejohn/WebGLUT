/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-6
 * Time: 下午5:35
 * To change this template use File | Settings | File Templates.
 */
var Rectangle = function (width,height,segmentWidth,segmentHeight) {
    Object3D.call(this);
    this.width = width;
    this.height = height;
    this.segmentWidth = segmentWidth;
    this.segmentHeight = segmentHeight;
    this.vertexBuffer = null;
    this.drawIndexBuffer = null;
}
Rectangle.prototype = {
    constructor : Rectangle,
    pushGPU : function () {
        //vertex
        var left = - this.width/ 2,
            right = this.width/ 2,
            top = this.height/ 2,
            bottom = -this.height/ 2,
            i=j=k=column=row=0,
            xStepLength = this.segmentWidth,
            yStepLength = this.segmentHeight,
            pointVertexPoz = [];

        while(top-yStepLength*j > bottom ) {
            while (left+xStepLength*i < right) {
                pointVertexPoz[i*3+j*3*column] = left+xStepLength*i;
                pointVertexPoz[i*3+j*3*column+1] = top-yStepLength*j;
                pointVertexPoz[i*3+j*3*column+2] = 0;
                i++;
            }
            pointVertexPoz[i*3+j*3*column] = right;
            pointVertexPoz[i*3+j*3*column+1] = top-yStepLength*j;
            pointVertexPoz[i*3+j*3*column+2] = 0;
            column = i+1;
            i=0;
            j++;
        }
        while (left+xStepLength*i < right) {
            pointVertexPoz[i*3+j*3*column] = left+xStepLength*i;
            pointVertexPoz[i*3+j*3*column+1] = bottom;
            pointVertexPoz[i*3+j*3*column+2] = 0;
            i++;
        }
        pointVertexPoz[i*3+j*3*column] = left+xStepLength*i;
        pointVertexPoz[i*3+j*3*column+1] = bottom;
        pointVertexPoz[i*3+j*3*column+2] = 0;
        row = j+1;
        //draw index
        var drawIndex = [];
        for(i=0;i<row-1;i++) {
            for(j=0;j<column-1;j++) {
                drawIndex[i*(column-1)*6+j*6] = j + i* column;
                drawIndex[i*(column-1)*6+j*6+1] = j + (i+1)* column;
                drawIndex[i*(column-1)*6+j*6+2] = j+1+i* column;
                drawIndex[i*(column-1)*6+j*6+3] = j+ (i+1)*column;
                drawIndex[i*(column-1)*6+j*6+4] = j+1+i* column;
                drawIndex[i*(column-1)*6+j*6+5] = j+(i+1)*column+1;
            }
        }
//        var test = [];
//        test.push(-1);
//        test.push(-1);
//        test.push(-3);
//        test.push(0);
//        test.push(1);
//        test.push(-3);
//        test.push(1);
//        test.push(-1);
//        test.push(-3);
//        var index = [];
//        index.push(0);
//        index.push(1);
//        index.push(2);
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointVertexPoz), gl.STATIC_DRAW);
        this.drawIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.drawIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawIndex), gl.STATIC_DRAW);
        this.drawLength = drawIndex.length;
        this.debugLength = pointVertexPoz.length/3;
    },
    draw : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.drawIndexBuffer);

        gl.drawElements(gl.TRIANGLES,  this.drawLength, gl.UNSIGNED_SHORT, 0);
    },
    debug : function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);


        gl.drawArrays(gl.POINTS, 0, this.debugLength);
    }
};
Rectangle.extends(Object3D);
