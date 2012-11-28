/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-28
 * Time: 上午11:33
 * To change this template use File | Settings | File Templates.
 */
TestSet = function (name,pre_do) {
    this.name = name;
    this.pre_do = pre_do;
    this.set = [];
    this.length = 0;

};
TestSet.prototype = {
    constructor : TestSet,
    add : function (testcase) {
        this.set[this.length++] = testcase;
    },
    run : function () {
        TestCase.TestObj = [];
        if(this.pre_do != null) {
            eval(this.pre_do);
        }
        var pass = 0;
        console.log(this.name + "is running. Total "+this.length+" cases");
        for(var i=0;i<this.length;i++) {
            if(this.set[i].run()) {
                pass++;
            }
        }
        console.log(pass+' cases passsed.Passrate:'+ pass/this.length*100+'%');
    }
};