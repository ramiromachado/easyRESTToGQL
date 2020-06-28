const entityUtils = require('./entity');
const { Server } = require('../../src/index');

class serverUtils {

    GQLPort = "4000";
    GQLURL = `http://localhost:${this.getPort()}/graphql`;

    getPort() {
        return this.GQLPort;
    }

    getGQLURL() {
        return this.GQLURL;
    }

    getWithAllTypeOfEntitiesServer() {
        const entities = [];

        entities.push(entityUtils.getWithAllBasicTypeOfFieldsEntity());

        //Referenced entities
        const { A, B, C } = entityUtils.getReferencedABCEntities();
        entityUtils.referenceBy(A, B, "BId", "id");
        entityUtils.referenceBy(B, C, "CId", "id");
        entityUtils.referenceBy(C, A, "AIds", "id");
        entities.push(A, B, C);

        const {entity, nestedEntity} = entityUtils.getEntityWithNestedEntity();
        entities.push(entity, nestedEntity);

        const port = this.getPort();
        const serverConfig = { port, entities};
        return new Server(serverConfig);
    }

}

module.exports = new serverUtils();