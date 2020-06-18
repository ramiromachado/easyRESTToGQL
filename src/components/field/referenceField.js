const Field = require('./field');
const Errors = require('../../errors');

class ReferenceField extends Field {

    constructor(name, config = {}) {
        if (config.resolver) throw new Errors.ReferenceFieldShouldNotOverrideResolverError(name);
        super(name, "reference", config);
    }

    setReferencedEntityAndField(referencedEntity, referencedField){
        this.setType(referencedEntity.getName());
        this.setResolver((async (referenceEntityItem) => {
            const allReferencedItems = await (referencedEntity.getFetchAllFunction())();
            return allReferencedItems.find(referencedItem => referencedItem[referencedField.getName()] === referenceEntityItem[this.getName()]);
        }));
    }
}

module.exports = ReferenceField;