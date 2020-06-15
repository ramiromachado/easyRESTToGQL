const _ = require('lodash');
require('isomorphic-fetch');

const Errors = require('../../errors');

const Entity = require('./entity.js');

class NestedEntity extends Entity {

    constructor(name, fields) {
        super(name, undefined, fields);
    }

    validateConstruction(entityData){
        const {name, fields} = entityData;
        this.validateName(name);
        this.validateFields(name, fields);
    }

    isNested(){
        return true;
    }

}

module.exports = NestedEntity;