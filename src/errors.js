class NoPortConfiguredError extends Error {
    constructor() {
        super(`There is no port configured on the server`);
    }
}

class NoEntitiesConfiguredError extends Error {
    constructor() {
        super(`There is no entity configured on the server`);
    }
}

class PortIsTakenError extends Error {
    constructor(port) {
        super(`The port ${port} is busy`);
    }
}

class RESTAPIUnreachableError extends Error {

    constructor(RESTAPIURLs) {
        if (RESTAPIURLs.length == 1) {
            super(`The entity REST API URL ${RESTAPIURLs[0]} is unreachable`);
        } else {
            const allExectpLasturls = RESTAPIURLs.slice(0, RESTAPIURLs.length - 1).join(", ");
            super(`The entity REST API URLs ${allExectpLasturls} and ${RESTAPIURLs[RESTAPIURLs.length - 1]} are unreachable`);
        }
    }
}

class EntityWithoutNameError extends Error {
    constructor() {
        super(`A entity was created without a name`);
    }
}

class EntityRepeatedName extends Error {
    constructor() { //TODO: it would be nice to inform the repeated entity name
        super(`Two entities were created with the same name`);
    }
}

class EntityWithoutURLError extends Error {
    constructor(entittyName) {
        super(`The entity ${entittyName} was created without REST API URL`);
    }
}

class EntityWithoutFieldsError extends Error {
    constructor(entittyName) {
        super(`The entity ${entittyName} was created without fields`);
    }
}

class EntityWithRepeatedFieldError extends Error {
    constructor(entittyName) {
        super(`The entity ${entittyName} was created with a repeated field`);
    }
}

class FieldWithoutNameError extends Error {
    constructor() {
        super(`A field was created without name`);
    }
}

class FieldWithoutTypeError extends Error {
    constructor(fieldName) {
        super(`The field ${fieldName} was created without a type`);
    }
}

class FieldWithoutValidTypeError extends Error {
    constructor(fieldName, invalidType) {
        super(`The field ${fieldName} was created with the invalid type "${invalidType}"`);
    }
}

class ReferencedEntityIsMissingError extends Error {
    constructor(entityName) {
        super(`The ${entityName} try to reference an empty entity`);
    }
}

class ReferenceFieldNameIsMissingError extends Error {
    constructor(referenceEntityName, referencedEntityName) {
        super(`The reference field that connects ${referenceEntityName} field and ${referencedEntityName} is empty`);
    }
}

class ReferencedFieldNameIsMissingError extends Error {
    constructor(referenceEntityName, referencedEntityName) {
        super(`The referenced field that connects ${referenceEntityName} field and ${referencedEntityName} is empty`);
    }
}

class EntityHasNoFieldWithTheGivenNameError extends Error {
    constructor(entityName, fieldName) {
        super(`The entity ${entityName} has no field with the name "${fieldName}"`);
    }
}

class FieldIsNotReferenceTypeError extends Error {
    constructor(entityName, fieldName) {
        super(`The ${fieldName} in entity ${entityName} is not of ArrayReference or Reference type`);
    }
}

class FieldIsNotReferableError extends Error {
    constructor(entityName, fieldName) {
        super(`The ${fieldName} in entity ${entityName} is not referable`);
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
    FieldWithoutValidTypeError,
    ReferencedEntityIsMissingError,
    ReferenceFieldNameIsMissingError,
    ReferencedFieldNameIsMissingError,
    EntityHasNoFieldWithTheGivenNameError,
    FieldIsNotReferenceTypeError,
    FieldIsNotReferableError
};