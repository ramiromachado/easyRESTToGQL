const { NoPortConfiguredError, PortIsTakenError, RESTAPIUnreachableError} = require('./errors');

class Server{

    port;
    entities;
    state;

    constructor(port, entities){
        if(!port) throw new NoPortConfiguredError();
        this.setPort(port);
        this.setEntities(entities);
        this.setState("CREATED");
    }

    async start(){
        if(await this.isPortIsTaken(this.getPort())) throw new PortIsTakenError();
        if(await this.thereIsSomeRESTAPIURLUnfetchable()) throw new RESTAPIUnreachableError();

        // Initialice gql server
        this.setState("START");
    }

    setState(event){
        this.state = states[event];
    }

    getState(){
        return this.state;
    }

    setPort(port) {
        this.port = port;
    }

    getPort() {
        return this.port;
    }

    setEntities(entities){
        this.entities = entities;
    }

    getEntities(){
        return this.entities;
    }

    // TODO: find a better way to do this
    async isPortIsTaken(port){
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

    async thereIsSomeRESTAPIURLUnfetchable(){
        return this.getEntities().some(async entity => !(await entity.isTheRESTAPIURLFetchable()));
    }

}

const states = {
    CREATED: "CREATED",
    START: "RUNNING",
    STOP: "STOPPED"
};

module.exports = Server;