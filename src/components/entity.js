const _ = require('lodash');
require('isomorphic-fetch');

const { EntityWithoutFieldsError, EntityWithoutNameError, EntityWithRepeatedFieldError, EntityWithoutURLError } = require('../errors');

class Entity {

    name;
    RESTAPIURL;
    fields;

    constructor(name, RESTAPIURL, fields) {
        if (!name) throw new EntityWithoutNameError();
        if (!RESTAPIURL) throw new EntityWithoutURLError(name);
        if (!fields || (fields.length == 0)) throw new EntityWithoutFieldsError(name);
        if (this.thereIsARepeteadNameField(fields)) throw new EntityWithRepeatedFieldError(name);
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

    thereIsARepeteadNameField(fields) {
        return _.uniqBy(fields, field => field.getName()).length != fields.length;
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

    getQueryString(){
        return `${this.getName()}: [${this.getName()}]!`;
    }

    getTypeString(){
        const fieldsType = this.getFields().map(field => field.getTypeString``).join('\n');
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