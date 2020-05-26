const { Field, ArrayField } = require('../../src/index');

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

    getNoNameField(){
        return new Field(undefined, "string");
    }

    getNoTypeField(){
        return new Field("id", undefined);
    }

    getInvalidTypeField(){
        return new Field("id", "invalidType");
    }

    getNoNameArrayField(){
        return new Field(undefined, "string");
    }

    getNoTypeArrayField(){
        return new Field("id", undefined);
    }

    getInvalidTypeArrayField(){
        return new Field("id", "invalidType");
    }

}

module.exports = new fieldUtils();