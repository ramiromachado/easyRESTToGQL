const { Fields } = require('../../src/index');

const { Field, ArrayField, StringField, FloatField, IntField, BooleanField, ObjectField, StringArrayField,
    FloatArrayField, IntArrayField, BooleanArrayField, ObjectArrayField, ReferenceField, ArrayReferenceField } = Fields;

class fieldUtils {

    getStringField() {
        return new StringField("stringField");
    }

    getNoNameStringField() {
        return new StringField(undefined);
    }

    getFloatField() {
        return new FloatField("floatField");
    }

    getNoNameFloatField() {
        return new FloatField(undefined);
    }

    getIntField() {
        return new IntField("intField");
    }

    getNoNameIntField() {
        return new IntField(undefined);
    }

    getBooleanField() {
        return new BooleanField("booleanField");
    }

    getNoNameBooleanField() {
        return new BooleanField(undefined);
    }

    getObjectField() {
        return new ObjectField("objectField");
    }

    getNoNameObjectField() {
        return new ObjectField();
    }

    getStringArrayField() {
        return new StringArrayField("stringArrayField");
    }

    getNoNameStringArrayField() {
        return new StringArrayField(undefined);
    }

    getFloatArrayField() {
        return new FloatArrayField("floatArrayField");
    }

    getNoNameFloatArrayField() {
        return new FloatArrayField(undefined);
    }

    getIntArrayField() {
        return new IntArrayField("intArrayField");
    }

    getNoNameIntArrayField() {
        return new IntArrayField(undefined);
    }

    getBooleanArrayField() {
        return new BooleanArrayField("booleanArrayField");
    }

    getNoNameBooleanArrayField() {
        return new BooleanArrayField(undefined);
    }

    getObjectArrayField() {
        return new ObjectArrayField("objectArrayField");
    }

    getNoNameObjectArrayField() {
        return new ObjectArrayField(undefined);
    }

    getReferenceField() {
        return new ReferenceField("referenceField");
    }

    getNoNameReferenceField() {
        return new ReferenceField(undefined);
    }

    getArrayReferenceField() {
        return new ArrayReferenceField("referenceField");
    }

    getNoNameArrayReferenceField() {
        return new ArrayReferenceField(undefined);
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

}

module.exports = new fieldUtils();