/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-6
 * Time: 下午2:23
 * To change this template use File | Settings | File Templates.
 */
AG.isSort = function (data,compare) {
    var size = data.length;
    var key, i,j;
    for(j=1;j<size;j++) {
        key = data[j];
        i = j-1;
        while(i >=0 && compare(data[i],key)>0) {
            data[i+1] = data[i];
            i--;
        }
        data[i+1] = key;
    }
    keu = null;
    return 0;
};
AG.qkSort = function (data,compare) {
    return qksort(data,compare,0,data.length-1);

    function qksort (data,compare,i,k) {
        var size =data.length;
        var j;
        while(i<k) {
            if((j = partition(data,i,k,compare))<0) {
                return -1;
            }
            if(qksort(data,compare,i,j) < 0) {
                return -1;
            }
            i = j+1;
        }
        return 0;
    }

    function partition (data,i,k,compare) {
        var i, k, pval,temp ,r = [];
        r[0] = data[Math.floor((Math.random()*(k-i+1))+i)];
        r[1] = data[Math.floor((Math.random()*(k-i+1))+i)];
        r[2] = data[Math.floor((Math.random()*(k-i+1))+i)];
        AG.isSort(r,compare);
        pval = r[1];
        i--;
        k++;
        while (true) {
            do {
                k--;
            } while (compare(data[k],pval)>0);
            do {
                i++;
            } while (compare(data[i],pval)<0);
            if(i >= k) {
                break;
            } else {
                temp = data[i];
                data[i] = data[k];
                data[k] = temp;
            }
        }
        pval = null;
        temp = null;
        return k;
    }
};
AG.mgSort = function (data,compare) {
    return mgsort(data,0,data.length-1,compare);

    function mgsort (data,i,k,compare) {
        var j;
        if(i<k) {
            j = Math.floor((i+k-1)/2);
            if(mgsort(data,i,j,compare)<0) {
                return -1;
            }
            if(mgsort(data,j+1,k,compare) <0) {
                return -1;
            }
            if(merge(data,i,j,k,compare)<0) {
                return -1;
            }
        }
        return 0;
    }
    function merge (data,i,j,k,compare) {
        var ipos,jpos,mpos;
        var m = [];
        ipos = i;
        jpos = j+ 1;
        mpos = 0;
        while ( ipos<=j || jpos <= k) {
            if(ipos > j) {
                while (jpos <=k) {
                    m[mpos] = data[jpos];
                    jpos++;
                    mpos++;
                }
                continue;
            } else if( jpos > k) {
                while(ipos <= j) {
                    m[mpos] = data[ipos];
                    ipos++;
                    mpos++;
                }
                continue;
            }
            if(compare(a[ipos],a[jpos])<0) {
                m[mpos] = data[ipos];
                ipos++;
                mpos++;
            } else {
                m[mpos] = data[jpos];
                jpos++;
                mpos++;
            }
        }
        for(var l=0;l<k-i+1;l++) {
            data[i+l] = m[l];
        }
        m = null;
        return 0;
    }
};
AG.ctSort = function (data) {
    var size = data.length;
    var counts =[],temp=[];
    var i,j;
    for(var k=0;k<size;k++) {
        counts[data[k]] = 0;
    }
    for(j=0;j<size;j++) {
        counts[data[j]] = counts[data[j]]+1;
    }
    var prev = null;
    for(i in counts) {
        if(prev == null) {
            prev = counts[i];
            continue;
        } else {
            counts[i] = counts[i] + prev;
            prev = counts[i];
        }
    }
    for(j=size-1;j>=0;j--) {
        temp[counts[data[j]]-1] = data[j];
        counts[data[j]] = counts[data[j]] -1;
    }
    for(var l=0;l<size;l++) {
        data[l] = temp[l];
    }
    counts = null;
    temp = null;
    return 0;
};