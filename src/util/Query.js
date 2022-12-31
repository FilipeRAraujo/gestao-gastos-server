module.exports = function Query() {
    var queryStr = [];

    this.append = function(str) {
        queryStr.push(str);
    }

    this.get = function() {
        return queryStr.join('');
    }
}