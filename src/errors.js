class NotPortConfiguredError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotPortConfiguredError";
    }
}

class PortIsTakenError extends Error {
    constructor(message) {
        super(message);
        this.name = "PortIsTakenError";
    }
}

class APIUnreachableError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIUnreachableError";
    }
}

module.exports = {
    NotPortConfiguredError,
    PortIsTakenError,
    APIUnreachableError
};