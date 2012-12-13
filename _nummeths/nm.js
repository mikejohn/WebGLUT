/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-10
 * Time: 下午12:24
 * To change this template use File | Settings | File Templates.
 */
NM = {};
NM.interPol = function (x,fx,z) {
    var pz = [];
    var n =  fx.length;
    var m =  z.length;
    var term;
    var table = [],coeff = [];
    var i,j,k;
    for(i=0;i<n;i++) {
        table[i] = fx[i];
    }
    coeff[0] = table[0];
    for(k=1;k<n;k++) {
        for(i=0;i<n-k;i++) {
            j = i+k;
            table[i] = (table[i+1] - table[i])/(x[j]-x[i]);
        }
        coeff[k] = table[0];
    }
    table = null;
    for(k=0;k<m;k++) {
        pz[k] = coeff[0];
        for(j=1;j<n;j++) {
            term = coeff[j];
            for(i=0;i<j;i++) {
                term = term*(z[k]-x[i]);
            }
            pz[k] = pz[k] + term;
        }
    }
    return pz;
};
/**
 * NM.lsqe
 * @description Uses least-squares estimation to obtain b 1 and b 0 in y (x) = b 1 x + b 0 so that y (x) is a best-fit line through a set of points. The x-coordinates of the points are specified in x. The y-coordinates are specified in y. The number of points is specified in n. The operation returns the appropriate values in b1 and b0.
 * @param x Array of x
 * @param y Array of y
 * @return {Object} Contains two member b1 b0
 */
NM.lsqe = function (x,y) {
    var n = x.length;
    var sumx = 0 ,sumy= 0,sumx2= 0,sumxy=0;
    var i;
    for(i = 0;i<n;i++) {
        sumx = sumx+x[i];
        sumy = sumy+y[i];
        sumx2 = sumx2 + Math.pow(x[i],2);
        sumxy = sumxy + (x[i]*y[i]);
    }
    var b1 = (sumxy -((sumx*sumy)/n))/(sumx2-(Math.pow(sumx,2)/n));
    var b0 = (sumy -((b1*sumx)))/n;
    return {b0 : b0,b1 : b1};
};
NM.root = function (f,g,x,n,delta) {
    var satisfied=false;i=0;
    while(!satisfied && i+1 < n) {
        x[i+1] = x[i] - (f(x[i])/g(x[i]));
        if(x[i+1]-x[i]<delta) {
            satisfied = true;
        }
        i++;
    }
    return x;
};