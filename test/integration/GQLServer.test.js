const { describe, it, beforeEach, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const { Server } = require("../../src/index");
const testUtils = require('../utils');

describe('GQL Server', function() {
    beforeEach((done) => {
        testUtils.cleanAndRestartRESTAPIServer()
            .then(() => done())
            .catch((err) => done(err))
    });

    afterEach((done) => {
        testUtils.cleanRESTAPIServer();
        done();
    });

    describe('GQL server running and responding', function() {
        describe('Success', function() {

            describe('should run and respond with simple schema without connection between entities', async function() {
                let server;
                afterEach((done) => {
                    server.stop()
                        .then(_ => done())
                        .catch((err) => done(err));
                });

                it('should run and reply fetching entity list of elements', async () => {
                    // Setting up the GQL Server
                    const invoiceEntity = testUtils.createInvoiceEntity();
                    const productEntity = testUtils.createProductEntity();
                    const port = testUtils.getPort();
                    server = new Server(port, [invoiceEntity, productEntity]);
                    await server.start();

                    // Testing if the server is running
                    const serverState = server.getState();
                    serverState.should.to.be.a('string');
                    serverState.should.to.be.equal('RUNNING');

                    // Testing if invoices data can be fetched
                    const invoicesDataFromRest = (await testUtils.getInvoiceDataFromRest());
                    const { errors: invoicesErrorsFromGQL, data: { Invoice: invoicesDataFromGQL } } =
                        (await testUtils.fetchGQLServer(testUtils.getInvoiceGQLQuery()));
                    should.not.exist(invoicesErrorsFromGQL);
                    should.exist(invoicesDataFromGQL);
                    invoicesDataFromGQL.should.have.lengthOf(invoicesDataFromRest.length);
                    invoicesDataFromGQL.should.be.eql(invoicesDataFromRest);

                    // Testing if products data can be fetched
                    const productsDataFromRest = (await testUtils.getProductDataFromRest());
                    const { errors: productsErrorsFromGQL, data: { Product: productsDataFromGQL } } =
                        (await testUtils.fetchGQLServer(testUtils.getProductGQLQuery()));
                    should.not.exist(productsErrorsFromGQL);
                    should.exist(productsDataFromGQL);
                    productsDataFromGQL.should.have.lengthOf(productsDataFromRest.length);
                    productsDataFromGQL.should.be.eql(productsDataFromRest);
                });

                it.skip('should run and reply fetching entity filtering by any field', async (done) => {
                    // Setting up the GQL Server
                    const invoiceEntity = testUtils.createInvoiceEntity();
                    const productEntity = testUtils.createProductEntity();
                    const port = testUtils.getPort();
                    const server = new Server(port, [invoiceEntity, productEntity]);
                    await server.start();

                    // Testing if the server is running
                    const serverState = server.getState();
                    serverState.should.to.be.a('string');
                    serverState.should.to.be.equal('RUNNING');

                    // Testing if invoices data can be fetched
                    const invoice1DataFromRest = (await testUtils.getInvoiceDataFromRest());
                    const fetchedInvoiceResponse = (await testUtils.fetchGQLServer("invoice"));
                    fetchedInvoiceResponse.status.should.to.be.equal(200);
                    const { data: fetchedInvoiceData } = await fetchedInvoiceResponse.json();
                    should.exist(fetchedInvoiceData);
                    fetchedInvoiceData.should.be.equal(invoice1DataFromRest);

                    // Testing if products data can be fetched
                    const product1Data = (await testUtils.getProductDataFromRest()[0]);
                    const fetchedProductResponse = (await testUtils.fetchGQLServer("product", { id: product1Data.id }));
                    fetchedProductResponse.status.should.to.be.equal(200);
                    const { data: fetchedProductData } = await fetchedProductResponse.json();
                    should.exist(fetchedProductData);
                    fetchedProductData.should.be.equal(product1Data);

                    done();
                });

            });

        });

        describe('Error', function() {

            it('should fail without port configuration', async () => {
                // Setting up the GQL Server
                const invoiceEntity = testUtils.createInvoiceEntity();
                const port = undefined;

                // Testing
                (() => {
                    new Server(port, [invoiceEntity]);
                }).should.throw(testUtils.getNoPortConfiguredError());
            });

            it('should fail without entities configured', async () => {

                // Setting up the GQL Server
                const port = testUtils.getPort();

                // Testing
                (() => {
                    new Server(port, []);
                }).should.throw(testUtils.getNoEntitiesConfiguredError());
            });

            it('should fail if selected port is taken', async () => {
                // Setting up the GQL Server on the same port as the RESTAPIServer
                const invoiceEntity = testUtils.createInvoiceEntity();
                const port = testUtils.getRestPort();
                const server = new Server(port, [invoiceEntity]);
                // Testing
                return server.start().should.be.rejectedWith(testUtils.getPortIsTakenError());
            });

            it('should fail if some REST API service is unreachable', async () => {
                // Setting up the GQL Server
                const unreachableEntity = testUtils.createEntityWithUnreachableURL();
                const port = testUtils.getPort();
                const server = new Server(port, [unreachableEntity]);

                // Testing
                return server.start().should.be.rejectedWith(testUtils.getRESTAPIUnreachableError());
            });

            it('should fail if two entities has the same name', async () => {
                // Setting up the GQL Server
                const invoiceEntity = testUtils.createInvoiceEntity();
                const invoiceEntityRepeated = testUtils.createInvoiceEntity();
                const port = testUtils.getPort();
                // Testing
                (() => new Server(port, [invoiceEntity, invoiceEntityRepeated]))
                    .should.throw(testUtils.getEntityRepeatedName());
            });


            it('should fail if some entity has no name', async () => {
                // Testing
                (() => testUtils.createEntityWithoutName()).should.throw(testUtils.getEntityWithoutNameError());
            });

            it('should fail if some entity has no URL', async () => {
                // Testing
                (() => testUtils.createEntityWithoutURL()).should.throw(testUtils.getEntityWithoutURLError());
            });

            it('should fail if some entity has no fields', async () => {
                // Testing
                (() => testUtils.createEntityWithoutFields()).should.throw(testUtils.getEntityWithoutFieldsError());
            });

            it('should fail if some entity has two fields with the same name', async () => {
                // Testing
                (() => testUtils.createEntityWitRepeatedFieldName()).should.throw(testUtils.getEntityWithRepeatedFieldError());
            });

            it('should fail if some field has no name', async () => {
                // Testing
                (() => testUtils.createFieldWithoutName()).should.throw(testUtils.getFieldWithoutNameError());
            });

            it('should fail if some field has no type', async () => {
                // Testing
                (() => testUtils.createFieldWithoutType()).should.throw(testUtils.getFieldWithoutTypeError());
            });
        });
    });
});