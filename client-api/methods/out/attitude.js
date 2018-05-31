const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws, payload) {
    send(ws, "attitude",payload);
}