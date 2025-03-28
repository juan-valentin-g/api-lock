const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const initDB = require('./DB/mysql')
const config = require('./config');

// WS
const http = require('http');
const { initWebSocket } = require('./red/websocket');
const wsRoutes = require('./red/ws.routes');

const app = express();
const server = http.createServer(app);

const records = require('./modules/records/rutas');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

//RUTAS 
app.use('/api/records', records)

//Configuracion
app.set('port', config.app.port);

//WS
initWebSocket(server);
app.use("/ws", wsRoutes)

module.exports = { app, server };