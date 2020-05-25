// TODO: Write better messages
class NoPortConfiguredError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoPortConfiguredError";
    }
}

class NoEntitiesConfiguredError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoEntitiesConfiguredError";
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

class EntityWithoutNameError extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityWithoutNameError";
    }
}

class EntityRepeatedName extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityRepeatedName";
    }
}

class EntityWithoutURLError extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityWithoutURLError";
    }
}

class EntityWithoutFieldsError extends Error {
    constructor(message) {
        super(message);
        this.name = "EntityWithoutFieldsError";
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

class FieldWithoutValidTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "FieldWithoutValidTypeError";
    }
}

module.exports = {
    NoPortConfiguredError,
    NoEntitiesConfiguredError,
    PortIsTakenError,
    RESTAPIUnreachableError,
    EntityWithoutNameError,
    EntityRepeatedName,
    EntityWithoutURLError,
    EntityWithoutFieldsError,
    EntityWithRepeatedFieldError,
    FieldWithoutNameError,
    FieldWithoutTypeError,
    FieldWithoutValidTypeError
};