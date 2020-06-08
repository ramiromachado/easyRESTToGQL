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

            it('should create array object field successfully', async () => {
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
                const referenceArray = fieldUtils.getArrayReferenceField();

                // Testing
                should.exist(referenceArray);
            });
        });

        describe('should create nested type fields successfully', async () => {
            it('should create a simple nested field successfully', async () => {
                throw Error("implement");
            });

            it('should create an array simple nested field successfully', async () => {
                throw Error("implement");
            });
        });

        describe('should add an alias to a field successfully', async () => {

            it('should add twice an alias to a string field (keeping the last one) successfully', async () => {
                const stringField = fieldUtils.getStringField();
                stringField.setAlias("aliasStringField");
                stringField.setAlias("alias2StringField");

                // Testing
                should.exist(stringField);
                stringField.getAlias().should.be.equals("alias2StringField");
            });

            it('should add an alias to a string field successfully', async () => {
                const stringField = fieldUtils.getStringField();
                stringField.setAlias("aliasStringField");

                // Testing
                should.exist(stringField);
                stringField.getAlias().should.be.equals("aliasStringField");
            });

            it('should add an alias to a float field successfully', async () => {
                const floatField = fieldUtils.getFloatField();
                floatField.setAlias("aliasFloatField");

                // Testing
                should.exist(floatField);
                floatField.getAlias().should.be.equals("aliasFloatField");
            });

            it('should add an alias to a int field successfully', async () => {
                const intField = fieldUtils.getIntField();
                intField.setAlias("aliasIntField");

                // Testing
                should.exist(intField);
                intField.getAlias().should.be.equals("aliasIntField");
            });

            it('should add an alias to a boolean field successfully', async () => {
                const booleanField = fieldUtils.getBooleanField();
                booleanField.setAlias("aliasBooleanField");

                // Testing
                should.exist(booleanField);
                booleanField.getAlias().should.be.equals("aliasBooleanField");
            });

            it('should add an alias to a object field successfully', async () => {
                const objectField = fieldUtils.getObjectField();
                objectField.setAlias("aliasObjectField");

                // Testing
                should.exist(objectField);
                objectField.getAlias().should.be.equals("aliasObjectField");
            });

            it('should add an alias to a array string field successfully', async () => {
                const stringArrayField = fieldUtils.getStringArrayField();
                stringArrayField.setAlias("aliasStringArrayField");

                // Testing
                should.exist(stringArrayField);
                stringArrayField.getAlias().should.be.equals("aliasStringArrayField");
            });

            it('should add an alias to a array float field successfully', async () => {
                const floatArrayField = fieldUtils.getFloatArrayField();
                floatArrayField.setAlias("aliasFloatArrayField");

                // Testing
                should.exist(floatArrayField);
                floatArrayField.getAlias().should.be.equals("aliasFloatArrayField");
            });

            it('should add an alias to a array int field successfully', async () => {
                const intArrayField = fieldUtils.getIntArrayField();
                intArrayField.setAlias("aliasIntArrayField");

                // Testing
                should.exist(intArrayField);
                intArrayField.getAlias().should.be.equals("aliasIntArrayField");
            });

            it('should add an alias to a array boolean field successfully', async () => {
                const booleanArrayField = fieldUtils.getBooleanArrayField();
                booleanArrayField.setAlias("aliasBooleanArrayField");

                // Testing
                should.exist(booleanArrayField);
                booleanArrayField.getAlias().should.be.equals("aliasBooleanArrayField");
            });

            it('should add an alias to a array object field successfully', async () => {
                const objectArrayField = fieldUtils.getObjectArrayField();
                objectArrayField.setAlias("aliasObjectArrayField");

                // Testing
                should.exist(objectArrayField);
                objectArrayField.getAlias().should.be.equals("aliasObjectArrayField");
            });

            it('should add an alias to a simple reference field successfully', async () => {
                const referenceField = fieldUtils.getReferenceField();
                referenceField.setAlias("aliasReferenceField");

                // Testing
                should.exist(referenceField);
                referenceField.getAlias().should.be.equals("aliasReferenceField");
            });

            it('should add an alias to a reference array field successfully', async () => {
                const referenceArray = fieldUtils.getArrayReferenceField();
                referenceArray.setAlias("aliasReferenceArray");

                // Testing
                should.exist(referenceArray);
                referenceArray.getAlias().should.be.equals("aliasReferenceArray");
            });

            it('should add an alias to a nested type field successfully', async () => {
                throw Error("implement");
            });

            it('should add an alias to a nested array field successfully', async () => {
                throw Error("implement");
            });
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

        });

        describe('should fail creating reference fields with wrong data', async () => {

            it('should fail if a reference field has no name', async () => {
                // Testing
                (() => fieldUtils.getNoNameReferenceField()).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an array reference field has no name', async () => {
                // Testing
                (() => fieldUtils.getNoNameArrayReferenceField()).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a field is created without type', async () => {
                // Testing
                (() => fieldUtils.getNoTypeField()).should.throw(Errors.FieldWithoutTypeError);
            });

            it('should fail if an array field is created without type', async () => {
                // Testing
                (() => fieldUtils.getNoTypeArrayField()).should.throw(Errors.FieldWithoutTypeError);
            });

        });

        describe('should fail adding an alias to a field with wrong data', async () => {
            it('should fail if a alias has no name', async () => {
                const booleanField = fieldUtils.getBooleanField();

                // Testing
                (() => booleanField.setAlias()).should.throw(Errors.AliasWithoutNameError);
            });
        })
    });
});