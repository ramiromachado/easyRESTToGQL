const _ = require('lodash');
const { GraphQLServer } = require('graphql-yoga');

const CONSTANTS = require('../constants.js');
const { NoPortConfiguredError, NoEntitiesConfiguredError, PortIsTakenError, RESTAPIUnreachableError, EntityRepeatedName,
    ReferencedEntityIsMissingOrWrongError } = require('../errors');

class Server {

    port;
    entities;
    state;
    GraphQLServer;

    constructor(serverConfig) {
        const { port, entities } = serverConfig;
        if (!port) throw new NoPortConfiguredError();
        if (!entities || entities.length == 0) throw new NoEntitiesConfiguredError();

        this.setPort(port);
        this.setEntities(entities);

        // TODO: Get the repeated Name to inform it
        if (this.thereIsSomeEntityNameRepeated()) throw new EntityRepeatedName();

        // TODO: Get the name to inform it
        if (this.thereIsSomeNestedEntityWrongReferred()) throw new ReferencedEntityIsMissingOrWrongError();

        this.setState(CONSTANTS.COMPONENTS.SERVER.STATES.CREATED);
    }

    async start() {
        if (await this.isPortIsTaken(this.getPort())) throw new PortIsTakenError(this.getPort());
        await this.throwExceptionIfSomeRESTAPIURLIsUnreachable();

        await this.startGQLServer();
        this.setState(CONSTANTS.COMPONENTS.SERVER.STATES.RUNNING);
    }

    async stop() {
        if(this.isRunning() && this.GraphQLServer){
            await this.GraphQLServer.close();
        }
    }

    setState(event) {
        this.state = CONSTANTS.COMPONENTS.SERVER.STATES[event];
    }

    getState() {
        return this.state;
    }

    isRunning(){
        return this.state === CONSTANTS.COMPONENTS.SERVER.STATES.RUNNING;
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

    getNotNestedEntities(){
        return this.getEntities().filter(entity => !entity.isNested());
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

    async throwExceptionIfSomeRESTAPIURLIsUnreachable(){
        const RESTAPIURLsUnfetchable = await this.getRESTAPIURLsUnfetchable();
        if (RESTAPIURLsUnfetchable.length != 0) throw new RESTAPIUnreachableError(RESTAPIURLsUnfetchable);
    }

    async getRESTAPIURLsUnfetchable() {
        // Using async map to make async filtering
        const entitiesRESTAPIURLAreFetchable = await Promise.all(this.getNotNestedEntities().map(async entity => {
            return entity.isTheRESTAPIURLFetchable();
        }));

        return this.getNotNestedEntities().filter((_, index) => !entitiesRESTAPIURLAreFetchable[index]).map(entity => entity.getRESTAPIURL());
    }

    thereIsSomeEntityNameRepeated(){
        return _.uniqBy(this.getEntities(), entity => entity.getName()).length != this.getEntities().length;
    }

    getQueryResolvers(){
        return this.getNotNestedEntities().reduce((resolvers, entity) => {
            resolvers[entity.getName()] = entity.getFetchAllFunction();
            return resolvers;
        }, {});
    }

    getTypeResolvers(){
        return this.getEntities().reduce((resolvers, entity) => {
            resolvers[entity.getName()] = entity.getTypeResolver();
            return resolvers;
        }, {});
    }

    getTypeDefs(){
        const queryList = this.queryList``;
        const typeList = this.typeList``;
        return `
            scalar Object
            scalar Date
            ${queryList}
            ${typeList}
        `;
    }

    thereIsSomeNestedEntityWrongReferred(){
        const entities = this.getEntities();

        const nestedFields = _.flatten(entities.map(entity => entity.getNestedFields()));
        return nestedFields.some(field => {
            //TODO: Match the exact type (this is a workaround for array fields)
            return !entities.some(entity => field.getType().includes(entity.getName()));
        });
    }

    queryList(){
        const entitiesQueryList = this.getNotNestedEntities().map(entity => entity.getQueryString``).join('\n');
        return `type Query {
           ${entitiesQueryList} 
        }`;
    }

    typeList(){
        return this.getEntities().map(entity => entity.getTypeString``).join('\n');
    }

    async startGQLServer() {
        const typeDefs = this.getTypeDefs``;
        const queryResolvers = this.getQueryResolvers();
        const typesResolvers = this.getTypeResolvers();
        const resolvers = {
            Query: queryResolvers,
            ...typesResolvers
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

module.exports = Server;