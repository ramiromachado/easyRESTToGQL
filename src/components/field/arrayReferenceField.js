const ArrayField = require('./arrayField');
const Errors = require('../../errors');

class ArrayReferenceField extends ArrayField {

    associatedEntityField;

    constructor(name, associatedEntity, entityFieldName) {

        if (!associatedEntity) throw new Errors.FieldWithoutAssociatedEntityError(name);

        if (!entityFieldName) throw new Errors.FieldWithoutAssociatedEntityFieldNameError(name);

        const associatedEntityField = associatedEntity.getField(entityFieldName);
        if(!associatedEntityField) throw new Errors.EntityHasNoFieldWithTheGivenName(name);

        super(name, associatedEntity.getName());
        this.associatedEntityField = associatedEntityField;
    }

    //TODO: Rewriting to not throwing an error is not the best way to create an ReferenceField
    generateType() {

    }


}

module.exports = ArrayReferenceField;