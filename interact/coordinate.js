/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-23
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */
function unProject (winx,winy,winz,viewMat4,projectionMat4,viewPoint) {
    var pv = mat4.MULMat4(projectionMat4,viewMat4);
    var pvmInverse = mat4.inverse(pv);
    if(pvmInverse == null) {
        return null;
    }
    var inParam = vec4.create(
        (winx - viewPoint.x)/viewPoint.width*2.0 -1.0,
        (winy - viewPoint.y)/viewPoint.height*2.0 -1.0,
        2.0*winz-1.0,
        1.0
    );
    var out = mat4.MULVec4(pvmInverse,inParam);
    if(out[3] == 0.0) {
        return null;
    }
    out[3] = 1.0/out[3];
    return {x:out[0]*out[3],y:out[1]*out[3],z:out[2]*out[3]};
}