/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 11/2/12
 * Time: 12:03 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * object type define
 */
var FLOAT_EPSILON = 0.000001;
var $NUMBER = '[object Number]';
var $ARRAY = '[object Array]';
var $Float32Array = '[object Float32Array]';

function assignByMultiFormat(dest, params) {
    var destLength = dest.length;
    var index = 0;
    for (var i = 1; i < params.length; i++) {
        switch (Object.prototype.toString.call(params[i])) {
            case $NUMBER :
                dest[index] = params [i];
                index++;
                break;
            case $ARRAY :
                var source = params[i];
                for (var j = 0; j < source.length; j++) {
                    dest[index] = source[j];
                    index++;
                }
                break;
            case $Float32Array :
                var source = params[i];
                for (var j = 0; j < source.length; j++) {
                    dest[index] = source[j];
                    index++;
                }
                break;
            default :
                throw new Error('Vec set function arguments type cannot match.');
        }
    }
    if (index == destLength) {
        return dest;
    } else {
        throw new Error('Vec set function arguments number cannot match.');
    }
}

function vec_dump(vec, name) {
    var content = ''
    for (var i = 0; i < vec.length; i++) {
        content += vec[i];
        if (i != vec.length - 1) {
            content += ',';
        }
    }
    if (!name) {
        console.log('Name : , Type : Vec' + vec.length + ' Content:[' + content + ']');
    } else {
        console.log('Name : ' + name + ', Type : Vec' + vec.length + ', Content:[' + content + ']');
    }
}
var VecArray = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
var vec2 = {};
vec2.create = function () {
    var dest = new VecArray(2);
    if (arguments.length > 0) {
        var params = ['placeholder'];
        for (var i = 0; i < arguments.length; i++) {
            params[i + 1] = arguments[i];
        }
        assignByMultiFormat(dest, params);
    }
    return dest;
};
vec2.set = function (dest) {
    if (!dest) {
        dest = new VecArray(2);
    }
    assignByMultiFormat(dest, arguments);
};

var vec3 = {};
vec3.create = function () {
    var dest = new VecArray(3);
    if (arguments.length > 0) {
        var params = ['placeholder'];
        for (var i = 0; i < arguments.length; i++) {
            params[i + 1] = arguments[i];
        }
        assignByMultiFormat(dest, params);
    }
    return dest;
};
vec3.set = function (dest) {
    if (!dest) {
        dest = new VecArray(3);
    }
    assignByMultiFormat(dest, arguments);
    return dest;
};
vec3.isEqual = function (v1,v2) {
    if(v1.length != 3 || v2.length !=3) {
        return false;
    }
    if(v1[0] - v2[0] > FLOAT_EPSILON || v1[0] - v2[0] < - FLOAT_EPSILON) {
        return false;
    }
    if(v1[1] - v2[1] > FLOAT_EPSILON || v1[1] - v2[1] < - FLOAT_EPSILON) {
        return false;
    }
    if (v1[2] - v2[2] > FLOAT_EPSILON || v1[2] - v2[2] < - FLOAT_EPSILON) {
        return false;
    }
    return true;
};

var vec4 = {};
vec4.create = function () {
    var dest = new VecArray(4);
    if (arguments.length > 0) {
        var params = ['placeholder'];
        for (var i = 0; i < arguments.length; i++) {
            params[i + 1] = arguments[i];
        }
        assignByMultiFormat(dest, params);
    }
    return dest;
};
vec4.set = function (dest) {
    if (!dest) {
        dest = new VecArray(4);
    }
    assignByMultiFormat(dest, arguments);
    return dest;
};