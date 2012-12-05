/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-29
 * Time: 上午10:09
 * To change this template use File | Settings | File Templates.
 */
/**
 * @param _gl webgl上下文
 * @param maxBufferSize
 * @param maxBufferNum
 * @constructor
 * @description BufferPool为每一种DATATYPE,USAGE,VERTEXFORMAT不同的buffer需求创建一个bufferList。一个bufferList
 * 是一个双向链表，保存同种buffer。bufferTable数组，使用DATATYPE,USAGE,VERTEXFORMAT字符串连接作为索引，保存所有的
 * bufferList
 */
BufferPool = function (_gl,maxBufferSize,maxBufferNum) {
    this.bufferTable = [];
    this.bufferNum = 0;
    this._gl = gl;
    this.maxBufferNum =  maxBufferNum==undefined?BufferPool.MAXBUFFERNUM:maxBufferNum;
    this.maxBufferSize = maxBufferSize==undefined?BufferPool.maxBufferSize:maxBufferSize;
};
BufferPool.DATATYPE = ["INT8","INT16","INT32","UINT8","UINT16","UINT32","FLOAT32"];
BufferPool.USAGE = ['GL_STATIC_DRAW','GL_STREAM_DRAW','GL_DYNAMIC_DRAW'];
BufferPool.MAXBUFFERSIZE = 1000;
BufferPool.MAXBUFFERNUM = 100;
BufferPool.prototype = {
    constructor: BufferPool,
    /**
     * getBuffer
     * @param dataType
     * @param usage
     * @param vertexFormat
     * @param dataSize
     * @return buffer object if successful get buffer,or -1 otherwise.
     */
    getBuffer : function (dataType,usage,vertexFormat,dataSize) {
        //check max buffernum
        if(this.bufferNum >= this.maxBufferNum) {
            return -2;
        }
        //check param
        var check = 0;
        for(var i=0;i<BufferPool.dataType.length;i++) {
            if(dataType == BufferPool.dataType[i]) {
                check++;
                break;
            }
        }
        for(var i=0;i<BufferPool.USAGE.length;i++) {
            if(usage == BufferPool.USAGE) {
                check ++;
                break;
            }
        }
        if(check < 2) {
            return -1;
        }
        var index = dataType+usage+vertexFormat;
        if(this.bufferTable[index] == undefined) {
            this.bufferTable[index] = new BufferList(dataType,usage,vertexFormat,this.maxBufferSize);
        }
        return this.bufferTable[index].getBuffer(dataSize);
    },
    /**
     * flush
     */
    flush : function () {
        for(var bufferListType in this.bufferTable) {
            var bufferList = this.bufferTable[bufferListType];
            bufferList.flush(this._gl);
        }
    },
    rander : function () {
        for(var bufferListType in this.bufferTable) {
            var bufferList = this.bufferTable[bufferListType];
            bufferList.rander(this._gl);
        }
    }
};

BufferList = function (dataType,usage,vertexFormat,maxBufferSize) {
    this.list = new DS.DoublyLinkedList();
    this.dataType = dataType;
    this.usage = usage;
    this.vertexFormat = vertexFormat;
    this.maxBufferSize = maxBufferSize;
};
BufferList.prototype = {
    init : function () {

    },
    getBuffer : function (dataSize) {
        for(var element = this.list.tail;element!=null;element= element.prev) {
            var buffer = element.data;
            if(buffer.restSize < dataSize) {
                continue;
            } else {
               buffer.restSize -= dataSize;
               return buffer;
            }
        }
        var buffer = new Buffer(this.dataType,this.usage,this.vertexFormat,this.maxBufferSize);
        this.list.ins_next(this.list.tail,buffer);
        buffer.restSize -= dataSize;
        return buffer;
    },
    flush : function (_gl) {
        for(var element = this.list.head;element!= null;element = element.next) {
            var buffer = element.data;
            buffer.flush(_gl);
        }
    },
    rander : function (_gl) {
        for(var element = this.list.head;element!= null;element = element.next) {
            var buffer = element.data;
            buffer.rander(_gl);
        }
    }
};
Buffer = function (dataType,usage,vertexFormat,fullSize) {
    switch (dataType) {
        case BufferPool.DATATYPE[0] :
            this.dataType = Int8Array;
            break;
        case BufferPool.DATATYPE[0] :
            this.dataType = Int16Array;
            break;
        case BufferPool.DATATYPE[0] :
            this.dataType = Int32Array;
            break;
        case BufferPool.DATATYPE[0] :
            this.dataType = Uint8Array;
            break;
        case BufferPool.DATATYPE[0] :
            this.dataType = Uint16Array;
            break;
        case BufferPool.DATATYPE[0] :
            this.dataType = Uint32Array;
            break;
        case BufferPool.DATATYPE[0] :
            this.dataType = Float32Array;
            break;
    }
    switch (usage) {
        case BufferPool.USAGE[0] :
            this.usage = _gl.STATIC_DRAW;
            break;
        case BufferPool.USAGE[1] :
            this.usage = _gl.STREAM_DRAW;
            break;
        case BufferPool.USAGE[2] :
            this.usage = _gl.DYNAMIC_DRAW;
            break;
    }
    this.vertexFormat = vertexFormat;
    this.restSize = fullSize;
    this.glBuffer = null;
    this.geometries = null;
};
Buffer.prototype  = {
    bindData : function (geometry) {
        if(this.geometries == null) {
            this.geometries = new DS.LinkedList();
        }
        this.geometries.ins_next(this.geometries.tail,geometry);
    },
    flush : function (_gl) {
        var vertexs = [];
        var elements = [];
        for(var element = this.geometries.head;element!=null;element = element.next) {
            var geometry = element.data;
            geometry.vertexOffset = vertexs.length;
            geometry.elementOffset = elements.length;
            vertexs.concat(geometry.vertexs);
            elements.concat(geometry.elements);
        }
        var arrayBuffer = _gl.creatBuffer();
        _gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
        _gl.bufferData(gl.ARRAY_BUFFER, new this.dataType(vertexs), this.usage);
        var elementBuffer = _gl.createBuffer();
        _gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elements);
        _gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), this.usage);
    },
    rander : function () {
        for(var element = this.geometries.head;element!=null;element = element.next) {
            var geometry = element.data;
            geometry.rander();
        }
    }
};