const { FieldWithoutNameError, FieldWithoutTypeError } = require('./errors');

class Field{

    name;
    type;

    constructor(name, type){
        if(!name) throw new FieldWithoutNameError();
        if(!type) throw new FieldWithoutTypeError();
        this.setName(name);
        this.setType(type);
    }

    getName(){
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getType(){
        return this.type;
    }

    setType(type) {
        this.type = this.generateType(type);
    }

    getTypeString(){
        return `${this.getName()}: ${this.getType()}`;
    }

    generateType(type){
        return typesMap[type];
    }

}

//TODO: Do this in abetter way
typesMap = {
    string: "String",
    float: "Float",
    int: "Int",
    array: "String",
    boolean: "Boolean"
}
module.exports = Field;