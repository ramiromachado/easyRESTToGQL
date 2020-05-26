const fieldUtils = require('./fields');
const { Entity } = require('../../src/index');

class entityUtils {

    getWithAllBasicTypeOfFieldsEntity() {
        const fields = [];

        fields.push(fieldUtils.getStringField());
        fields.push(fieldUtils.getFloatField());
        fields.push(fieldUtils.getIntField());
        fields.push(fieldUtils.getBooleanField());
        fields.push(fieldUtils.getObjectField());
        fields.push(fieldUtils.getStringArrayField());
        fields.push(fieldUtils.getFloatArrayField());
        fields.push(fieldUtils.getIntArrayField());
        fields.push(fieldUtils.getBooleanArrayField());
        fields.push(fieldUtils.getObjectArrayField());

        return new Entity("EntityWithAllTypeOfFields", "url", fields);
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

    getNoFieldsEntity() {
        const fields = [];
        return new Entity("withoutFields", "url", fields);
    }
}

module.exports = new entityUtils();