const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const { Errors } = require('../../../src/index');
const { fieldUtils } = require('../../utils/index');

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
                const referenceField = fieldUtils.getReferenceField();

                // Testing
                should.exist(referenceField);
            });

            it('should create reference array field successfully', async () => {
                const referenceArray = fieldUtils.getReferenceArrayField();

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
                // Testing
                (() => fieldUtils.getNoNameReferenceField()).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a reference field has no associated entity ', async () => {
                // Testing
                (() => fieldUtils.getNoEntityReferenceField()).should.throw(Errors.FieldWithoutEntityError);
            });

            it('should fail if a reference field has no associated entity field', async () => {
                // Testing
                (() => fieldUtils.getNoAssociatedEntityFieldNameReferenceField()).should.throw(Errors.FieldWithoutAssociatedEntityFieldNameError);
            });

            it('should fail if the associated entity and the associated entity field name given does not match', async () => {
                // Testing
                (() => fieldUtils.getNotMatchAssociatedEntityFieldAndNameReferenceField()).should.throw(Errors.EntityHasNoFieldWithTheGivenName);
            });

        });
    });
});