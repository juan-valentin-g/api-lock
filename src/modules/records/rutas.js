const express = require('express');

const answers = require('../../red/respuestas');
const controller = require('./index');

const router = express.Router();

router.get('/', all);

async function all(req, res, next) {
    try {
        const items = await controller.getRecords();
        answers.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;