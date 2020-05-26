const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const should = require('chai').should();
chai.use(chaiAsPromised);

const {Server, Errors} = require('../../../src/index');
const { serverUtils, entityUtils }= require('../../utils/index');

describe('Server', function() {

    describe('Success', async () => {
        it('should create a server with all kind of entities and all type of field', async () => {
            const server = serverUtils.getWithAllTypeOfEntitiesServer();

            // Testing
            should.exist(server);
        });

    });

    describe('Errors', async () => {
        it('should fail without port configuration', async () => {
            // Setting up the GQL Server
            const withAllTypeOfFieldsEntity = entityUtils.getWithAllBasicTypeOfFieldsEntity();
            const port = undefined;

            // Testing
            (() => {
                new Server(port, [withAllTypeOfFieldsEntity]);
            }).should.throw(Errors.NoPortConfiguredError);
        });

        it('should fail without entities configured', async () => {
            // Setting up the GQL Server
            const port = serverUtils.getPort();

            // Testing
            (() => {
                new Server(port, []);
            }).should.throw(Errors.NoEntitiesConfiguredError);
        });

        it('should fail if two entities has the same name', async () => {
            // Setting up the GQL Server
            const withAllTypeOfFieldsEntity = entityUtils.getWithAllBasicTypeOfFieldsEntity();
            const withAllTypeOfFieldsEntityRepeated = entityUtils.getWithAllBasicTypeOfFieldsEntity();

            // Testing
            (() => new Server(serverUtils.getPort(), [withAllTypeOfFieldsEntity, withAllTypeOfFieldsEntityRepeated]))
                .should.throw(Errors.EntityRepeatedName);
        });
    });
});