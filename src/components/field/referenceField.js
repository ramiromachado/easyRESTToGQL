const Field = require('./field');
const Errors = require('../../errors');

class ReferenceField extends Field {

    associatedEntityField;

    constructor(name, associatedEntity, entityFieldName) {

        if(!associatedEntity) throw new Errors.FieldWithoutAssociatedEntityError(name);

        if(!entityFieldName) throw new Errors.FieldWithoutAssociatedEntityFieldNameError(name);

        const associatedEntityField = associatedEntity.getField(entityFieldName);
        if(!associatedEntityField) throw new Errors.EntityHasNoFieldWithTheGivenName(name);

        super(name, associatedEntity.getName());
        this.associatedEntityField = associatedEntityField;
    }

    //TODO: Rewriting to not throwing an error is not the best way to create an ReferenceField
    generateType() {
        console.log("PASO!");
    }

}

module.exports = ReferenceField;