const express = require('express');
const { sendMessageToESP32 } = require('./websocket');

const router = express.Router();

router.post("/send", (req, res) => {
    const { message } = req.body;
    const response = sendMessageToESP32(message);
    res.json(response);
});

module.exports = router;