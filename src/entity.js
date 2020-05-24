const { EntityWithoutFieldsError, EntityWithoutNameError, EntityWithRepeatedFieldError, RESTAPIUnreachableError } = require('./errors');

class Entity {

    name;
    RESTAPIURL;
    fields;

    constructor(name, RESTAPIURL, fields) {
        if (!name) throw new EntityWithoutNameError();
        if (!fields || (fields.length == 0)) throw new EntityWithoutFieldsError();
        if (this.thereIsARepeteadNameField(fields)) throw new EntityWithRepeatedFieldError();
        this.setName(name);
        this.setRESTAPIURL(RESTAPIURL);
        this.setFields(fields);
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getRESTAPIURL() {
        return this.RESTAPIURL;
    }

    setRESTAPIURL(RESTAPIURL) {
        this.RESTAPIURL = RESTAPIURL;
    }

    getFields() {
        return this.fields;
    }

    setFields(fields) {
        this.fields = fields;
    }

    //TODO: Think if there is a better way to do this
    thereIsARepeteadNameField(fields) {
        return fields.some(fieldA => {
            return fields.some(fieldB => {
                return fieldA != fieldB && fieldA.getName() == fieldB.getName();
            });
        });
    }

    async isTheRESTAPIURLFetchable() {
        try {
            const response = await fetch(this.getRESTAPIURL(), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            return response.status == 200;
        } catch (err) {
            return false;
        }
    }

}

module.exports = Entity;