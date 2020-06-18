const ArrayField = require('./arrayField');

class IntArrayField extends ArrayField{
    constructor(name, config){
        super(name, "int", config);
    }

}
module.exports = IntArrayField;