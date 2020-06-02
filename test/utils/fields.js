const { Fields } = require('../../src/index');

const { Field, ArrayField, StringField, FloatField, IntField, BooleanField, ObjectField, StringArrayField,
    FloatArrayField, IntArrayField, BooleanArrayField, ObjectArrayField, ReferenceField, ArrayReferenceField } = Fields;

class fieldUtils {

    getStringField() {
        return new StringField("stringField");
    }

    getFloatField() {
        return new FloatField("floatField");
    }

    getIntField() {
        return new IntField("intField");
    }

    getBooleanField() {
        return new BooleanField("booleanField");
    }

    getObjectField() {
        return new ObjectField("objectField");
    }

    getStringArrayField() {
        return new StringArrayField("stringArrayField");
    }

    getFloatArrayField() {
        return new FloatArrayField("floatArrayField");
    }

    getIntArrayField() {
        return new IntArrayField("intArrayField");
    }

    getBooleanArrayField() {
        return new BooleanArrayField("booleanArrayField");
    }

    getObjectArrayField() {
        return new ObjectArrayField("objectArrayField");
    }

    getReferenceField() {
        return new ReferenceField("referenceField");
    }

    getArrayReferenceField() {
        return new ArrayReferenceField("referenceField");
    }

    getNoTypeField() {
        return new Field("fieldName");
    }

    getNoTypeArrayField() {
        return new ArrayField("fieldName");
    }

    getAFields() {
        const fields = []
        fields.push(new StringField("id"));
        fields.push(new StringField("name"));
        fields.push(new ReferenceField("BId"));
        return fields;
    }

    getBFields() {
        const fields = []
        fields.push(new StringField("id"));
        fields.push(new StringField("name"));
        fields.push(new ReferenceField("CId"));
        return fields;
    }

    getCFields() {
        const fields = []
        fields.push(new StringField("id"));
        fields.push(new StringField("name"));
        fields.push(new ArrayReferenceField("AIds"));
        return fields;
    }

    getNoNameField() {
        return new StringField(undefined);
    }

    getNoNameArrayField() {
        return new StringArrayField(undefined);
    }

    getNoNameReferenceField() {
        return new ReferenceField(undefined);
    }

    getNoNameArrayReferenceField() {
        return new ArrayReferenceField(undefined);
    }

}

module.exports = new fieldUtils();