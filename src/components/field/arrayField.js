const Field = require('./field');

class ArrayField extends Field{
    constructor(){
        const [ name ] = arguments;
        super(name);
    }

    setType(type) {
        this.type = `[${type}]`;
    }

}
module.exports = ArrayField;