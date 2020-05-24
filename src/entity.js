const { EntityWithoutFieldsError, EntityWithoutNameError, EntityWithRepeatedFieldError, EntityWithoutURLError } = require('./errors');

class Entity {

    name;
    RESTAPIURL;
    fields;

    constructor(name, RESTAPIURL, fields) {
        if (!name) throw new EntityWithoutNameError();
        if (!RESTAPIURL) throw new EntityWithoutURLError();
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

    // TODO: do it using template literals as functions
    getQueryString(){
        return `${this.getName()}: [${this.getName()}]!`
    }

    // TODO: do it using template literals as functions
    getTypeString(){
        const fieldsType = this.getFields().map(field => field.getTypeString()).join('\n');
        return `type ${this.getName()} {
            ${fieldsType}
        }`;
    }

    getResolver(){
        return (async () => {
            const response = await fetch(this.getRESTAPIURL(), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            return data;
        });
    }

}

module.exports = Entity;