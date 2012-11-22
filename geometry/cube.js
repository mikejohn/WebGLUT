/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-9
 * Time: 下午4:37
 * To change this template use File | Settings | File Templates.
 */
var Cube = function (width, height, depth, wSegmentNumber, hSegmentNumber, dSegmentNumber) {
    Object3D.call(this);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.wSegmentNumber = wSegmentNumber;
    this.hSegmentNumber = hSegmentNumber;
    this.dSegmentNumber = dSegmentNumber;
    this.elements_line = null;
    this.elements_triangle = null;
    this._build();
};
Cube.prototype = {
    constructor:Cube,
    _build:function () {
        var vertexs = [],
            vi = 0,
            elements_triangle = [],
            eti = 0,
            elements_line = [],
            eli = 0,
            width = this.width,
            height = this.height,
            depth = this.depth,
            WSegments =  this.wSegmentNumber;
            HSegments = this.hSegmentNumber;
            DSegments = this.dSegmentNumber;
        //build front
        buildPlane('front',width,height,depth,WSegments,HSegments);

        //build back
        buildPlane('back',width,height,depth,WSegments,HSegments);

        //build right
        buildPlane('right',depth,height,width,DSegments,HSegments);

        //build left
        buildPlane('left',depth,height,width,DSegments,HSegments);

        //build up
        buildPlane('up',depth,width,height,DSegments,WSegments);

        //build down
        buildPlane('down',depth,width,height,DSegments,WSegments);

        this.vertexs = vertexs;
        this.elements_line = elements_line;
        this.elements_triangle = elements_triangle;
        /**
         *
         * @param W 平面宽度
         * @param H 平面高度
         * @param D 立方体深度
         * @param WSegments 水平分段那个数
         * @param HSegments 垂直分段个数
         * @param vertexs   顶点数组
         * @param vertexsOffset 顶点数组偏移量
         * @param drawIndexs    绘制索引数组
         * @param drawIndexOffset   绘制索引数组偏移量
         */
        function buildPlane(name,W, H, D, WSegments, HSegments) {
            var XSegmentLength = W / WSegments,
                YSegmentLength = H / HSegments,
                XVertexs = WSegments + 1,
                YVertexs = HSegments + 1,
                half_W = W / 2,
                half_H = H / 2,
                half_D = D / 2;
            var u = v = w = r = s = t = 1;
            switch (name) {
                case 'front' :
                    u = 0;
                    w = 2;
                    t = -1;
                    break;
                case 'right' :
                    u = 2;
                    w = 0;
                    t = -1;
                    break;
                case 'back' :
                    u = 0;
                    w = 2;
                    r = -1;
                    t = -1;
                    break;
                case 'left' :
                    u = 2;
                    w = 0;
                    r = -1;
                    t = -1;
                    break;
                case 'up' :
                    u = 2;
                    v = 0;
                    t = -1;
                    break;
                case 'down' :
                    u = 2;
                    v = 0;
                    t = -1;
                    r = -1;
                    break;
            }

            for (var i = 0; i < YVertexs; i++) {
                elements_line[eli++] = vi/3;
                elements_line[eli++] = vi/3+WSegments;
                for (var j = 0; j < XVertexs; j++) {
                    if(i==0) {
                        elements_line[eli++] = vi/3;
                        elements_line[eli++] = vi/3+XVertexs*HSegments;
                    }
                    vertexs[vi+u] = j * XSegmentLength * s - half_W;
                    vertexs[vi+v] = i * YSegmentLength * t + half_H;
                    vertexs[vi+w] = half_D * r;
                    if (j != WSegments  && i != HSegments ) {
                        elements_triangle[eti++] = vi/3;
                        elements_triangle[eti++] = vi/3 + XVertexs;
                        elements_triangle[eti++] = vi/3 + XVertexs + 1;
                        elements_triangle[eti++] = vi/3;
                        elements_triangle[eti++] = vi/3 + 1;
                        elements_triangle[eti++] = vi/3 + XVertexs + 1;

                    }
                    vi+=3;
                }
            }

        }
    },
    pushGPU:function () {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexs), gl.STATIC_DRAW);
        this.elementBuffer = gl.createBuffer();

    },
    draw:function (type) {
        if(!type) {
            type = 'triangle';
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        switch (type) {
            case 'point' :
                gl.drawArrays(gl.POINTS, 0, this.vertexs.length/3);
                break;
            case 'line' :
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elements_line), gl.DYNAMIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                gl.drawElements(gl.LINES,this.elements_line.length, gl.UNSIGNED_SHORT, 0);
                break;
            case 'triangle' :
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elements_triangle), gl.DYNAMIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                gl.drawElements(gl.TRIANGLES,this.elements_triangle.length, gl.UNSIGNED_SHORT, 0);
                break;
        }


    }
};
Cube.extends(Object3D);
