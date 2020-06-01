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
                const { A, B } = entityUtils.getReferencedABCEntities();

                const AReferenceFieldName = "BId";
                const BReferencedFieldName = "id";
                entityUtils.referenceBy(A, B, AReferenceFieldName, BReferencedFieldName);

                // Testing
                should.exist(A);
                should.exist(B);
            });

            it('should create lineal array referenced entities like C -> A', async () => {
                const { A, C } = entityUtils.getReferencedABCEntities();

                const CReferenceFieldName = "AIds";
                const AReferencedFieldName = "id";
                entityUtils.referenceBy(C, A, CReferenceFieldName, AReferencedFieldName);

                // Testing
                should.exist(A);
                should.exist(C);
            });

            it('should create loop referenced entities like A -> B -> C ', async () => {
                const { A, B, C } = entityUtils.getReferencedABCEntities();

                const AReferenceFieldName = "BId";
                const BReferencedFieldName = "id";
                entityUtils.referenceBy(A, B, AReferenceFieldName, BReferencedFieldName);

                const BReferenceFieldName = "CId";
                const CReferencedFieldName = "id";
                entityUtils.referenceBy(B, C, BReferenceFieldName, CReferencedFieldName);

                const CReferenceFieldName = "AIds";
                const AReferencedFieldName = "id";
                entityUtils.referenceBy(C, A, CReferenceFieldName, AReferencedFieldName);

                // Testing
                should.exist(A);
                should.exist(B);
                should.exist(C);
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

        it('should fail if trying to reference a field with no associated entity', async () => {

            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "BId";
            const BReferencedFieldName = "id";

            // Testing
            (() => entityUtils.referenceBy(A, undefined, AReferenceFieldName, BReferencedFieldName)).should.throw(Errors.ReferencedEntityIsMissingError);
        });

        it('should fail if trying to reference an array field with no associated entity', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "AIds";
            const AReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(C, undefined, CReferenceFieldName, AReferencedFieldName)).should.throw(Errors.ReferencedEntityIsMissingError);
        });

        it('should fail if trying to reference a field with no reference entity field name', async () => {
            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "BId";
            const BReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(A, B, undefined, BReferencedFieldName)).should.throw(Errors.ReferenceFieldNameIsMissingError);
        });

        it('should fail if trying to reference an array field with no reference field name', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "AIds";
            const AReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(C, A, undefined, AReferencedFieldName)).should.throw(Errors.ReferenceFieldNameIsMissingError);
        });

        it('should fail if trying to reference a field with no referenced entity field name', async () => {
            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "BId";
            const BReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(A, B, AReferenceFieldName, undefined)).should.throw(Errors.ReferencedFieldNameIsMissingError);
        });

        it('should fail if trying to reference an array field with no referenced field name', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "AIds";
            const AReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(C, A, CReferenceFieldName, undefined)).should.throw(Errors.ReferencedFieldNameIsMissingError);
        });

        it('should fail if trying to reference a field with a field name that is not in the reference Entity', async () => {
            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "wrongName";
            const BReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(A, B, AReferenceFieldName, BReferencedFieldName)).should.throw(Errors.EntityHasNoFieldWithTheGivenNameError);
        });

        it('should fail if trying to reference an array field with a field name that is not in the reference Entity', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "wrongName";
            const AReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(C, A, CReferenceFieldName, AReferencedFieldName)).should.throw(Errors.EntityHasNoFieldWithTheGivenNameError);
        });

        it('should fail if trying to reference a field with a field name that is not in the referenced Entity', async () => {
            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "BId";
            const BReferencedFieldName = "wrongName";
            // Testing
            (() => entityUtils.referenceBy(A, B, AReferenceFieldName, BReferencedFieldName)).should.throw(Errors.EntityHasNoFieldWithTheGivenNameError);
        });

        it('should fail if trying to reference an array field with a field name that is not in the referenced Entity', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "AIds";
            const AReferencedFieldName = "wrongName";
            // Testing
            (() => entityUtils.referenceBy(C, A, CReferenceFieldName, AReferencedFieldName)).should.throw(Errors.EntityHasNoFieldWithTheGivenNameError);
        });

        it('should fail if trying to reference a field that is not Reference Type', async () => {
            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "name";
            const BReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(A, B, AReferenceFieldName, BReferencedFieldName)).should.throw(Errors.FieldIsNotReferenceTypeError);
        });

        it('should fail if trying to reference an array field that is not ArrayReference Type', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "name";
            const AReferencedFieldName = "id";
            // Testing
            (() => entityUtils.referenceBy(C, A, CReferenceFieldName, AReferencedFieldName)).should.throw(Errors.FieldIsNotReferenceTypeError);
        });

        it('should fail if trying to reference a field with a field that is not referable', async () => {
            const { A, B } = entityUtils.getReferencedABCEntities();

            const AReferenceFieldName = "BId";
            const BReferencedFieldName = "CId";
            // Testing
            (() => entityUtils.referenceBy(A, B, AReferenceFieldName, BReferencedFieldName)).should.throw(Errors.FieldIsNotReferableError);
        });

        it('should fail if trying to reference an array field with a field name that is not referable', async () => {
            const { C, A } = entityUtils.getReferencedABCEntities();

            const CReferenceFieldName = "AIds";
            const AReferencedFieldName = "BId";
            // Testing
            (() => entityUtils.referenceBy(C, A, CReferenceFieldName, AReferencedFieldName)).should.throw(Errors.FieldIsNotReferableError);
        });

    });
});