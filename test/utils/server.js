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
        entities.push(...entityUtils.getTwoLinealReferencedEntities());
        entities.push(...entityUtils.getThreeLoopReferencedEntities());

        return new Server(this.getPort(), entities);
    }

}

module.exports = new serverUtils();