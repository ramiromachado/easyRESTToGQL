const { FieldWithoutNameError, FieldWithoutTypeError, FieldWithoutValidTypeError } = require('../../errors');

class Field {

    name;
    type;
    resolver;

    constructor(name, type) {
        if (!name) throw new FieldWithoutNameError();
        if (!type) throw new FieldWithoutTypeError(name);
        this.setName(name);
        this.setType(this.generateType(type));
        this.setResolver((item) => item[this.getName()]) // Set identity as default resolver
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getResolver() {
        return this.resolver;
    }

    setResolver(resolver) {
        this.resolver = resolver;
    }

    getTypeString() {
        return `${this.getName()}: ${this.getType()}`;
    }

    generateType(type) {
        const typeMapped = this.getTypesMap()[type];
        if (typeMapped) {
            return typeMapped;
        } else {
            throw new FieldWithoutValidTypeError(this.getName(), type);
        }
    }

    getTypesMap() {
        return {
            string: "String",
            float: "Float",
            int: "Int",
            boolean: "Boolean",
            object: "Object",
            array: "String",
            referenced: "Referenced", // TODO: Improve this
            arrayReferenced: "ArrayReferenced" // TODO: Improve this
        }
    }

}

module.exports = Field;