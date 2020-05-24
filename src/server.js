const { GraphQLServer } = require('graphql-yoga');

const {
    NoPortConfiguredError, NoEntitiesConfiguredError, PortIsTakenError, RESTAPIUnreachableError, EntityRepeatedName
} = require('./errors');

class Server {

    port;
    entities;
    state;
    GraphQLServer;

    constructor(port, entities) {
        if (!port) throw new NoPortConfiguredError();
        if (!entities || entities.length == 0) throw new NoEntitiesConfiguredError();
        if (this.thereIsSomeFieldNameRepeated(entities)) throw new EntityRepeatedName();
        this.setPort(port);
        this.setEntities(entities);
        this.setState("CREATED");
    }

    async start() {
        if (await this.isPortIsTaken(this.getPort())) throw new PortIsTakenError();
        if (await this.thereIsSomeRESTAPIURLUnfetchable()) throw new RESTAPIUnreachableError();

        await this.startGQLServer();
        this.setState("START");
    }

    async stop() {
        if(this.getState() === "RUNNING" && this.GraphQLServer){
            await this.GraphQLServer.close();
        }
    }

    setState(event) {
        this.state = states[event];
    }

    getState() {
        return this.state;
    }

    setPort(port) {
        this.port = port;
    }

    getPort() {
        return this.port;
    }

    setEntities(entities) {
        this.entities = entities;
    }

    getEntities() {
        return this.entities;
    }

    // TODO: find a better way to do this
    async isPortIsTaken(port) {
        return new Promise((resolve) => {
            const net = require('net');
            const server = net.createServer();

            server.once('error', function(err) {
                if (err.code === 'EADDRINUSE') {
                    resolve(true);
                }
            });

            server.once('listening', function() {
                resolve(false);
                server.close();
            });

            server.listen(port);
        });
    }

    async thereIsSomeRESTAPIURLUnfetchable() {
        const entitiesRESTAPIURLAreFetchable = await Promise.all(this.getEntities().map(async entity => {
            return entity.isTheRESTAPIURLFetchable();
        }));

        return entitiesRESTAPIURLAreFetchable.some(isEntityRESTAPIURLFetchable => !isEntityRESTAPIURLFetchable);
    }

    //TODO: Think if there is a better way to do this
    thereIsSomeFieldNameRepeated(entities){
        return entities.some(entityA => {
            return entities.some(entityB => {
                return entityA != entityB && entityA.getName() == entityB.getName();
            });
        });
    }

    // TODO: do it using template literals as functions
    queryList(){
        const entitiesQueryList = this.getEntities().map(entity => entity.getQueryString()).join('\n');
        return `type Query {
           ${entitiesQueryList} 
        }`;
    }

    // TODO: do it using template literals as functions
    typeList(){
        return this.getEntities().map(entity => entity.getTypeString()).join('\n');
    }

    // TODO: find a better way to do this
    getQueryResolvers(){
        let resolvers = {};

        this.getEntities().map(entity => resolvers[entity.getName()] = entity.getResolver());
        return resolvers;
    }

    // TODO: do it using template literals as functions
    getTypeDefs(){
        return `
            ${this.queryList()}
            ${this.typeList()}
        `;
    }

    async startGQLServer() {
        const typeDefs = this.getTypeDefs();
        const queryResolvers = this.getQueryResolvers();
        const resolvers = {
            Query: queryResolvers
        };

        const GQLServer = new GraphQLServer({
            typeDefs,
            resolvers
        });

        const options = {
            port: this.getPort(),
            endpoint: '/graphql'
        };

        return GQLServer.start(options).then(server =>{
            this.GraphQLServer = server;
        });
    }

}

const states = {
    CREATED: "CREATED",
    START: "RUNNING",
    STOP: "STOPPED"
};

module.exports = Server;