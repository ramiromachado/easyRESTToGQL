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

            describe("should run and respond with simple schema (No nested fields)", async function() {
                let server;

                afterEach((done) => {
                    server.stop()
                        .then(_ => done())
                        .catch((err) => done(err));
                });

                describe('schema without connection between entities', async function() {

                    it('should run and reply fetching products list of elements', async () => {
                        // Setting up the GQL Server
                        const productEntity = testUtils.createProductEntity();
                        const port = testUtils.getPort();
                        server = new Server(port, [productEntity]);
                        await server.start();

                        // Testing if the server is running
                        const serverState = server.getState();
                        serverState.should.to.be.a('string');
                        serverState.should.to.be.equal('RUNNING');

                        // Testing if products data can be fetched
                        const productsDataFromRest = (await testUtils.getProductDataFromRest());
                        const { errors: productsErrorsFromGQL, data: { Product: productsDataFromGQL } } =
                            (await testUtils.fetchGQLServer(testUtils.getProductGQLQuery()));
                        should.not.exist(productsErrorsFromGQL);
                        should.exist(productsDataFromGQL);
                        productsDataFromGQL.should.have.lengthOf(productsDataFromRest.length);
                        productsDataFromGQL.should.be.eql(productsDataFromRest);
                    });

                    it.skip('should run and reply fetching products filtering by different fields', async (done) => {
                    });

                });

                describe('schema with reference between entities', async function() {

                    // Reference by a plain field
                    it('should run and reply fetching clients data on invoice list of elements', async () => {
                        // Setting up the GQL Server
                        const port = testUtils.getPort();
                        const entities = testUtils.createInvoiceAndClientEntity();

                        server = new Server(port, entities);
                        await server.start();

                        // Fetch data from rest to compare with data fetched via GraphQL
                        const invoicesDataFromRest = (await testUtils.getInvoiceDataFromRest());
                        const clientsDataFromRest = (await testUtils.getClientDataFromRest());
                        // Make the data looks like it will be from GQL
                        invoicesDataFromRest.forEach(invoice => {
                            invoice.client = clientsDataFromRest.find(client => client.id === invoice.clientId);
                        });

                        // Testing if invoices data can be fetched and connect with the client info
                        const data = (await testUtils.fetchGQLServer(testUtils.getInvoiceGQLQuery())); // remove this line
                        const { errors: invoicesErrorsFromGQL, data: { Invoice: invoicesDataFromGQL } } =
                            (await testUtils.fetchGQLServer(testUtils.getInvoiceGQLQuery()));
                        should.not.exist(invoicesErrorsFromGQL);
                        should.exist(invoicesDataFromGQL);
                        invoicesDataFromGQL.should.have.lengthOf(invoicesDataFromRest.length);
                        invoicesDataFromGQL.should.be.eql(invoicesDataFromRest);

                    });

                    // Reference by an array field
                    it.skip('should run and reply fetching clients data on invoice list of elements', async () => {
                        // Setting up the GQL Server
                        const port = testUtils.getPort();
                        const entities = testUtils.createInvoiceAndClientEntity();

                        server = new Server(port, entities);
                        await server.start();

                        // Fetch data from rest to compare with data fetched via GraphQL
                        const invoicesDataFromRest = (await testUtils.getInvoiceDataFromRest());
                        const clientsDataFromRest = (await testUtils.getClientDataFromRest());
                        // Make the data looks like it will be from GQL
                        invoicesDataFromRest.forEach(invoice => {
                            invoice.client = clientsDataFromRest.find(client => client.id === invoice.clientId);
                        });

                        // Testing if invoices data can be fetched and connect with the client info
                        const data = (await testUtils.fetchGQLServer(testUtils.getInvoiceGQLQuery())); // remove this line
                        const { errors: invoicesErrorsFromGQL, data: { Invoice: invoicesDataFromGQL } } =
                            (await testUtils.fetchGQLServer(testUtils.getInvoiceGQLQuery()));
                        should.not.exist(invoicesErrorsFromGQL);
                        should.exist(invoicesDataFromGQL);
                        invoicesDataFromGQL.should.have.lengthOf(invoicesDataFromRest.length);
                        invoicesDataFromGQL.should.be.eql(invoicesDataFromRest);

                    });

                    // Reference by a plain field
                    it.skip('should run and reply fetching clients data on invoice filtering by any field', async (done) => {
                    });

                    // Reference by an array field
                    it.skip('should run and reply fetching clients data on invoice filtering by any field', async (done) => {
                    });

                });
            });

        });

        describe('Error', function() {

            it('should fail without port configuration', async () => {
                // Setting up the GQL Server
                const productEntity = testUtils.createProductEntity();
                const port = undefined;

                // Testing
                (() => {
                    new Server(port, [productEntity]);
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
                const productEntity = testUtils.createProductEntity();
                const port = testUtils.getRestPort();
                const server = new Server(port, [productEntity]);
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
                const productEntity = testUtils.createProductEntity();
                const productEntityRepeated = testUtils.createProductEntity();
                const port = testUtils.getPort();
                // Testing
                (() => new Server(port, [productEntity, productEntityRepeated]))
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
        });
    });
});