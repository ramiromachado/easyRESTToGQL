const Field = require('./field');
class ReferenceField extends Field {

    constructor(name) {
        super(name, "referenced");
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