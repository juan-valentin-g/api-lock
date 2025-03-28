const db = require('../../DB/mysql');

const TABLA = 'records';

module.exports = function (dbInyectada) {
    let db = dbInyectada;

    if(!db) {
        db = require('../../DB/mysql');
    }

    function getRecords () {
        return db.allRecords(TABLA);
    }

    return {
        getRecords,
    }
}