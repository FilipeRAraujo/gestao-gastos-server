const { Database, OPEN_READWRITE, OPEN_CREATE } = require('sqlite3');

module.exports = function ConnectionFactory() {
    this.getConnection = function() {
        return new Database('./database.db', OPEN_READWRITE | OPEN_CREATE, (err) => {
            if(err) {
                throw err;
            }
        })
    }
}