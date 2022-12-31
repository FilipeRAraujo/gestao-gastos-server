module.exports = function Param() {
    var param = [];

    this.append = function(str) {
        param.push(str);
    }

    this.get = function() {
        return param;
    }
}