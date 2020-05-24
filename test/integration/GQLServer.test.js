const assert = require('assert');
const should = require('chai').should();

const {Server} = require("../../src/index");
const testUtils = require('../utils');

describe('GQL Server', function() {
    beforeEach((done) => {
        testUtils.cleanAndRestartRESTAPIServer()
            .then( () => done())
            .catch( (err) => done(err))
    });

    describe('GQL server running and responding', function() {
        describe('Success', function() {
            it('should run and respond, started without schema and only port configuration', async () => {

                // Setting up the GQL Server
                const port = testUtils.getPort();
                const server = new Server(port,[]);
                server.start(port,[]);

                // Testing if the server is running
                const serverState = server.state();
                serverState.should.to.be.a('string');
                serverState.should.to.be.equal('running');

                // Testing if the server can be fetched
                const fetchedData = testUtils.fetchGQLServer( "", {});
                fetchedData.status.should().to.be.equal(200);
                should.exist(fetchedData.json());
            });

            describe('should run and respond with simple schema without connection between entities', function() {

                it('should run and reply a simple query', async (done) => {
                    // Setting up the GQL Server
                    const invoiceEntity = testUtils.createInvoiceEntity();
                    const productEntity = testUtils.createProductEntity();
                    const port = testUtils.getPort();
                    const server = new Server(port,[invoiceEntity, productEntity]);
                    server.start(port,[]);

                    // Testing if the server is running
                    const serverState = server.state();
                    serverState.should.to.be.a('string');
                    serverState.should.to.be.equal('running');

                    // Testing if the server can be fetched
                    const fetchedData = testUtils.fetchGQLServer( "", {});
                    fetchedData.status.should().to.be.equal(200);
                    should.exist(fetchedData.json());

                    // Testing if invoice data can be fetched
                    const invoice1Data = (await testUtils.getInvoiceDataFromRest())[0];
                    const fetchedInvoiceResponse = (await testUtils.fetchGQLServer( "invoice", {id: invoice1Data.id }));
                    fetchedInvoiceResponse.status.should().to.be.equal(200);
                    const fetchedInvoiceData = fetchedInvoiceResponse.json();
                    should.exist(fetchedInvoiceData);
                    fetchedInvoiceData.should.be.equal(invoice1Data);

                    // Testing if product data can be fetched
                    const product1Data = (await testUtils.getProductDataFromRest()[0]);
                    const fetchedProductResponse = ( await testUtils.fetchGQLServer( "product", {id: product1Data.id }));
                    fetchedProductResponse.status.should().to.be.equal(200);
                    const fetchedProductData = fetchedProductResponse.json();
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
                const server = new Server(port,[invoiceEntity]);

                // Testing
                (() => server.start()).should.throw(Error, testUtils.getNotPortConfiguredError());
            });

            it('should fail if selected port is taken', async () => {
                // Setting up the GQL Server
                const invoiceEntity = testUtils.createInvoiceEntity();
                const port = undefined;
                const server = new Server(port,[invoiceEntity]);
                server.start(port,[invoiceEntity]);
                const serverState = server.state();
                serverState.should.to.be.a('string');
                serverState.should.to.be.equal('running');

                // Setting up another GQL Server in the same port
                const newServer = new Server(port,[invoiceEntity]);

                // Testing
                (() => newServer.start()).should.throw(Error,testUtils.getPortIsTakenError());
            });

            it('should fail if some REST API service is unreachable', async () => {
                // Setting up the GQL Server
                const invoiceEntity = testUtils.createInvoiceEntity();
                const port = testUtils.getPort();
                const server = new Server(port,[invoiceEntity]);

                // Testing
                (() => server.start()).should.throw(Error,testUtils.getRESTAPIUnreachableError());
            });
        });
    });
});