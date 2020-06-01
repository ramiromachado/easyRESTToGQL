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

    getReferenceField() {
        return new ReferenceField("referenceField");
    }

    getArrayReferenceField() {
        return new ArrayReferenceField("referenceField");
    }

    getAFields() {
        const fields = []
        fields.push(new Field("id", "string"));
        fields.push(new Field("name", "string"));
        fields.push(new ReferenceField("BId"));
        return fields;
    }

    getBFields() {
        const fields = []
        fields.push(new Field("id", "string"));
        fields.push(new Field("name", "string"));
        fields.push(new ReferenceField("CId"));
        return fields;
    }

    getCFields() {
        const fields = []
        fields.push(new Field("id", "string"));
        fields.push(new Field("name", "string"));
        fields.push(new ArrayReferenceField("AIds"));
        return fields;
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
        return new ArrayField(undefined, "string");
    }

    getNoTypeArrayField() {
        return new ArrayField("id", undefined);
    }

    getInvalidTypeArrayField() {
        return new ArrayField("id", "invalidType");
    }

    getNoNameReferenceField() {
        return new ReferenceField(undefined);
    }

    getNoNameArrayReferenceField() {
        return new ArrayReferenceField(undefined);
    }

}

module.exports = new fieldUtils();