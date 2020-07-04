const ENTITY = require('./entity/constants');
const FIELD = require('./field/constants');

const SERVER = {
    STATES: {
        CREATED: "CREATED",
        RUNNING: "RUNNING",
        STOP: "STOPPED"
    }
}

module.exports = {
    ENTITY,
    FIELD,
    SERVER
};