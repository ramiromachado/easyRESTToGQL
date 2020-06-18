const ArrayField = require('./arrayField');
const Errors = require('../../errors');

class ArrayReferenceField extends ArrayField {

    constructor(name, config = {}) {
        if (config.resolver) throw new Errors.ReferenceFieldShouldNotOverrideResolverError(name);
        super(name, "arrayReference", config);
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