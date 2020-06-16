const ArrayField = require('./arrayField');

class DateArrayField extends ArrayField{
    constructor(){
        const [ name ] = arguments;
        super(name,"date");
    }

}
module.exports = DateArrayField;