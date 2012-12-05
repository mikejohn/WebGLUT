/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-29
 * Time: 下午6:46
 * To change this template use File | Settings | File Templates.
 */
/**
 *
 attribute vec3 aVertexPosition;
 uniform mat4 mMatrix;
 uniform mat4 vMatrix;
 uniform mat4 pMatrix;
 void main(void) {
 gl_Position = pMatrix * vMatrix * mMatrix * vec4(aVertexPosition, 1.0);

 * @constructor
 */
ShaderMakeUp = function () {

};
ShaderMakeUp.prototype = {
    constructor:ShaderMakeUp
};
ShaderMakeUp.VertexShader.HEAD = "attribute vec3 aVertexPosition;"+
                                "uniform mat4 mMatrix;"+
                                "uniform mat4 vMatrix;"+
                                "uniform mat4 pMatrix;";