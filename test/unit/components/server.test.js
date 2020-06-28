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
            const entities = [withAllTypeOfFieldsEntity];
            const serverConfig = {port, entities};

            // Testing
            (() => {
                new Server(serverConfig);
            }).should.throw(Errors.NoPortConfiguredError);
        });

        it('should fail without entities configured', async () => {
            // Setting up the GQL Server
            const port = serverUtils.getPort();
            const entities = [];
            const serverConfig = { port, entities};

            // Testing
            (() => {
                new Server(serverConfig);
            }).should.throw(Errors.NoEntitiesConfiguredError);
        });

        it('should fail if two entities has the same name', async () => {
            // Setting up the GQL Server
            const withAllTypeOfFieldsEntity = entityUtils.getWithAllBasicTypeOfFieldsEntity();
            const withAllTypeOfFieldsEntityRepeated = entityUtils.getWithAllBasicTypeOfFieldsEntity();
            const port = serverUtils.getPort();
            const entities = [withAllTypeOfFieldsEntity, withAllTypeOfFieldsEntityRepeated];
            const serverConfig = { port, entities};

            // Testing
            (() => new Server(serverConfig))
                .should.throw(Errors.EntityRepeatedName);
        });

        it('should fail if a nested field reference a non-existent entity', async () => {
            // Setting up the GQL Server
            const entityA = entityUtils.getEntityWithNestedFieldAndNestedArrayField("A","B");
            const port = serverUtils.getPort();
            const entities = [entityA];
            const serverConfig = { port, entities};

            // Testing
            (() => new Server(serverConfig))
                .should.throw(Errors.ReferencedEntityIsMissingOrWrongError);
        });

        it('should fail if a nested field in a nested entity reference a non-existent entity', async () => {
            // Setting up the GQL Server
            const entityA = entityUtils.getNestedEntityWithNestedField("A","B");
            const port = serverUtils.getPort();
            const entities = [entityA];
            const serverConfig = { port, entities};

            // Testing
            (() => new Server(serverConfig))
                .should.throw(Errors.ReferencedEntityIsMissingOrWrongError);
        });
    });
});