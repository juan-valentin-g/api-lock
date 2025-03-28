const { app, server } = require('./app');

server.listen(app.get('port'), "0.0.0.0", () => {
    console.log('Servidor establecido: ', app.get('port'))
})