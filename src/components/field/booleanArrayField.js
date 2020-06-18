const ArrayField = require('./arrayField');

class BooleanArrayField extends ArrayField{
    constructor(name, config){
        super(name, "boolean", config);
    }

}
module.exports = BooleanArrayField;