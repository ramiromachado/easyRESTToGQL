const ArrayField = require('./arrayField');

class StringArrayField extends ArrayField{
    constructor(name, config){
        super(name, "string", config);
    }

}
module.exports = StringArrayField;