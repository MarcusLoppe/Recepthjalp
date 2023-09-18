var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "./recipes.db"

var db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READONLY);


db.run( 'PRAGMA journal_mode = Memory;' );
module.exports = db
