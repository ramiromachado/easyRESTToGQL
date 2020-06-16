const Errors = require('../../errors');

class Field {

    name;
    type;
    resolver;
    alias;

    constructor(name, type) {
        if (!name) throw new Errors.FieldWithoutNameError();

        if (this.constructor == Field || !type) throw new Errors.FieldWithoutTypeError(name);
        this.setName(name);
        this.setAlias(name);
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

    getAlias() {
        return this.alias;
    }

    setAlias(alias) {
        if(!alias) throw new Errors.AliasWithoutNameError(this.getName());
        this.alias = alias;
        return this;
    }

    getTypeString() {
        return `${this.getAlias()}: ${this.getType()}`;
    }

    generateType(type) {
        return this.getTypesMap()[type];
    }

    getTypesMap() {
        return {
            string: "String",
            float: "Float",
            int: "Int",
            boolean: "Boolean",
            object: "Object",
            date: "Date",
            array: "String",
            reference: "Reference",
            arrayReference: "ArrayReference"
        }
    }

    isNested(){
        return false;
    }

}

module.exports = Field;