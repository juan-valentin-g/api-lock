const WebSocket = require('ws');

let wsClient = null;

const initWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("ESP32 conectada");
        wsClient = ws;

        ws.on("message", (message) => {
            console.log("Mensaje recibido de ESP32: ", message.toString());
        });

        ws.on("close", () => {
            console.log("ESP32 desconectada");
            wsClient = null;
        });
    });

    return wss;
}

const sendMessageToESP32 = (message) => {
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(message);
        return { success: true, message: "Mensaje enviado a ESP32"};
    }
    return { success: false, message: "ESP32 no conectada" };
}

module.exports = { initWebSocket, sendMessageToESP32}