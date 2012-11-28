/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-24
 * Time: 下午3:09
 * To change this template use File | Settings | File Templates.
 */
/**
 * 十进制整数转换二进制字符串
 * @param decimal
 * @return {String}
 */
function decimalToBinaryString (decimal) {
    if(decimal == 0) {
        return "0";
    }
    var output = [];
    var highestBit = Math.floor(Math.log(decimal)/Math.LN2);
    for (i = highestBit; i >= 0; --i, decimal >>= 1)
    {
        output[i] = (decimal & 1) + 0;
    }
    var outString = '';
    for(var i=0;i<output.length;i++) {
        outString += output[i];
    }
    return outString;
}
/**
 * 二进制字符串转化为RGBA格式，R为最高位，A为最低位
 * @param binString
 * @return {Object}
 */
function binaryStringToRGBAFormat (binString) {
    if(binString.length > 32) {
        throw new Error('binary number out of RGBA format.');
    }
    var rs = gs =bs = as = '',r = g= b= a =0;
    if(binString.length > 24 ) {
        as = binString.substring(0,8);
        bs = binString.substring(8,16);
        gs = binString.substring(16,24);
        rs = binString.substring(24,binString.length);
    } else if (binString.length > 16 && binString.length <= 24 ) {
        as = binString.substring(0,8);
        bs = binString.substring(8,16);
        gs = binString.substring(16,binString.length);
        rs = '00000000';
    } else if (binString.length > 8 && binString.length <= 16) {
        as = binString.substring(0,8);
        bs = binString.substring(8,binString.length);
        gs = '00000000';
        rs = '00000000';
    } else {
        as = binString.substring(0,binString.length);
        bs = '00000000';
        gs = '00000000';
        rs = '00000000';
    }
    r = countComponent(rs);
    g = countComponent(gs);
    b = countComponent(bs);
    a = countComponent(as);

    return {r:r,g:g,b:b,a:a};

    function countComponent (componentString) {
        var componentLength = 8;
        if(componentString.length < 8) {
            componentLength = componentString.length;
        }
        var componentNumber = 0;
        for(var i = 0;i < componentLength;i++) {
            componentNumber += Math.pow(2,componentLength-i-1)*componentString.substring(i,i+1);
        }
        return componentNumber;
    }
}