const ArrayField = require('./arrayField');

class ObjectArrayField extends ArrayField{
    constructor(){
        super(...arguments, "object");
    }

}
module.exports = ObjectArrayField;