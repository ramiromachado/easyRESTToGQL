const Field = require('./field');

class ArrayField extends Field{
    constructor(){
        const [ name, type ] = arguments;
        super(name,type);
    }

    setType(type) {
        this.type = `[${type}]`;
    }

}
module.exports = ArrayField;