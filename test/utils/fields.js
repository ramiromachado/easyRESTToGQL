const { Fields } = require('../../src/index');

const { Field, ArrayField, StringField, FloatField, IntField, BooleanField, ObjectField, DateField, StringArrayField,
    FloatArrayField, IntArrayField, BooleanArrayField, ObjectArrayField, DateArrayField, ReferenceField,
    ArrayReferenceField, NestedField, ArrayNestedField } = Fields;

class fieldUtils {

    getStringField(fieldData = {} ) {
        const {name = "stringField", resolver} = fieldData;
        const config = {resolver};
        return new StringField(name, config);
    }

    getFloatField(fieldData = {} ) {
        const {name = "floatField", resolver} = fieldData;
        const config = {resolver};
        return new FloatField(name, config);
    }

    getIntField(fieldData = {} ) {
        const {name = "intField", resolver} = fieldData;
        const config = {resolver};
        return new IntField(name, config);
    }

    getBooleanField(fieldData = {} ) {
        const {name = "booleanField", resolver} = fieldData;
        const config = {resolver};
        return new BooleanField(name, config);
    }

    getObjectField(fieldData = {} ) {
        const {name = "ObjectField", resolver} = fieldData;
        const config = {resolver};
        return new ObjectField(name, config);
    }

    getDateField(fieldData = {} ) {
        const {name = "dateField", resolver} = fieldData;
        const config = {resolver};
        return new DateField(name, config);
    }

    getStringArrayField(fieldData = {} ) {
        const {name = "stringArrayField", resolver} = fieldData;
        const config = {resolver};
        return new StringArrayField(name, config);
    }

    getFloatArrayField(fieldData = {} ) {
        const {name = "floatArrayField", resolver} = fieldData;
        const config = {resolver};
        return new FloatArrayField(name, config);
    }

    getIntArrayField(fieldData = {} ) {
        const {name = "intArrayField", resolver} = fieldData;
        const config = {resolver};
        return new IntArrayField(name, config);
    }

    getBooleanArrayField(fieldData = {} ) {
        const {name = "booleanArrayField", resolver} = fieldData;
        const config = {resolver};
        return new BooleanArrayField(name, config);
    }

    getObjectArrayField(fieldData = {} ) {
        const {name = "objectArrayField", resolver} = fieldData;
        const config = {resolver};
        return new ObjectArrayField(name, config);
    }

    getDateArrayField(fieldData = {} ) {
        const {name = "dateArrayField", resolver} = fieldData;
        const config = {resolver};
        return new DateArrayField(name, config);
    }

    getReferenceField(fieldData = {} ) {
        const {name = "referenceField", resolver} = fieldData;
        const config = {resolver};
        return new ReferenceField(name, config);
    }

    getArrayReferenceField(fieldData = {} ) {
        const {name = "referenceField", resolver} = fieldData;
        const config = {resolver};
        return new ArrayReferenceField(name, config);
    }

    getNoTypeField() {
        return new Field("fieldName");
    }

    getNoTypeArrayField() {
        return new ArrayField("fieldName");
    }

    getNestedField(fieldData = {}) {
        const { name = "NestedField", entityName= "nestedEntityName", resolver } = fieldData;
        const config = { resolver };
        return new NestedField(name, entityName, config);
    }

    getArrayNestedField(fieldData = {}) {
        const { name = "ArrayNestedField", entityName= "nestedEntityName", resolver } = fieldData;
        const config = { resolver };
        return new ArrayNestedField(name, entityName, config);
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