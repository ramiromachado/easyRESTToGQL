const ArrayField = require('./arrayField');

class DateArrayField extends ArrayField{
    constructor(name, config){
        super(name, "date", config);
    }

}
module.exports = DateArrayField;