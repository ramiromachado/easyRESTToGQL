const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const { Entity, Errors } = require('../../../src/index');
const { fieldUtils, entityUtils } = require('../../utils/index');

describe('Entities', function() {

    describe('Success', async () => {

        it('should create an Enitity with all kind of basic fields', async () => {
            const entity = entityUtils.getWithAllBasicTypeOfFieldsEntity();

            // Testing
            should.exist(entity);
        });

        it.skip('should create an Enitity with nested fields', async () => {
        });

        describe('should create enitities with referenced fields', async () => {

            it('should create lineal referenced entities like A -> B', async () => {
                const [a, b] = entityUtils.getTwoLinealReferencedEntities();

                // Testing
                should.exist(a);
                should.exist(b);
            });

            it('should create loop referenced entities like A -> B -> C ', async () => {
                const [a, b, c] = entityUtils.getThreeLoopReferencedEntities();

                // Testing
                should.exist(a);
                should.exist(b);
                should.exist(c);
            });
        });

        it.skip('should create an Enitity with nested referenced fields', async () => {
        });

    });

    describe('Errors', async () => {
        it('should fail if some entity has no name', async () => {
            // Testing
            (() => entityUtils.getNoNameEntity()).should.throw(Errors.EntityWithoutNameError);
        });

        it('should fail if some entity has no URL', async () => {
            // Testing
            (() => entityUtils.getNoURLEntity()).should.throw(Errors.EntityWithoutURLError);
        });

        it('should fail if some entity has no fields', async () => {
            // Testing
            (() => entityUtils.getNoFieldsEntity()).should.throw(Errors.EntityWithoutFieldsError);
        });

        it('should fail if some entity has two fields with the same name', async () => {
            const fields = [fieldUtils.getStringField(), fieldUtils.getStringField()];
            // Testing
            (() => new Entity("repeatedFields", this.getInvoiceURL(), fields).should.throw(Errors.EntityWithRepeatedFieldError));
        });

    });
});