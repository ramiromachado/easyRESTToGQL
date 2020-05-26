const { FieldWithoutNameError, FieldWithoutTypeError, FieldWithoutValidTypeError } = require('../../errors');

class Field {

    name;
    type;

    constructor(name, type) {
        if (!name) throw new FieldWithoutNameError();
        if (!type) throw new FieldWithoutTypeError(name);
        this.setName(name);
        this.setType(type);
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
        this.type = this.generateType(type);
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
            array: "String"
        }
    }

}

module.exports = Field;