const { describe, it, beforeEach, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const { Server, Errors } = require("../../src/index")
const { integrationUtils, entityUtils, serverUtils } = require('../utils/index');

describe('GQL Server', function() {
    beforeEach((done) => {
        integrationUtils.cleanAndRestartRESTAPIServer()
            .then(() => done())
            .catch((err) => done(err))
    });

    afterEach((done) => {
        integrationUtils.cleanRESTAPIServer();
        done();
    });

    describe('GQL server running and responding', function() {
        describe('Success', function() {

            describe("should run and respond", async function() {
                let server;

                afterEach((done) => {
                    server.stop()
                        .then(_ => done())
                        .catch((err) => done(err));
                });

                describe('schema without connection between entities', async function() {

                    it('should run and reply fetching products list of elements', async () => {
                        // Setting up the GQL Server
                        const productEntity = integrationUtils.createProductEntity();
                        const port = serverUtils.getPort();
                        server = new Server(port, [productEntity]);
                        await server.start();

                        // Testing if the server is running
                        const serverState = server.getState();
                        serverState.should.to.be.a('string');
                        serverState.should.to.be.equal('RUNNING');

                        // Testing if products data can be fetched
                        const productsDataFromRest = (await integrationUtils.getProductDataFromRest());
                        const { errors: productsErrorsFromGQL, data: { Product: productsDataFromGQL } } =
                            (await integrationUtils.fetchGQLServer(integrationUtils.getProductGQLQuery()));
                        should.not.exist(productsErrorsFromGQL);
                        should.exist(productsDataFromGQL);
                        productsDataFromGQL.should.have.lengthOf(productsDataFromRest.length);
                        productsDataFromGQL.should.be.eql(productsDataFromRest);
                    });

                    it.skip('should run and reply fetching products filtering by different fields', async (done) => {
                    });

                });

                describe('schema with reference between entities', async function() {

                    it('should run and reply fetching clients data on invoice list of elements', async () => {
                        // Setting up the GQL Server
                        const port = serverUtils.getPort();
                        const entities = integrationUtils.createInvoiceFullModel();

                        server = new Server(port, entities);
                        await server.start();

                        // Fetch data from rest to compare with data fetched via GraphQL
                        let invoicesDataFromRest = (await integrationUtils.getInvoiceDataFromRest());
                        const clientsDataFromRest = (await integrationUtils.getClientDataFromRest());
                        const paymentsDataFromRest = (await integrationUtils.getPaymentDataFromRest());
                        const productsDataFromRest = (await integrationUtils.getProductDataFromRest());
                        const cashiersDataFromRest = (await integrationUtils.getCashiersDataFromRest());

                        // Make the data looks like it will be from GQL
                        invoicesDataFromRest = invoicesDataFromRest.map(invoice => {
                            invoice.client = clientsDataFromRest.find(client => client.id === invoice.clientId);
                            invoice.payments = invoice.paymentIds.map(paymentId => {
                                return paymentsDataFromRest.find(payment => payment.id === paymentId);
                            });
                            invoice.header.cashier = cashiersDataFromRest.find(cashier => cashier.id === invoice.header.cashierId);
                            invoice.items = invoice.items.map(item => {
                                const product = productsDataFromRest.find(product => product.id === item.productId);
                                return {quantity: item.quantity, product};
                            });

                            const {cashierId, ...otherHeaderAttributes} = invoice.header;
                            invoice.header = otherHeaderAttributes;

                            const { paymentIds, clientId, ...otherAttributes } = invoice;
                            return otherAttributes;
                        });

                        // Testing if invoices data can be fetched and connect with the client info
                        const { errors: invoicesErrorsFromGQL, data: { Invoice: invoicesDataFromGQL } } =
                            (await integrationUtils.fetchGQLServer(integrationUtils.getInvoiceGQLQuery()));
                        should.not.exist(invoicesErrorsFromGQL);
                        should.exist(invoicesDataFromGQL);
                        invoicesDataFromGQL.should.have.lengthOf(invoicesDataFromRest.length);
                        invoicesDataFromGQL.should.be.eql(invoicesDataFromRest);

                    });

                    it.skip('should run and reply fetching clients data on invoice filtering by any field', async (done) => {
                    });

                });
            });

        });

        describe('Error', function() {

            it('should fail if selected port is taken', async () => {
                // Setting up the GQL Server on the same port as the RESTAPIServer
                const productEntity = integrationUtils.createProductEntity();
                const port = integrationUtils.getRestPort();
                const server = new Server(port, [productEntity]);
                // Testing
                return server.start().should.be.rejectedWith(Errors.PortIsTakenError);
            });

            it('should fail if any REST API service is unreachable', async () => {
                // Setting up the GQL Server
                const unreachableEntity = entityUtils.getUnreachableURLEntity();
                const port = serverUtils.getPort();
                const server = new Server(port, [unreachableEntity]);

                // Testing
                return server.start().should.be.rejectedWith(Errors.RESTAPIUnreachableError);
            });

            it('should fail if two REST API service is unreachables', async () => {
                // Setting up the GQL Server
                const unreachableEntity = entityUtils.getUnreachableURLEntity();
                const anotherUnreachableEntity = entityUtils.getAnotherUnreachableURLEntity();
                const port = serverUtils.getPort();
                const server = new Server(port, [unreachableEntity, anotherUnreachableEntity]);

                // Testing
                return server.start().should.be.rejectedWith(Errors.RESTAPIUnreachableError);
            });
        });
    });
});