/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 11/2/12
 * Time: 12:19 AM
 * To change this template use File | Settings | File Templates.
 */

var MatrixArray = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

var mat4 = {};
mat4.create = function () {
    var dest = new MatrixArray(16);
    if (arguments.length > 0) {
        params = ["placeholder"];
        for (var i = 0; i < arguments.length; i++) {
            params[i + 1] = arguments[i];
        }
        assignByMultiFormat(dest, params);
    }
    return dest;
};
mat4.set = function (dest) {
    if (!dest) {
        dest = new MatrixArray(16);
    }
    assignByMultiFormat(dest, arguments);
    return dest;
};
mat4.identity = function (dest) {
    if (!dest) {
        dest = mat4.create();
    }
    dest[0] = 1;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 0;
    dest[5] = 1;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 0;
    dest[9] = 0;
    dest[10] = 1;
    dest[11] = 0;
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = 0;
    dest[15] = 1;
    return dest;
};
mat4.MULMat4 = function (mat1, mat2, dest) {
    if (!dest) {
        dest = new MatrixArray(16);
    }
    dest[0] = mat1[0] * mat2[0] + mat1[4] * mat2[1] + mat1[8] * mat2[2] + mat1[12] * mat2[3];
    dest[1] = mat1[1] * mat2[0] + mat1[5] * mat2[1] + mat1[9] * mat2[2] + mat1[13] * mat2[3];
    dest[2] = mat1[2] * mat2[0] + mat1[6] * mat2[1] + mat1[10] * mat2[2] + mat1[14] * mat2[3];
    dest[3] = mat1[3] * mat2[0] + mat1[7] * mat2[1] + mat1[11] * mat2[2] + mat1[15] * mat2[3];
    dest[4] = mat1[0] * mat2[4] + mat1[4] * mat2[5] + mat1[8] * mat2[6] + mat1[12] * mat2[7];
    dest[5] = mat1[1] * mat2[4] + mat1[5] * mat2[5] + mat1[9] * mat2[6] + mat1[13] * mat2[7];
    dest[6] = mat1[2] * mat2[4] + mat1[6] * mat2[5] + mat1[10] * mat2[6] + mat1[14] * mat2[7];
    dest[7] = mat1[3] * mat2[4] + mat1[7] * mat2[5] + mat1[11] * mat2[6] + mat1[15] * mat2[7];
    dest[8] = mat1[0] * mat2[8] + mat1[4] * mat2[9] + mat1[8] * mat2[10] + mat1[12] * mat2[11];
    dest[9] = mat1[1] * mat2[8] + mat1[5] * mat2[9] + mat1[9] * mat2[10] + mat1[13] * mat2[11];
    dest[10] = mat1[2] * mat2[8] + mat1[6] * mat2[9] + mat1[10] * mat2[10] + mat1[14] * mat2[11];
    dest[11] = mat1[3] * mat2[8] + mat1[7] * mat2[9] + mat1[11] * mat2[10] + mat1[15] * mat2[11];
    dest[12] = mat1[0] * mat2[12] + mat1[4] * mat2[13] + mat1[8] * mat2[14] + mat1[12] * mat2[15];
    dest[13] = mat1[1] * mat2[12] + mat1[5] * mat2[13] + mat1[9] * mat2[14] + mat1[13] * mat2[15];
    dest[14] = mat1[2] * mat2[12] + mat1[6] * mat2[13] + mat1[10] * mat2[14] + mat1[14] * mat2[15];
    dest[15] = mat1[3] * mat2[12] + mat1[7] * mat2[13] + mat1[11] * mat2[14] + mat1[15] * mat2[15];
    return dest;
};

mat4.inverse = function (mat, dest) {
    if (!dest) {
        dest = new MatrixArray(16);
    }

    // Cache the matrix values (makes for huge speed increases!)
    var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
        invDet;

    // Calculate the determinant
    if (!d) { return null; }
    invDet = 1 / d;

    dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
    dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
    dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
    dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
    dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
    dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
    dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
    dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
    dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
    dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
    dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
    dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
    dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
    dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
    dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
    dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

    return dest;
};


mat4.MULVec4 = function (mat, vec, dest) {
    if (!dest) {
        dest = vec;
    }
    var x = vec[0], y = vec[1], z = vec[2] , w = vec[3];
    dest[0] = mat[0] * x + mat[1] * y + mat[2] * z + mat[3] * w;
    dest[1] = mat[4] * x + mat[5] * y + mat[6] * z + mat[7] * w;
    dest[2] = mat[8] * x + mat[9] * y + mat[10] * z + mat[11] * w;
    dest[3] = mat[12] * x + mat[13] * y + mat[14] * z + mat[15] * w;

    return dest;
};



mat4.dump = function (mat, name) {
    if (!name) {
        console.log('----------------');
    } else {
        console.log('----- ' + name + ' ----');
    }
    for (var i = 0; i < 4; i++) {
        console.log(mat[i] + ',' + mat[i + 4] + ',' + mat[i + 8] + ',' + mat[i + 12]);
    }
    console.log('----------------');
};