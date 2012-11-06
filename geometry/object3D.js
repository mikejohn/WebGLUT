//var $OBJECT3DID = 0;
var Object3D = function () {
  //this.id = this._getID();
  //this.modelMatrix = mat4.identity();
  //this.vertexs = null;
};
//Object3D.prototype = {
//    constructor : Object3D,
//    _getID : function () {
//        return $OBJECT3DID++;
//    },
//    translate : function (x,y,z) {
//        var transMat4 = mat4.create();
//        mat4.identity(transMat4);
//        transMat4[12] = x;
//        transMat4[13] = y;
//        transMat4[14] = z;
//        mat4.MULMat4(transMat4,this.modelMatrix);
//    },
//    rotateX : function (theta) {
//        var rotMat4 = mat4.create();
//        var sinTheta = Math.sin(theta), cosThata = Math.cos(theta);
//        mat4.identity(rotMat4);
//        rotMat4[5] = cosThata;
//        rotMat4[6] = sinTheta;
//        rotMat4[9] = -sinTheta;
//        rotMat4[10] = cosThata;
//        mat4.MULMat4(rotMat4,this.modelMatrix);
//    },
//    rotateY : function (theta) {
//        var rotMat4 = mat4.create();
//        var sinTheta = Math.sin(theta), cosThata = Math.cos(theta);
//        mat4.identity(rotMat4);
//        rotMat4[0] = cosThata;
//        rotMat4[2] = -sinTheta;
//        rotMat4[8] = sinTheta;
//        rotMat4[10] = cosThata;
//        mat4.MULMat4(rotMat4,this.modelMatrix);
//    },
//    rotateZ : function (theta) {
//        var rotMat4 = mat4.create();
//        var sinTheta = Math.sin(theta), cosThata = Math.cos(theta);
//        mat4.identity(rotMat4);
//        rotMat4[0] = cosThata;
//        rotMat4[1] = sinTheta;
//        rotMat4[4] = -sinTheta;
//        rotMat4[5] = cosThata;
//        mat4.MULMat4(rotMat4,this.modelMatrix);
//    },
//    scale : function (sx,sy,sz) {
//        var scaleMat4 = mat4.create();
//        mat4.identity(scaleMat4);
//        scaleMat4[0] = sx;
//        scaleMat4[12] = (1-sx)*x;
//        scaleMat4[5] = sy;
//        scaleMat4[13] = (1-sy)*y;
//        scaleMat4[10] = sz;
//        scaleMat4[14] = (1-sz)*z;
//        mat4.MULMat4(rotMat4,this.modelMatrix);
//    },
//    pushGPU : function () {
//        throw new Error('Function pushGPU must be override.')
//    },
//    draw : function () {
//        throw new Error('Function draw must be override')
//    },
//    debug : function () {
//
//    }
//};