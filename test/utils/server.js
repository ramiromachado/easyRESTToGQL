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
        entityUtils.referenceBy(A, B, "B", "id");
        entityUtils.referenceBy(B, C, "C", "id");
        entityUtils.referenceBy(C, A, "As", "id");
        entities.push(A, B, C);

        return new Server(this.getPort(), entities);
    }

}

module.exports = new serverUtils();