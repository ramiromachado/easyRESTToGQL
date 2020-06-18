const ArrayField = require('./arrayField');

class FloatArrayField extends ArrayField{
    constructor(name, config){
        super(name,"float", config);
    }

}
module.exports = FloatArrayField;