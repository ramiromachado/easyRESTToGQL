const ArrayField = require('./arrayField');

class ObjectArrayField extends ArrayField{
    constructor(name, config){
        super(name, "object", config);
    }

}
module.exports = ObjectArrayField;