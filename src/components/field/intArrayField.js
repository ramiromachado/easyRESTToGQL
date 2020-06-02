const ArrayField = require('./arrayField');

class IntArrayField extends ArrayField{
    constructor(){
        super(...arguments, "int");
    }

}
module.exports = IntArrayField;