const { Field, ArrayField, ReferenceField, ArrayReferenceField } = require('../../src/index');

class fieldUtils {

    getStringField() {
        return new Field("stringField", "string");
    }

    getFloatField() {
        return new Field("floatField", "float");
    }

    getIntField() {
        return new Field("intField", "int");
    }

    getBooleanField() {
        return new Field("booleanField", "boolean");
    }

    getObjectField() {
        return new Field("objectField", "object");
    }

    getStringArrayField() {
        return new ArrayField("stringArrayField", "string");
    }

    getFloatArrayField() {
        return new ArrayField("floatArrayField", "float");
    }

    getIntArrayField() {
        return new ArrayField("intArrayField", "int");
    }

    getBooleanArrayField() {
        return new ArrayField("booleanArrayField", "boolean");
    }

    getObjectArrayField() {
        return new ArrayField("objectArrayField", "object");
    }

    getReferenceField(entity, entityFieldName) {
        return new ReferenceField("referenceField", entity, entityFieldName);
    }

    getArrayReferenceField(entity, entityFieldName) {
        return new ArrayReferenceField("referenceField", entity, entityFieldName);
    }

    getNoNameField() {
        return new Field(undefined, "string");
    }

    getNoTypeField() {
        return new Field("id", undefined);
    }

    getInvalidTypeField() {
        return new Field("id", "invalidType");
    }

    getNoNameArrayField() {
        return new Field(undefined, "string");
    }

    getNoTypeArrayField() {
        return new Field("id", undefined);
    }

    getInvalidTypeArrayField() {
        return new Field("id", "invalidType");
    }

    getNoNameReferenceField(associatedEntity, fieldName) {
        return new ReferenceField(undefined, associatedEntity, fieldName);
    }

    getNoNameArrayReferenceField(associatedEntity, fieldName) {
        return new ArrayReferenceField(undefined, associatedEntity, fieldName);
    }

    getNoAssociatedEntityReferenceField() {
        return new ReferenceField("fieldName", undefined, "associatedEntityFieldName");
    }

    getNoAssociatedEntityArrayReferenceField() {
        return new ArrayReferenceField("fieldName", undefined, "associatedEntityFieldName");
    }

    getNoAssociatedEntityFieldNameReferenceField(associatedEntity) {
        return new ReferenceField("fieldName", associatedEntity, undefined);
    }

    getNoAssociatedEntityFieldNameArrayReferenceField(associatedEntity) {
        return new ArrayReferenceField("fieldName", associatedEntity, undefined);
    }

}

module.exports = new fieldUtils();