/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-6
 * Time: 上午10:29
 * To change this template use File | Settings | File Templates.
 */
/**
 * Class DS.HEAP
 * @param compare This function should return 1 if key1 > key2, if key1 = key2, and -1 if key1 < key2
 * @param destroy
 * @constructor DS.HEAP
 */
DS.HEAP = function (compare,destroy) {
    this.compare = compare;
    if(destroy != undefined) {
        this.destroyMethod = destroy;
    }
    this.tree = [];
};
DS.HEAP.prototype = {
    constructor : DS.HEAP,
    insert : function (data) {
        var ipos,ppos,temp;
        this.tree[this.tree.length] = data;
        ipos = this.tree.length-1;
        ppos = DS.HEAP._parent(ipos);
        while(ipos > 0 && this.compare(this.tree[ppos],this.tree[ipos])<0) {
            temp = this.tree[ppos];
            this.tree[ppos] = this.tree[ipos];
            this.tree[ipos] = temp;
            ipos =ppos;
            ppos = DS.HEAP._parent(ipos);
        }
        return 0;
    },
    extract : function () {
        var data,save,temp,ipos,lpos,rpos,mpos;
        if(this.tree.length == 0) {
            throw new Error('Heap is empty');
        }
        data = this.tree[0];
        save = this.tree[this.tree.length-1];
        if(this.tree.length > 1) {
            this.tree.pop();
        } else {
            this.tree = [];
            return data;
        }
        this.tree[0] = save;
        ipos = 0;
        lpos = DS.HEAP._left(ipos);
        rpos = DS.HEAP._right(ipos);
        while(true) {
            lpos = DS.HEAP._left(ipos);
            rpos = DS.HEAP._right(ipos);
            if(lpos < this.tree.length && this.compare(this.tree[lpos],this.tree[ipos])>0) {
                mpos = lpos;
            } else {
                mpos = ipos;
            }
            if(rpos < this.tree.length && this.compare(this.tree[rpos],this.tree[mpos])>0) {
                mpos = rpos;
            }
            if(mpos == ipos) {
                break;
            } else {
                temp = this.tree[mpos];
                this.tree[mpos] = this.tree[ipos];
                this.tree[ipos] = temp;
                ipos = mpos;
            }
        }
        return data;
    },
    size : function () {
        return this.tree.length;
    },
    peek : function () {
        return this.tree[0];
    }
};
DS.HEAP._parent = function (npos) {
    return Math.floor((npos - 1)/2);
};
DS.HEAP._left = function (npos) {
    return npos*2+1;
};
DS.HEAP._right = function (npos) {
    return npos*2+2;
};
