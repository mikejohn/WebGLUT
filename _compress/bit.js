/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-10
 * Time: 下午2:46
 * To change this template use File | Settings | File Templates.
 */
var BITS = function (bitsNum) {
    this.data = [];
    this.bitsNum = bitsNum;
    this.bytes = Math.ceil(bitsNum / 8);
    this._init();
};
BITS.prototype = {
    constructor: BITS,
    _init : function () {
        for(var i=0;i<this.bytes;i++) {
            this.data[i] = 0;
        }
    },
    /**
     * set
     * @param pos
     * @param state
     * @return {Number}
     */
    set : function (pos,state) {
        var i = Math.floor(pos / 8);
        if( i >= this.bytes) {
            return -1;
        }
        pos = pos % 8;
        var mask = 0x80 >> (pos);
        if(state == 0) {
            this.data[i] = this.data[i] & (~mask);
        } else {
            this.data[i] = this.data[i] | mask;
        }
    },
    /**
     * get
     * @param pos
     * @return {Number}
     */
    get : function (pos) {
        var i = Math.floor(pos/8);
        if( i >= this.bytes) {
            return -1;
        }
        pos = pos % 8;
        var mask = 0x80 >> (pos);
        return (this.data[i] & mask) == 0?0:1;
    },
    xor : function (bits) {
        var temp = new BITS(this.bitsNum);

        for(var i=0;i<this.bitsNum;i++) {
           if( this.get(i) != bits.get(i)) {
               temp.set(i,1);
           } else {
               temp.set(i,0);
           }
        }
        return temp;
    },
    /**
     *
     * @param count
     */
    left_rot : function (count) {
        for(var c = 0;c < count;c ++) {
            var hB = Math.floor(this.bitsNum/8);
            var mask_Sweep = 0xff;
            var mask_get_left = 0x100;
            var lb,llb;
            llb = ((this.data[0] << 1) & mask_get_left)==0?0:1;
            for(var i= 0;i < hB; i++) {
                this.data[i] = ((this.data[i] << 1)&mask_Sweep);
                lb = ((this.data[i+1] << 1) & mask_get_left)==0?0:1;
                this.data[i] += lb;
            }
            this.data[hB] = ((this.data[hB] << 1)&mask_Sweep);
            this.set(this.bitsNum -1,llb);
        }
    },
    memcpy : function (source,bytes) {
        var length = bytes*8;
        for(var i=0;i<length;i++) {
            this.set(i,source.get(i));
        }
    }
};
BITS.BYTELENGTH = 8;