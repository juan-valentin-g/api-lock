exports.success = function (req, res, message = '', status = 200) {
    res.status(status).send({
        success: true,
        status: status,
        data: message
    });
}

exports.error = function (req, res, message = 'Error interno', status= 500) {
    res.status(status).send({
        success: true,
        status: status,
        error: message
    });
}