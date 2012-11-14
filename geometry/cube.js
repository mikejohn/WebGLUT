/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-9
 * Time: 下午4:37
 * To change this template use File | Settings | File Templates.
 */
var Cube = function (width,height,depth,wSegmentNumber,hSegmentNumber,dSegmentNumber) {
    Object3D.call(this);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.wSegmentNumber = wSegmentNumber;
    this.hSegmentNumber = hSegmentNumber;
    this.dSegmentNumber = dSegmentNumber;
    this._build();
};
Cube.prototype = {
    constructor : Cube,
    _build : function () {

    },
};
Cube.extends(Object3D);
