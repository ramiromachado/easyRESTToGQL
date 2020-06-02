const ArrayField = require('./arrayField');

class BooleanArrayField extends ArrayField{
    constructor(){
        super(...arguments, "boolean");
    }

}
module.exports = BooleanArrayField;