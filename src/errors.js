// TODO: Write better messages
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

class RESTAPIUnreachableError extends Error {
    constructor(message) {
        super(message);
        this.name = "RESTAPIUnreachableError";
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

class EntityWithRepeatedFieldError extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityWithRepeatedFieldError";
    }
}

class FieldWithoutNameError extends Error {
    constructor(message) {
        super(message);
        this.name = "FieldWithoutNameError";
    }
}

class FieldWithoutTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "FieldWithoutTypeError";
    }
}

module.exports = {
    NoPortConfiguredError,
    PortIsTakenError,
    RESTAPIUnreachableError,
    EntityWithoutFieldsError,
    EntityWithoutNameError,
    EntityWithRepeatedFieldError,
    FieldWithoutNameError,
    FieldWithoutTypeError
};