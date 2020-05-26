const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const { Field, Errors } = require('../../../src/index');
const { fieldUtils, entityUtils } = require('../../utils/index');

describe('Fields', function() {

    describe('Success', async () => {

        describe('should create basic type fields successfully', async () => {

            it('should create string field successfully', async () => {
                const stringField = fieldUtils.getStringField();

                // Testing
                should.exist(stringField);
            });

            it('should create float field successfully', async () => {
                const floatField = fieldUtils.getFloatField();

                // Testing
                should.exist(floatField);
            });

            it('should create int field successfully', async () => {
                const intField = fieldUtils.getIntField();

                // Testing
                should.exist(intField);
            });

            it('should create boolean field successfully', async () => {
                const booleanField = fieldUtils.getBooleanField();

                // Testing
                should.exist(booleanField);
            });

            it('should create object field successfully', async () => {
                const objectField = fieldUtils.getObjectField();

                // Testing
                should.exist(objectField);
            });

            it('should create array string field successfully', async () => {
                const stringArrayField = fieldUtils.getStringArrayField();

                // Testing
                should.exist(stringArrayField);
            });

            it('should create array float field successfully', async () => {
                const floatArrayField = fieldUtils.getFloatArrayField();

                // Testing
                should.exist(floatArrayField);
            });

            it('should create array int field successfully', async () => {
                const intArrayField = fieldUtils.getIntArrayField();

                // Testing
                should.exist(intArrayField);
            });

            it('should create array boolean field successfully', async () => {
                const booleanArrayField = fieldUtils.getBooleanArrayField();

                // Testing
                should.exist(booleanArrayField);
            });

            it('should create array oject field successfully', async () => {
                const objectArrayField = fieldUtils.getObjectArrayField();

                // Testing
                should.exist(objectArrayField);
            });
        });

        describe('should create reference fields successfully', async () => {

            it('should create simple reference field successfully', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);

                const referenceField = fieldUtils.getReferenceField(associatedEntity, associatedFieldName);

                // Testing
                should.exist(referenceField);
            });

            it('should create reference array field successfully', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);

                const referenceArray = fieldUtils.getArrayReferenceField(associatedEntity, associatedFieldName);

                // Testing
                should.exist(referenceArray);
            });
        });

        it.skip('should create nested type fields successfully', async () => {
        });
    });

    describe('Errors', async () => {

        describe('should fail creating basic type fields with wrong data', async () => {
            it('should fail if a field has no name', async () => {
                // Testing
                (() => fieldUtils.getNoNameField()).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an array field has no name', async () => {
                // Testing
                (() => fieldUtils.getNoNameArrayField()).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a field has no type', async () => {
                // Testing
                (() => fieldUtils.getNoTypeField()).should.throw(Errors.FieldWithoutTypeError);
            });

            it('should fail if an array field has no type', async () => {
                // Testing
                (() => fieldUtils.getNoTypeArrayField()).should.throw(Errors.FieldWithoutTypeError);
            });

            it('should fail if a field has invalid type', async () => {
                // Testing
                (() => fieldUtils.getInvalidTypeField()).should.throw(Errors.FieldWithoutValidTypeError);
            });

            it('should fail if an array field has invalid type', async () => {
                // Testing
                (() => fieldUtils.getInvalidTypeArrayField()).should.throw(Errors.FieldWithoutValidTypeError);
            });
        });

        describe('should fail creating reference fields with wrong data', async () => {

            it('should fail if a reference field has no name', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);

                // Testing
                (() => fieldUtils.getNoNameReferenceField(associatedEntity, associatedFieldName)).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an array reference field has no name', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);

                // Testing
                (() => fieldUtils.getNoNameArrayReferenceField(associatedEntity, associatedFieldName)).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a reference field has no associated entity ', async () => {
                // Testing
                (() => fieldUtils.getNoAssociatedEntityReferenceField()).should.throw(Errors.FieldWithoutAssociatedEntityError);
            });

            it('should fail if an array reference field has no associated entity ', async () => {
                // Testing
                (() => fieldUtils.getNoAssociatedEntityArrayReferenceField()).should.throw(Errors.FieldWithoutAssociatedEntityError);
            });

            it('should fail if a reference field has no associated entity field', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);

                (() => fieldUtils.getNoAssociatedEntityFieldNameReferenceField(associatedEntity)).should.throw(Errors.FieldWithoutAssociatedEntityFieldNameError);
            });

            it('should fail if a reference field has no associated entity field', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);

                (() => fieldUtils.getNoAssociatedEntityFieldNameArrayReferenceField(associatedEntity)).should.throw(Errors.FieldWithoutAssociatedEntityFieldNameError);
            });

            it('should fail if the associated entity and the associated entity field name given does not match, for a reference field', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);
                const wrongAssociatedFieldName = "associatedEntityNonExistingField";

                // Testing
                (() => fieldUtils.getReferenceField(associatedEntity, wrongAssociatedFieldName)).should.throw(Errors.EntityHasNoFieldWithTheGivenName);
            });

            it('should fail if the associated entity and the associated entity field name given does not match, for an array reference field', async () => {
                // Creating the associatedEntity
                const associatedFieldName = "id";
                const associatedField = new Field(associatedFieldName, "string");
                const associatedEntity = entityUtils.getSimpleEntityWithFields([associatedField]);
                const wrongAssociatedFieldName = "associatedEntityNonExistingField";

                // Testing
                (() => fieldUtils.getReferenceField(associatedEntity, wrongAssociatedFieldName)).should.throw(Errors.EntityHasNoFieldWithTheGivenName);
        });
        });
    });
});