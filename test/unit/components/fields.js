const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const {Field, ArrayField, Errors} = require('../../../src/index');

describe('Fields', function() {

    describe('Success', async () => {

        it('should create basic type fields successfully', async () => {

            // Basic plain types
            const stringField = new Field("stringField", "string");
            const floatField = new Field("floatField", "float");
            const intField = new Field("intField", "int");
            const booleanField = new Field("booleanField", "boolean");
            const objectField = new Field("objectField", "object");

            // Basic array types
            const stringArrayField = new ArrayField("stringArrayField", "string");
            const floatArrayField = new ArrayField("floatArrayField", "float");
            const intArrayField = new ArrayField("intArrayField", "int");
            const booleanArrayField = new ArrayField("booleanArrayField", "boolean");
            const objectArrayField = new ArrayField("objectArrayField", "object");

            // Testing
            should.exist(stringField);
            should.exist(floatField);
            should.exist(intField);
            should.exist(booleanField);
            should.exist(objectField);
            should.exist(stringArrayField);
            should.exist(floatArrayField);
            should.exist(intArrayField);
            should.exist(booleanArrayField);
            should.exist(objectArrayField);
        });


        it.skip('should create nested type fields without throwing an error', async () => {
        });
    });

    describe('Errors', async () => {
        it('should fail if some field has no name', async () => {
            // Testing
            (() => new Field(undefined, "string")).should.throw(Errors.FieldWithoutNameError);
        });

        it('should fail if some field has no type', async () => {
            // Testing
            (() => new Field("id", undefined)).should.throw(Errors.FieldWithoutTypeError);
        });

        it('should fail if some field has invalid type', async () => {
            // Testing
            (() => new Field("id", "invalidType")).should.throw(Errors.FieldWithoutValidTypeError);
        });
    });
});