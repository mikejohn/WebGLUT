/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-27
 * Time: 下午2:51
 * To change this template use File | Settings | File Templates.
 */
TestCaseID = 0;
TestCase = function (info,code,result) {
    this.ID = TestCaseID++;
    this.info = info;
    this.code = code;
    this.result = result;
};
TestCase.prototype = {
    constructor: TestCase,
    run : function (testObj) {
        var  result = eval(this.code);
        var flag = eval(this.result);
        if(flag) {
            console.log("Pass!!TestCase"+this.ID+":"+this.info);
        } else {
            console.debug("Fail!!TestCase"+this.ID+":"+this.info+'.result: '+result);
        }
        return flag;
    }
};
TestCase.TestObj =[];