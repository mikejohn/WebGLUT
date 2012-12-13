/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-6
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */
/**
 * biSearch
 * @description Uses binary search to locate target in sorted, a sorted array of elements.
 * @param data
 * @param target
 * @param compare This function should return 1 if key1 > key2, if key1 = key2, and -1 if key1 < key2.
 */
AG.biSearch = function (data,target,compare) {
    var size = data.length;
    var left,middle,right;
    left = 0; right = size -1;
    while (left <= right) {
        middle = Math.floor((left+right)/2);
        switch (compare(data[middle],target)) {
            case -1 :
                left = middle + 1;
                break;
            case 1 :
                right = middle -1;
                break;
            case 0 :
                return middle;
        }
    }
    return -1;
};