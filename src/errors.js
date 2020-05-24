class NoPortConfiguredError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoPortConfiguredError";
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

class EntityWithoutFieldsError extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityWithoutFieldsError";
    }
}

class EntityWithoutNameError extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityWithoutNameError";
    }
}

module.exports = {
    NoPortConfiguredError,
    PortIsTakenError,
    APIUnreachableError,
    EntityWithoutFieldsError,
    EntityWithoutNameError
};