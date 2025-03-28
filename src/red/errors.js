const answer = require('./respuestas');

function errors (err, req, res, next) {
    console.log('[error', err);

    const message = err.message;
    const status = err.statusCode;

    answer.error(req, res, message, status);

}

module.exports = errors;