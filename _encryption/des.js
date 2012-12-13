/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-11
 * Time: 下午6:23
 * To change this template use File | Settings | File Templates.
 */
var DES = {};
DES.DesTransform = [57, 49, 41, 33, 25,17,  9,  1, 58, 50, 42, 34, 26, 18,
                    10,  2, 59, 51, 43, 35, 27, 19, 11,  3, 60, 52, 44, 36,
                    63, 55, 47, 39, 31, 23, 15,  7, 62, 54, 46, 38, 30, 22,
                    14,  6, 61, 53, 45, 37, 29, 21, 13,  5, 28, 20, 12,  4];
DES.DesRotations = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
DES.DesPermuted = [14, 17, 11, 24,  1,  5,  3, 28, 15,  6, 21, 10,
                    23, 19, 12,  4, 26,  8, 16,  7, 27, 20, 13,  2,
                    41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
                    44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
DES.DESInitial=  [58, 50, 42, 34, 26, 18, 10,  2, 60, 52, 44, 36, 28, 20, 12,  4,
                    62, 54, 46, 38, 30, 22, 14,  6, 64, 56, 48, 40, 32, 24, 16,  8,
                    57, 49, 41, 33, 25, 17,  9,  1, 59, 51, 43, 35, 27, 19, 11,  3,
                    61, 53, 45, 37, 29, 21, 13,  5, 63, 55, 47, 39, 31, 23, 15,  7];
DES.DesExpansion = [32,  1,  2,  3,  4,  5,  4,  5,  6,  7,  8,  9,
                    8,  9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17,
                    16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
                    24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32,  1];
DES.DesSbox = [
            [
                [14,  4, 13,  1,  2, 15, 11,  8,  3, 10,  6, 12,  5,  9,  0,  7],
                [ 0, 15,  7,  4, 14,  2, 13,  1, 10,  6, 12, 11,  9,  5,  3,  8],
                [ 4,  1, 14,  8, 13,  6,  2, 11, 15, 12,  9,  7,  3, 10,  5,  0],
                [15, 12,  8,  2,  4,  9,  1,  7,  5, 11,  3, 14, 10,  0,  6, 13]
            ],

            [
                [15,  1,  8, 14,  6, 11,  3,  4,  9,  7,  2, 13, 12,  0,  5, 10],
                [ 3, 13,  4,  7, 15,  2,  8, 14, 12,  0,  1, 10,  6,  9, 11,  5],
                [ 0, 14,  7, 11, 10,  4, 13,  1,  5,  8, 12,  6,  9,  3,  2, 15],
                [13,  8, 10,  1,  3, 15,  4,  2, 11,  6,  7, 12,  0,  5, 14,  9]
            ],

            [
                [10,  0,  9, 14,  6,  3, 15,  5,  1, 13, 12,  7, 11,  4,  2,  8],
                [13,  7,  0,  9,  3,  4,  6, 10,  2,  8,  5, 14, 12, 11, 15,  1],
                [13,  6,  4,  9,  8, 15,  3,  0, 11,  1,  2, 12,  5, 10, 14,  7],
                [ 1, 10, 13,  0,  6,  9,  8,  7,  4, 15, 14,  3, 11,  5,  2, 12]
            ],

            [
                [ 7, 13, 14,  3,  0,  6,  9, 10,  1,  2,  8,  5, 11, 12,  4, 15],
                [13,  8, 11,  5,  6, 15,  0,  3,  4,  7,  2, 12,  1, 10, 14,  9],
                [10,  6,  9,  0, 12, 11,  7, 13, 15,  1,  3, 14,  5,  2,  8,  4],
                [ 3, 15,  0,  6, 10,  1, 13,  8,  9,  4,  5, 11, 12,  7,  2, 14]
            ],

            [
                [ 2, 12,  4,  1,  7, 10, 11,  6,  8,  5,  3, 15, 13,  0, 14,  9],
                [14, 11,  2, 12,  4,  7, 13,  1,  5,  0, 15, 10,  3,  9,  8,  6],
                [ 4,  2,  1, 11, 10, 13,  7,  8, 15,  9, 12,  5,  6,  3,  0, 14],
                [11,  8, 12,  7,  1, 14,  2, 13,  6, 15,  0,  9, 10,  4,  5,  3]
            ],

            [
                [12,  1, 10, 15,  9,  2,  6,  8,  0, 13,  3,  4, 14,  7,  5, 11],
                [10, 15,  4,  2,  7, 12,  9,  5,  6,  1, 13, 14,  0, 11,  3,  8],
                [ 9, 14, 15,  5,  2,  8, 12,  3,  7,  0,  4, 10,  1, 13, 11,  6],
                [ 4,  3,  2, 12,  9,  5, 15, 10, 11, 14,  1,  7,  6,  0,  8, 13]
            ],

            [
                [ 4, 11,  2, 14, 15,  0,  8, 13,  3, 12,  9,  7,  5, 10,  6,  1],
                [13,  0, 11,  7,  4,  9,  1, 10, 14,  3,  5, 12,  2, 15,  8,  6],
                [ 1,  4, 11, 13, 12,  3,  7, 14, 10, 15,  6,  8,  0,  5,  9,  2],
                [ 6, 11, 13,  8,  1,  4, 10,  7,  9,  5,  0, 15, 14,  2,  3, 12]
            ],

            [
                [13,  2,  8,  4,  6, 15, 11,  1, 10,  9,  3, 14,  5,  0, 12,  7],
                [ 1, 15, 13,  8, 10,  3,  7,  4, 12,  5,  6, 11,  0, 14,  9,  2],
                [ 7, 11,  4,  1,  9, 12, 14,  2,  0,  6, 10, 13, 15,  3,  5,  8],
                [ 2,  1, 14,  7,  4, 10,  8, 13, 15, 12,  9,  0,  3,  5,  6, 11]
            ]
        ];
DES.DesPbox = [16,  7, 20, 21, 29, 12, 28, 17,  1, 15, 23, 26,  5, 18, 31, 10,
                2,  8, 24, 14, 32, 27,  3,  9, 19, 13, 30,  6, 22, 11,  4, 25];

DES.DesFinal = [40,  8, 48, 16, 56, 24, 64, 32, 39,  7, 47, 15, 55, 23, 63, 31,
                38,  6, 46, 14, 54, 22, 62, 30, 37,  5, 45, 13, 53, 21, 61, 29,
                36,  4, 44, 12, 52, 20, 60, 28, 35,  3, 43, 11, 51, 19, 59, 27,
                34,  2, 42, 10, 50, 18, 58, 26, 33,  1, 41,  9, 49, 17, 57, 25];
DES.encipher = 1;
DES.decipher = 0;
DES.permute = function (bits,mapping,n) {
    var temp = new BITS(n);
    var i;
    for(i=0;i<n;i++) {
        temp.set(i,bits.get(mapping[i]-1));
    }
    return temp;
};
DES.main = function (source,key,direction) {
    var subkeys = [];
    var temp,
        lkey,
        rkey,
        lblk = [],
        rblk = [],
        fblk = [],
        xblk = [],
        sblk;

    if(key != null) {
        temp = new BITS(64);
        temp.data = key.data;
        temp = DES.permute(temp,DES.DesTransform,56);
        lkey = new BITS(28);
        rkey = new BITS(28);
        for(var j=0;j<28;j++) {
            lkey.set(j,temp.get(j));
            rkey.set(j,temp.get(j+28));
        }
        for(var i=0;i<16;i++) {
            lkey.left_rot(DES.DesRotations[i]);
            rkey.left_rot(DES.DesRotations[i]);
            subkeys[i] = new BITS(56);
            for(j=0;j<28;j++) {
                subkeys[i].set(j,lkey.get(j));
                subkeys[i].set(j+28,rkey.get(j));
            }
            subkeys[i] = DES.permute(subkeys[i],DES.DesPermuted,48);
        }
        temp = new BITS(64);
        for(var i=0;i<8;i++) {
            temp.data[i] = source.data[i];
        }
        temp = DES.permute(temp,DES.DESInitial,64);
        lblk = new BITS(32);
        rblk = new BITS(32);
        for(var j=0;j<32;j++) {
            lblk.set(j,temp.get(j));
            rblk.set(j,temp.get(j+32));
        }
        for(var i=0;i<16;i++) {
            if(i==12) {
                var a =1;
            }
            fblk = new BITS(32);
            fblk.memcpy(rblk,4);
            fblk = DES.permute(fblk,DES.DesExpansion,48);
            if(direction == DES.encipher) {
                xblk = fblk.xor(subkeys[i]);
                fblk.memcpy(xblk,6);
            } else {
                xblk = fblk.xor(subkeys[15-i]);
                fblk.memcpy(xblk,6);
            }
            p=0;
            for(var j=0;j<8;j++) {
                var row,col;
                row = (fblk.get(j*6+0)*2) + (fblk.get(j*6+5)*1);
                col = (fblk.get(j*6+1)*8) + (fblk.get(j*6+2)*4) +
                      (fblk.get(j*6+3)*2) + (fblk.get(j*6+4)*1);

                sblk = new BITS(8);
                sblk.data[0] = DES.DesSbox[j][row][col];
                for(k=4;k<8;k++) {
                    fblk.set(p,sblk.get(k));
                    p++;
                }
            }
            fblk = DES.permute(fblk,DES.DesPbox,32);
            xblk = lblk.xor(fblk);
            lblk.memcpy(rblk,4);
            rblk.memcpy(xblk,4);
        }
        target = new BITS(64);
        for(var j=0;j<32;j++) {
            target.set(j,rblk.get(j));
            target.set(j+32,lblk.get(j));
        }
        target = DES.permute(target,DES.DesFinal,64);
        return target;
    }
};