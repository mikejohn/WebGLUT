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
        dest = mat2;
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