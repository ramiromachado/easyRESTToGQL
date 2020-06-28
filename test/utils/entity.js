const fieldUtils = require('./fields');
const { Entities } = require('../../src/index');
const { NestedEntity, Entity } = Entities;

class entityUtils {

    getWithAllBasicTypeOfFieldsEntity() {
        const fields = [];

        fields.push(fieldUtils.getStringField());
        fields.push(fieldUtils.getFloatField());
        fields.push(fieldUtils.getIntField());
        fields.push(fieldUtils.getBooleanField());
        fields.push(fieldUtils.getObjectField());
        fields.push(fieldUtils.getDateField());
        fields.push(fieldUtils.getStringArrayField());
        fields.push(fieldUtils.getFloatArrayField());
        fields.push(fieldUtils.getIntArrayField());
        fields.push(fieldUtils.getBooleanArrayField());
        fields.push(fieldUtils.getObjectArrayField());
        fields.push(fieldUtils.getDateArrayField());

        const url = "url";
        const entityConfig = { url, fields};

        return new Entity("EntityWithAllTypeOfFields", entityConfig);
    }

    getNestedEntity(nestedEntityName) {
        const fields = [fieldUtils.getStringField()];
        const entityConfig = { fields };
        return new NestedEntity(nestedEntityName, entityConfig);
    }

    getNestedEntityWithNestedField(name, entityName) {
        const fields = [];
        fields.push(fieldUtils.getNestedField({name, entityName}));
        fields.push(fieldUtils.getArrayNestedField({name: name + "s", entityName}));
        const entityConfig = { fields };

        return new NestedEntity(name, entityConfig);
    }

    getEntityWithNestedFieldAndNestedArrayField(name, entityName) {
        const fields = [];

        fields.push(fieldUtils.getNestedField({name, entityName}));
        fields.push(fieldUtils.getArrayNestedField({name: name + "s", entityName}));

        const url = "url";
        const entityConfig = { url, fields };
        return new Entity(name, entityConfig);
    }

    getEntityWithNestedEntity() {
        const nestedEntityName = "nestedEntity";
        const nestedEntityFields = [fieldUtils.getStringField(),fieldUtils.getFloatField()];
        const nestedEntityConfig = { fields: nestedEntityFields};
        const nestedEntity = new NestedEntity(nestedEntityName, nestedEntityConfig);
        const name = nestedEntity.getName();
        const entityName = nestedEntity.getName();

        const fields = [];
        fields.push(fieldUtils.getNestedField({name, entityName}));
        fields.push(fieldUtils.getArrayNestedField({name: name + "s", entityName}));

        const url = "url";
        const entityConfig = { url, fields};
        const entity = new Entity("entityWithNestedFields", entityConfig);

        return { entity, nestedEntity};
    }

    getReferencedABCEntities(){
        // A has id, name and B fields
        // B has id, name and C fields
        // C has id, name and As fields
        const url = "url";
        const fieldsA = fieldUtils.getAFields();
        const entityConfigA = { url, fields: fieldsA};

        const fieldsB = fieldUtils.getBFields();
        const entityConfigB = { url, fields: fieldsB};

        const fieldsC = fieldUtils.getCFields();
        const entityConfigC = { url, fields: fieldsC};

        const A = new Entity("A", entityConfigA);
        const B = new Entity("B", entityConfigB);
        const C = new Entity("C", entityConfigC);

        return {A,B,C};
    }

    referenceBy(referenceEntity, referencedEntity, referenceFieldName, referencedFieldName){
        referenceEntity.referenceBy(referencedEntity, referenceFieldName, referencedFieldName);
    }

    getNoNameEntity() {
        const fields = [fieldUtils.getStringField()];
        const url = "url";
        const entityConfig = { url, fields};
        return new Entity(undefined, entityConfig);
    }

    getNoURLEntity() {
        const url = undefined;
        const fields = [fieldUtils.getStringField()];
        const entityConfig = { url, fields};
        return new Entity("withoutURL", entityConfig);
    }

    getUnreachableURLEntity(){
        const fields = [fieldUtils.getStringField()];
        const url = "unreachable";
        const entityConfig = { url, fields};
        return new Entity("withoutURL", entityConfig);
    }

    getAnotherUnreachableURLEntity(){
        const fields = [fieldUtils.getStringField()];
        const url = "unreachable";
        const entityConfig = { url, fields};
        return new Entity("anotherWithoutURL", entityConfig);
    }

    getNoFieldsEntity() {
        const fields = [];
        const url = "url";
        const entityConfig = { url, fields};
        return new Entity("withoutFields", entityConfig);
    }
}

module.exports = new entityUtils();