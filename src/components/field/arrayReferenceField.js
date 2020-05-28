const ArrayField = require('./arrayField');

class ArrayReferenceField extends ArrayField {

    constructor(name) {
        super(name, "arrayReference");
    }

    setReferencedEntityAndField(referencedEntity, referencedField) {
        this.setType(referencedEntity.getName());
        this.setResolver((async (referenceEntityItem) => {
            const allReferencedItems = await (referencedEntity.getFetchAllFunction())();
            return referenceEntityItem[this.getName()].map(x => {
                return allReferencedItems.find(referencedItem => referencedItem[referencedField.getName()] === x);
            });
        }));
    }

}

module.exports = ArrayReferenceField;