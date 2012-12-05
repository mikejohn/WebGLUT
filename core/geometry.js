/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-29
 * Time: 下午1:50
 * To change this template use File | Settings | File Templates.
 */
var RANDER = {
    POINT : 0,
    LINE : 1,
    TRIANGLE :2
};
Geometry = function () {
    this.vertexFormat = 'XYZRGBAL1L1L1L2L2L2L3L3L3';
    this.vertexs = null;
    this.elements = null;
    this.vertexBufferOffset = 0;
    this.elementBufferOffset = 0;
    this.lineRanderOffset = 0;
    this.triangleRanderOffset = 0;
    this.randerType = RANDER.TRIANGLE;
};
Geometry.prototype = {
    init : function () {

    },
    rander : function (randerType) {
        if(randerType == undefined) {
            randerType = this.randerType;
        }
        switch(randerType) {
            case RANDER.POINT :
                this.drawPoints();
                break;
            case RANDER.LINE :
                this.drawLines();
                break;
            case RANDER.TRIANGLE :
                this.drawTriangles();
                break;
        }
    },
    drawPoints : function (_gl) {
        _gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 28, 0);
        _gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 28, 12);
        _gl.drawArrays(gl.POINTS, this.vertexBufferOffset, this.vertexs.length/this.vertexFomat.stride);
    },
    drawLines : function (_gl) {

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.drawElements(gl.LINES,this.elements_line.length, gl.UNSIGNED_SHORT, 0);
    },
    drawTriangles : function () {

    }
};
VertexToAttribute = [];
VertexToAttribute['p'] = "positionAttribute";
VertexToAttribute['c'] = "colorAttribute";
VertexToAttribute['t'] = "textureCoordinateAttribute";
VertexFormat = function (formatString) {
    this.format = formatString;
    this.vertexAttribue = [];
};
VertexFormat.prototype = {
    compute : function () {
        var unitSize = _getDataTypeByteSize(this.dataType);
        var formatString = this.format;
        var lengthCount=0,offset=[];
        var currElmt = '',lastElmt = null;
        var attributes = [];
        for(var i=0;i<formatString.length;i++) {
            var c = formatString.charAt(i);
            if(Number(c) != c) {
                currElmt += c;
                for(var j=i+1;j<formatString.length;j++) {
                    var nc = formatString.charAt(j);
                    if(Number(nc) == nc) {
                        currElmt += nc;
                    } else {
                        break;
                    }
                }
                if(lastElmt != currElmt) {
                    lastElmt = currElmt;
                    offset.push(lengthCount*unitSize);
                    var attribute = {
                        name : VertexToAttribute[lastElmt.charAt(0)] + lastElmt.substring(1,lastElmt.length-1)
                    };
                    attributes.push(attribute);
                }
                currElmt = '';
                lengthCount++;
            }

        }
        this.stride = lengthCount*unitSize;
        this.attributeOffset = offset;
        for (var i=0;i<attributes.length-1;i++) {
            var attribute = attributes[i];
            attribute.size = (offset[i+1] - offset[i])/unitSize;
        }
        attributes[attributes.length -1].size = unitSize -offset[offset.length-1]/unitSize;

        function _getDataTypeByteSize (dataType) {
            var size = '';
            for(var i=0;i<dataType.length;i++) {
                var char = dataType.charAt(i);
                if(Number(char) == char) {
                    size += char;
                }
            }
            return Number(size);
       }
    }
};