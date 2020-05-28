const _ = require('lodash');
require('isomorphic-fetch');

const Errors = require('../errors');

class Entity {

    name;
    RESTAPIURL;
    fields;

    constructor(name, RESTAPIURL, fields) {
        if (!name) throw new Errors.EntityWithoutNameError();
        if (!RESTAPIURL) throw new Errors.EntityWithoutURLError(name);
        if (!fields || (fields.length == 0)) throw new Errors.EntityWithoutFieldsError(name);
        if (this.thereIsARepeteadNameField(fields)) throw new Errors.EntityWithRepeatedFieldError(name);
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

    referenceBy(entityReferenced, referenceFieldName, referencedFieldName) {
        if (!entityReferenced) throw new Errors.ReferencedEntityIsMissingError(this.getName());
        if (!referenceFieldName) throw new Errors.ReferenceFieldNameIsMissingError(this.getName(), entityReferenced.getName());
        if (!referencedFieldName) throw new Errors.ReferencedFieldNameIsMissingError(this.getName(), entityReferenced.getName());

        const referenceField = this.getField(referenceFieldName);
        if (!referenceField) throw new Errors.EntityHasNoFieldWithTheGivenNameError(this.getName(), referenceFieldName);

        const referencedField = entityReferenced.getField(referencedFieldName)
        if (!referencedField) throw new Errors.EntityHasNoFieldWithTheGivenNameError(entityReferenced.getName(), referencedFieldName);

        const referenceFieldIsReferenceType = (referenceField.getType() == "[ArrayReference]") || (referenceField.getType() == "Reference");
        if(!referenceFieldIsReferenceType) throw new Errors.FieldIsNotReferenceTypeError(this.getName(), referenceField.getName());

        const referencedFieldIsReferable = !((referencedField.getType() == "[ArrayReference]") || (referencedField.getType() == "Reference"));
        if(!referencedFieldIsReferable) throw new Errors.FieldIsNotReferableError(entityReferenced.getName(), referencedField.getName());

        referenceField.setReferencedEntityAndField(entityReferenced, referencedField);

    }

    getField(fieldName) {
        return this.getFields().find(field => field.getName() === fieldName);
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

    getQueryString() {
        return `${this.getName()}: [${this.getName()}]!`;
    }

    getTypeString() {
        const fieldsType = this.getFields().map(field => field.getTypeString``).join('\n');
        return `type ${this.getName()} {
            ${fieldsType}
        }`;
    }

    getFetchAllFunction() {
        return (async () => {
            const response = await fetch(this.getRESTAPIURL(), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            return data;
        });
    }

    getTypeResolver() {
        return this.getFields().reduce((fieldsResolvers, field) => {
            fieldsResolvers[field.getName()] = field.getResolver();
            return fieldsResolvers;
        }, {});
    }

}

module.exports = Entity;