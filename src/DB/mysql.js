const mysql = require('mysql2');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

// CONEXION CON LA BASE DE DATOS 

function conMysql() {
    conexion = mysql.createConnection(dbConfig);

    conexion.connect((err) => {
        if(err) {
            console.log('[db err]', err);
        } else {
            console.log('DB conectada !!!')
        }
    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    })
}

conMysql();

// CONSULTAS PARA TODOS LOS REGISTROS 

function allRecords(tabla) {
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT 
            ra.id_record,
            u.nombre, 
            u.apellido, 
            ta.descripcion AS tipoAcceso, 
            ra.fechaHora 
            FROM ${tabla} ra 
            LEFT JOIN users u on ra.idUsuario = u.idUsuario 
            LEFT JOIN tipoacceso ta on ra.idTipoAcceso = ta.idTipoAcceso 
            ORDER BY ra.fechaHora DESC`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// CONSULTAR SOLO UN REGISTRO

function oneRecord(tabla, id) {
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error): resolve(result);
        });
    });
}

// AGREGAR DATOS A UNA TABLA

function addData(tabla, data) {
    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error): resolve(result);
        });
    });
}

//ELIMINAR DATOS EN UNA TABLA

function deleteData(tabla, data) {
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error): resolve(result);
        });
    });
}

module.exports = {
    allRecords, addData, oneRecord, deleteData 
}