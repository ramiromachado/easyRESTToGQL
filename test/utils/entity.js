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

        return new Entity("EntityWithAllTypeOfFields", "url", fields);
    }

    getNestedEntity(nestedEntityName) {
        return new NestedEntity(nestedEntityName, [fieldUtils.getStringField()]);
    }

    getNestedEntityWithNestedField(name, entityName) {
        const fields = [];
        fields.push(fieldUtils.getNestedField({name, entityName}));
        fields.push(fieldUtils.getArrayNestedField({name: name + "s", entityName}));

        return new NestedEntity(name, fields);
    }

    getEntityWithNestedFieldAndNestedArrayField(name, entityName) {
        const fields = [];

        fields.push(fieldUtils.getNestedField({name, entityName}));
        fields.push(fieldUtils.getArrayNestedField({name: name + "s", entityName}));
        return new Entity(name, "url", fields);
    }

    getEntityWithNestedEntity() {
        const nestedEntityName = "nestedEntity";
        const nestedEntityFields = [fieldUtils.getStringField(),fieldUtils.getFloatField()];
        const nestedEntity = new NestedEntity(nestedEntityName, nestedEntityFields);
        const name = nestedEntity.getName();
        const entityName = nestedEntity.getName();

        const fields = [];
        fields.push(fieldUtils.getNestedField({name, entityName}));
        fields.push(fieldUtils.getArrayNestedField({name: name + "s", entityName}));
        const entity = new Entity("entityWithNestedFields", "url", fields);

        return { entity, nestedEntity};
    }

    getReferencedABCEntities(){
        // A has id, name and B fields
        // B has id, name and C fields
        // C has id, name and As fields
        const A = new Entity("A", "url", fieldUtils.getAFields());
        const B = new Entity("B", "url", fieldUtils.getBFields());
        const C = new Entity("C", "url", fieldUtils.getCFields());

        return {A,B,C};
    }

    referenceBy(referenceEntity, referencedEntity, referenceFieldName, referencedFieldName){
        referenceEntity.referenceBy(referencedEntity, referenceFieldName, referencedFieldName);
    }

    getNoNameEntity() {
        const fields = [fieldUtils.getStringField()];
        return new Entity(undefined, "url", fields);
    }

    getNoURLEntity() {
        const fields = [fieldUtils.getStringField()];
        return new Entity("withoutURL", undefined, fields);
    }

    getUnreachableURLEntity(){
        const fields = [fieldUtils.getStringField()];
        return new Entity("withoutURL", "unreachable", fields);
    }

    getAnotherUnreachableURLEntity(){
        const fields = [fieldUtils.getStringField()];
        return new Entity("anotherWithoutURL", "unreachable", fields);
    }

    getNoFieldsEntity() {
        const fields = [];
        return new Entity("withoutFields", "url", fields);
    }
}

module.exports = new entityUtils();