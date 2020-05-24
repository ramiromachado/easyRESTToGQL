const { EntityWithoutFieldsError, EntityWithoutNameError } = require('./errors');

class Entity{

    name;
    RESTAPIURL;
    fields;

    constructor(name, RESTAPIURL, fields){
        if(!name) throw new EntityWithoutNameError();
        if(!fields || (fields.length == 0)) throw new EntityWithoutFieldsError();
        this.setName(name);
        this.setRESTAPIURL(RESTAPIURL);
        this.setFields(fields);
    }

    getName(){
        return this.name;
    }

    setName(name ) {
        this.name = name;
    }

    getRESTAPIURL(){
        return this.RESTAPIURL;
    }

    setRESTAPIURL(RESTAPIURL) {
        this.RESTAPIURL = RESTAPIURL;
    }

    getFields(){
        return this.fields;
    }

    setFields(fields) {
        this.fields = fields;
    }

}

module.exports = Entity;