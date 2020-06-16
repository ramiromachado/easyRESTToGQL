const { Fields } = require('../../src/index');

const { Field, ArrayField, StringField, FloatField, IntField, BooleanField, ObjectField, DateField, StringArrayField,
    FloatArrayField, IntArrayField, BooleanArrayField, ObjectArrayField, DateArrayField, ReferenceField,
    ArrayReferenceField, NestedField, ArrayNestedField } = Fields;

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

    getDateField() {
        return new DateField("dateField");
    }

    getNoNameDateField() {
        return new DateField();
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

    getDateArrayField() {
        return new DateArrayField("dateArrayField");
    }

    getNoNameDateArrayField() {
        return new DateArrayField(undefined);
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

    getNestedField(fieldName = "fieldName", entityName= "nestedEntityName") {
        return new NestedField(fieldName, entityName);
    }

    getNoNameNestedField() {
        return new NestedField(undefined, "nestedEntityName");
    }

    getNoTypeNestedField() {
        return new NestedField("fieldName", undefined);
    }

    getArrayNestedField(fieldName = "fieldName", entityName= "nestedEntityName") {
        return new ArrayNestedField(fieldName, entityName);
    }

    getNoNameArrayNestedField() {
        return new ArrayNestedField(undefined, "nestedEntityName");
    }

    getNoTypeArrayNestedField() {
        return new ArrayNestedField("fieldName", undefined);
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