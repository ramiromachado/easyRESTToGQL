const Field = require('./field');

class ArrayField extends Field{
    constructor(){
        super(...arguments);
    }

    setType(type) {
        this.type = `[${type}]`;
    }

}
module.exports = ArrayField;