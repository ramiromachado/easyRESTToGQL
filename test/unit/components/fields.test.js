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

            it('should create a string field successfully', async () => {
                const stringField = fieldUtils.getStringField();

                // Testing
                should.exist(stringField);
            });

            it('should create a float field successfully', async () => {
                const floatField = fieldUtils.getFloatField();

                // Testing
                should.exist(floatField);
            });

            it('should create an int field successfully', async () => {
                const intField = fieldUtils.getIntField();

                // Testing
                should.exist(intField);
            });

            it('should create a boolean field successfully', async () => {
                const booleanField = fieldUtils.getBooleanField();

                // Testing
                should.exist(booleanField);
            });

            it('should create an object field successfully', async () => {
                const objectField = fieldUtils.getObjectField();

                // Testing
                should.exist(objectField);
            });

            it('should create a date field successfully', async () => {
                const dateField = fieldUtils.getDateField();

                // Testing
                should.exist(dateField);
            });

            it('should create an array string field successfully', async () => {
                const stringArrayField = fieldUtils.getStringArrayField();

                // Testing
                should.exist(stringArrayField);
            });

            it('should create an array float field successfully', async () => {
                const floatArrayField = fieldUtils.getFloatArrayField();

                // Testing
                should.exist(floatArrayField);
            });

            it('should create an array int field successfully', async () => {
                const intArrayField = fieldUtils.getIntArrayField();

                // Testing
                should.exist(intArrayField);
            });

            it('should create an array boolean field successfully', async () => {
                const booleanArrayField = fieldUtils.getBooleanArrayField();

                // Testing
                should.exist(booleanArrayField);
            });

            it('should create an array object field successfully', async () => {
                const objectArrayField = fieldUtils.getObjectArrayField();

                // Testing
                should.exist(objectArrayField);
            });

            it('should create an array date field successfully', async () => {
                const dateArrayField = fieldUtils.getDateArrayField();

                // Testing
                should.exist(dateArrayField);
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
                const stringField = fieldUtils.getNestedField();

                // Testing
                should.exist(stringField);
            });

            it('should create an array simple nested field successfully', async () => {
                const stringField = fieldUtils.getArrayNestedField();

                // Testing
                should.exist(stringField);
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

            it('should add an alias to an object field successfully', async () => {
                const objectField = fieldUtils.getObjectField();
                objectField.setAlias("aliasObjectField");

                // Testing
                should.exist(objectField);
                objectField.getAlias().should.be.equals("aliasObjectField");
            });

            it('should add an alias to an date field successfully', async () => {
                const dateField = fieldUtils.getDateField();
                dateField.setAlias("aliasDateField");

                // Testing
                should.exist(dateField);
                dateField.getAlias().should.be.equals("aliasDateField");
            });

            it('should add an alias to an array string field successfully', async () => {
                const stringArrayField = fieldUtils.getStringArrayField();
                stringArrayField.setAlias("aliasStringArrayField");

                // Testing
                should.exist(stringArrayField);
                stringArrayField.getAlias().should.be.equals("aliasStringArrayField");
            });

            it('should add an alias to an array float field successfully', async () => {
                const floatArrayField = fieldUtils.getFloatArrayField();
                floatArrayField.setAlias("aliasFloatArrayField");

                // Testing
                should.exist(floatArrayField);
                floatArrayField.getAlias().should.be.equals("aliasFloatArrayField");
            });

            it('should add an alias to an array int field successfully', async () => {
                const intArrayField = fieldUtils.getIntArrayField();
                intArrayField.setAlias("aliasIntArrayField");

                // Testing
                should.exist(intArrayField);
                intArrayField.getAlias().should.be.equals("aliasIntArrayField");
            });

            it('should add an alias to an array boolean field successfully', async () => {
                const booleanArrayField = fieldUtils.getBooleanArrayField();
                booleanArrayField.setAlias("aliasBooleanArrayField");

                // Testing
                should.exist(booleanArrayField);
                booleanArrayField.getAlias().should.be.equals("aliasBooleanArrayField");
            });

            it('should add an alias to an array object field successfully', async () => {
                const objectArrayField = fieldUtils.getObjectArrayField();
                objectArrayField.setAlias("aliasObjectArrayField");

                // Testing
                should.exist(objectArrayField);
                objectArrayField.getAlias().should.be.equals("aliasObjectArrayField");
            });

            it('should add an alias to an array date field successfully', async () => {
                const dateArrayField = fieldUtils.getDateArrayField();
                dateArrayField.setAlias("aliasDateDateField");

                // Testing
                should.exist(dateArrayField);
                dateArrayField.getAlias().should.be.equals("aliasDateDateField");
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
                const nestedField = fieldUtils.getNestedField();
                nestedField.setAlias("aliasNestedField");

                // Testing
                should.exist(nestedField);
                nestedField.getAlias().should.be.equals("aliasNestedField");
            });

            it('should add an alias to a nested array field successfully', async () => {
                const arrayNestedField = fieldUtils.getArrayNestedField();
                arrayNestedField.setAlias("aliasArrayNestedField");

                // Testing
                should.exist(arrayNestedField);
                arrayNestedField.getAlias().should.be.equals("aliasArrayNestedField");
            });
        });

        describe('should set a resolver to a field successfully', async () => {
            describe('should set a resolver when a field is created successfully', async () => {

                it('should set a resolver to a string field successfully', async () => {
                    const resolver = (data) => data;
                    const stringField = fieldUtils.getStringField({ resolver });

                    // Testing
                    should.exist(stringField);
                    stringField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to a float field successfully', async () => {
                    const resolver = (data) => data;
                    const floatField = fieldUtils.getFloatField({ resolver });

                    // Testing
                    should.exist(floatField);
                    floatField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to a int field successfully', async () => {
                    const resolver = (data) => data;
                    const intField = fieldUtils.getIntField({ resolver });

                    // Testing
                    should.exist(intField);
                    intField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to a boolean field successfully', async () => {
                    const resolver = (data) => data;
                    const booleanField = fieldUtils.getBooleanField({ resolver });

                    // Testing
                    should.exist(booleanField);
                    booleanField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an object field successfully', async () => {
                    const resolver = (data) => data;
                    const objectField = fieldUtils.getObjectField({ resolver });

                    // Testing
                    should.exist(objectField);
                    objectField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an date field successfully', async () => {
                    const resolver = (data) => data;
                    const dateField = fieldUtils.getDateField({ resolver });

                    // Testing
                    should.exist(dateField);
                    dateField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an array string field successfully', async () => {
                    const resolver = (data) => data;
                    const stringArrayField = fieldUtils.getStringArrayField({ resolver });

                    // Testing
                    should.exist(stringArrayField);
                    stringArrayField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an array float field successfully', async () => {
                    const resolver = (data) => data;
                    const floatArrayField = fieldUtils.getFloatArrayField({ resolver });

                    // Testing
                    should.exist(floatArrayField);
                    floatArrayField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an array int field successfully', async () => {
                    const resolver = (data) => data;
                    const intArrayField = fieldUtils.getIntArrayField({ resolver });

                    // Testing
                    should.exist(intArrayField);
                    intArrayField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an array boolean field successfully', async () => {
                    const resolver = (data) => data;
                    const booleanArrayField = fieldUtils.getBooleanArrayField({ resolver });

                    // Testing
                    should.exist(booleanArrayField);
                    booleanArrayField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an array object field successfully', async () => {
                    const resolver = (data) => data;
                    const objectArrayField = fieldUtils.getObjectArrayField({ resolver });

                    // Testing
                    should.exist(objectArrayField);
                    objectArrayField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to an array date field successfully', async () => {
                    const resolver = (data) => data;
                    const dateArrayField = fieldUtils.getDateArrayField({ resolver });

                    // Testing
                    should.exist(dateArrayField);
                    dateArrayField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to a nested type field successfully', async () => {
                    const resolver = (data) => data;
                    const nestedField = fieldUtils.getNestedField({ resolver });

                    // Testing
                    should.exist(nestedField);
                    nestedField.getResolver().should.be.equals(resolver);
                });

                it('should set a resolver to a nested array field successfully', async () => {
                    const resolver = (data) => data;
                    const arrayNestedField = fieldUtils.getArrayNestedField({ resolver });

                    // Testing
                    should.exist(arrayNestedField);
                    arrayNestedField.getResolver().should.be.equals(resolver);
                });
            });

            describe('should add a resolver to a field successfully', async () => {

                it('should add twice a resolver to a string field (keeping the last one) successfully', async () => {
                    const resolver = (data) => data;
                    const resolver2 = (data) => data + data;
                    const stringField = fieldUtils.getStringField();
                    stringField.setResolver(resolver);
                    stringField.setResolver(resolver2);

                    // Testing
                    should.exist(stringField);
                    stringField.getResolver().should.be.equals(resolver2);
                });

                it('should add a resolver to a string field successfully', async () => {
                    const resolver = (data) => data;
                    const stringField = fieldUtils.getStringField();
                    stringField.setResolver(resolver);

                    // Testing
                    should.exist(stringField);
                    stringField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to a float field successfully', async () => {
                    const resolver = (data) => data;
                    const floatField = fieldUtils.getFloatField();
                    floatField.setResolver(resolver);

                    // Testing
                    should.exist(floatField);
                    floatField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to a int field successfully', async () => {
                    const resolver = (data) => data;
                    const intField = fieldUtils.getIntField();
                    intField.setResolver(resolver);

                    // Testing
                    should.exist(intField);
                    intField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to a boolean field successfully', async () => {
                    const resolver = (data) => data;
                    const booleanField = fieldUtils.getBooleanField();
                    booleanField.setResolver(resolver);

                    // Testing
                    should.exist(booleanField);
                    booleanField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an object field successfully', async () => {
                    const resolver = (data) => data;
                    const objectField = fieldUtils.getObjectField();
                    objectField.setResolver(resolver);

                    // Testing
                    should.exist(objectField);
                    objectField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an date field successfully', async () => {
                    const resolver = (data) => data;
                    const dateField = fieldUtils.getDateField();
                    dateField.setResolver(resolver);

                    // Testing
                    should.exist(dateField);
                    dateField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an array string field successfully', async () => {
                    const resolver = (data) => data;
                    const stringArrayField = fieldUtils.getStringArrayField();
                    stringArrayField.setResolver(resolver);

                    // Testing
                    should.exist(stringArrayField);
                    stringArrayField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an array float field successfully', async () => {
                    const resolver = (data) => data;
                    const floatArrayField = fieldUtils.getFloatArrayField();
                    floatArrayField.setResolver(resolver);

                    // Testing
                    should.exist(floatArrayField);
                    floatArrayField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an array int field successfully', async () => {
                    const resolver = (data) => data;
                    const intArrayField = fieldUtils.getIntArrayField();
                    intArrayField.setResolver(resolver);

                    // Testing
                    should.exist(intArrayField);
                    intArrayField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an array boolean field successfully', async () => {
                    const resolver = (data) => data;
                    const booleanArrayField = fieldUtils.getBooleanArrayField();
                    booleanArrayField.setResolver(resolver);

                    // Testing
                    should.exist(booleanArrayField);
                    booleanArrayField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an array object field successfully', async () => {
                    const resolver = (data) => data;

                    const objectArrayField = fieldUtils.getObjectArrayField();
                    objectArrayField.setResolver(resolver);

                    // Testing
                    should.exist(objectArrayField);
                    objectArrayField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to an array date field successfully', async () => {
                    const resolver = (data) => data;
                    const dateArrayField = fieldUtils.getDateArrayField();
                    dateArrayField.setResolver(resolver);

                    // Testing
                    should.exist(dateArrayField);
                    dateArrayField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to a nested type field successfully', async () => {
                    const resolver = (data) => data;
                    const nestedField = fieldUtils.getNestedField();
                    nestedField.setResolver(resolver);

                    // Testing
                    should.exist(nestedField);
                    nestedField.getResolver().should.be.equals(resolver);
                });

                it('should add a resolver to a nested array field successfully', async () => {
                    const resolver = (data) => data;
                    const arrayNestedField = fieldUtils.getArrayNestedField();
                    arrayNestedField.setResolver(resolver);

                    // Testing
                    should.exist(arrayNestedField);
                    arrayNestedField.getResolver().should.be.equals(resolver);
                });
            });
        });
    });

    describe('Errors', async () => {

        describe('should fail creating basic type fields with wrong data', async () => {
            it('should fail if a string field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getStringField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a float field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getFloatField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an int field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getIntField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a boolean field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getBooleanField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an object field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getObjectField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a date field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getDateField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a string array field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getStringArrayField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a float array field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getFloatArrayField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an int array field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getIntArrayField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a boolean array field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getBooleanArrayField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an object array field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getObjectArrayField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an date array field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getDateArrayField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

        });

        describe('should fail creating reference fields with wrong data', async () => {

            it('should fail if a reference field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getReferenceField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if an array reference field has no name', async () => {
                const name = null;

                // Testing
                (() => fieldUtils.getArrayReferenceField({ name })).should.throw(Errors.FieldWithoutNameError);
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

        describe('should fail creating nested fields with wrong data', async () => {

            it('should fail if a nested field has no name', async () => {
                const name = null;
                // Testing
                (() => fieldUtils.getNestedField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a nested array field has no name', async () => {
                const name = null;
                // Testing
                (() => fieldUtils.getArrayNestedField({ name })).should.throw(Errors.FieldWithoutNameError);
            });

            it('should fail if a field is created without type', async () => {
                const entityName = null;

                // Testing
                (() => fieldUtils.getNestedField({ entityName })).should.throw(Errors.FieldWithoutTypeError);
            });

            it('should fail if an array field is created without type', async () => {
                const entityName = null;

                // Testing
                (() => fieldUtils.getArrayNestedField({ entityName })).should.throw(Errors.FieldWithoutTypeError);
            });

        });

        describe('should fail adding an alias to a field with wrong data', async () => {
            it('should fail if a alias has no name', async () => {
                const booleanField = fieldUtils.getBooleanField();

                // Testing
                (() => booleanField.setAlias()).should.throw(Errors.AliasWithoutNameError);
            });
        })

        describe('should fail setting or adding a resolver to a reference field', async () => {
            it('should set a resolver to a simple reference field successfully', async () => {
                const resolver = (data) => data;

                // Testing
                (() => fieldUtils.getReferenceField({ resolver })).should.throw(Errors.ReferenceFieldShouldNotOverrideResolverError);
            });

            it('should set a resolver to a reference array field successfully', async () => {
                const resolver = (data) => data;
                
                // Testing
                (() => fieldUtils.getArrayReferenceField({ resolver })).should.throw(Errors.ReferenceFieldShouldNotOverrideResolverError);
            });

            it.skip('should fails adding a resolver to a simple reference field', async () => {
                const resolver = (data) => data;
                const referenceField = fieldUtils.getReferenceField();

                // Testing
                (() => referenceField.setResolver(resolver)).should.throw(Errors.ReferenceFieldShouldNotOverrideResolverError);
            });

            it.skip('should fails add a resolver to a reference array field successfully', async () => {
                const resolver = (data) => data;
                const referenceArray = fieldUtils.getArrayReferenceField();

                // Testing
                (() => referenceArray.setResolver(resolver)).should.throw(Errors.ReferenceFieldShouldNotOverrideResolverError);
            });
        })

    });
});
