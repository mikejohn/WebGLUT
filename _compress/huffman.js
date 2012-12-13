/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-10
 * Time: 下午4:13
 * To change this template use File | Settings | File Templates.
 */
var Huffman = {};
Huffman.build_tree = function (freqs) {
    var init,merge,left,right;
    var data;
    var size,c;
    var pqueue = new DS.HEAP(Huffman.compare_freq);
    for(c = 0; c <= Huffman.UCHAR_MAX; c++) {
        if(freqs[c]!=0) {
            init = new DS.BinaryTree();
            data = new Huffman.Node();
            data.symbol = c;
            data.freq = freqs[c];
            if(init.ins_left(null,data)!=0) {
                return -1;
            }
            if(pqueue.insert(init)!=0) {
                return -1;
            }
        }
    }
    size = pqueue.size();
    for(c = 1;c <= size -1;c++) {
        merge = new DS.BinaryTree();
        left = pqueue.extract();
        right = pqueue.extract();
        data = new Huffman.Node();
        data.freq = left.root.data.freq + right.root.data.freq;
        if(merge.merge(left,right,data)!=0){
            return -1;
        }
        if(pqueue.insert(merge)!=0) {
            return -1;
        }
    }
    return pqueue.extract();
};
Huffman.build_table = function (node,code,size,table) {
    if(node != null) {
        if(node.left != null) {
            Huffman.build_table(node.left,code+0,size +1,table)
        }
        if(node.right != null) {
            Huffman.build_table(node.right,code+1,size+1,table);
        }
        if(node.left == null && node.right == null) {
            var index = node.data.symbol;
            table[index].used = 1;
            table[index].code = code;
            table[index].size = size;
        }
        return;
    }

};
Huffman.compress = function (original) {
    var size = original.length;
    var tree,table = [],freqs = [];
    var max,scale,hsize,ipos,opos,cpos,c,i;
    var comp,temp;
    var compressed = null;
    for(c=0;c<=Huffman.UCHAR_MAX;c++) {
        freqs[c] = 0;
    }
    ipos = 0;
    if(size > 0) {
        while(ipos < size) {
            freqs[original.charCodeAt(ipos)]++;
            ipos++;
        }
    }
    max = Huffman.UCHAR_MAX;
    for(c = 0;c <= Huffman.UCHAR_MAX;c++) {
        if(freqs[c] > max) {
            max = freqs[c];
        }
    }
    for(c = 0;c <= Huffman.UCHAR_MAX;c++) {
        scale = Math.floor(freqs[c]/(max/Huffman.UCHAR_MAX));
        if(scale == 0 && freqs[c] != 0) {
            freqs[c] = 1;
        } else {
            freqs[c] = scale;
        }
    }
    tree = Huffman.build_tree(freqs);
    for(c = 0;c <= Huffman.UCHAR_MAX;c++) {
        table[c] = {};
    }
    Huffman.build_table(tree.root,'',0,table);
    ipos = 0;
    comp = [];
    temp = '';
    while(ipos < size) {
        c = original.charCodeAt(ipos);
        temp += (table[c].code);
        while(temp.length > Huffman.BitsOfByte) {
            var value = temp.substring(0,Huffman.BitsOfByte);
            temp = temp.substring(Huffman.BitsOfByte,temp.length);
            comp.push(parseInt(value,2));
        }
        if(ipos == size -1) {
            while(temp.length < Huffman.BitsOfByte) {
                temp += '0';
            }
            comp.push(parseInt(temp,2));
        }
        ipos++;
    }
    comp = Base64.encode(comp);
    return convertHeaderIntoHexString(size,freqs)+comp;

    function convertHeaderIntoHexString (int,freq) {
        var finalString = '';
        var s = fullLengthOfByte(int,32);
        for(var i = 0;i< s.length/4;i++) {
            var bits = s.substring(4*i,4*i+4);
            finalString += (parseInt(bits,2)).toString(16);
        }
        for(c = 0;c<= Huffman.UCHAR_MAX;c++) {
            var bits = fullLengthOfByte(freqs[c],8);
            finalString += (parseInt(bits.substring(0,4),2)).toString(16);
            finalString += (parseInt(bits.substring(4,8),2)).toString(16);
        }
        return finalString
    }

    function fullLengthOfByte (value,bitsNum) {
        var s = (value).toString(2);
        var _s = '';
        for(var i=0;i< bitsNum - s.length;i++) {
            _s += '0';
        }
        return _s + s;
    }
};
Huffman.uncompress = function (compressed) {
    var tree,node;
    var freqs = [],size;
    var spos,opos,state,c;
    var orig ='';

    size = convertHeaderIntoValue(compressed,freqs);
    tree = Huffman.build_tree(freqs);
    compressed = compressed.substring(8+2*(Huffman.UCHAR_MAX+1),compressed.length);
    var binary = Base64.decode(compressed);
    opos = 0;
    spos = 0;
    node = tree.root;
    while(spos<binary.length) {
        var s = binary[spos];
        s = fullLengthOfByte(s,Huffman.BitsOfByte);
        spos ++;
        opos = 0;
        while (opos < Huffman.BitsOfByte) {
            state = s.charAt(opos);
            if(state == 0) {
                if(node == null || node.left==null) {
                    throw new Error();
                } else {
                    node = node.left;
                }
            } else {
                if(node == null || node.right == null) {
                    throw new Error();
                } else {
                    node = node.right;
                }
            }
            if(node.left == null && node.right == null) {
                orig += String.fromCharCode(node.data.symbol);
                if(orig.length == size ) {
                    return orig;
                }
                node = tree.root;
            }
            opos++;
        }

    }

    function convertHeaderIntoValue (compressed,freqs) {
        var ss = compressed.substring(0,8);
        var size = parseInt(ss,16);
        for(var i =0 ;i<= Huffman.UCHAR_MAX;i++) {
            var freq = compressed.substring(8+2*i,10+2*i);
            freqs[i] = parseInt(freq,16)
        }
        return size;
    }
    function fullLengthOfByte (value,bitsNum) {
        var s = (value).toString(2);
        var _s = '';
        for(var i=0;i< bitsNum - s.length;i++) {
            _s += '0';
        }
        return _s + s;
    }
};
Huffman.BitsOfByte = 8;
Huffman.Node = function () {
    this.symbol = null;
    this.freq = null;
};
Huffman.Node.prototype = {
    constructor: Huffman.Node
};
Huffman.UCHAR_MAX = 255;
Huffman.compare_freq = function (tree1,tree2) {
    var root1 = tree1.root;
    var root2 = tree2.root;
    if(root1.data.freq < root2.data.freq) {
        return 1;
    } else if (root1.data.freq > root2.data.freq) {
        return -1;
    } else {
        return 0;
    }
};