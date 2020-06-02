const ArrayField = require('./arrayField');

class StringArrayField extends ArrayField{
    constructor(){
        super(...arguments, "string");
    }

}
module.exports = StringArrayField;