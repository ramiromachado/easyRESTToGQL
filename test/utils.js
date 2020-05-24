require('isomorphic-fetch');
const fs = require('fs');
const jsonServer = require('json-server');

const { Field, Entity, Errors } = require("../src/index");
const { NotPortConfiguredError, PortIsTakenError, APIUnreachableError } = Errors;

class testUtils {

    RESTAPIserver;
    restDBFile = './db.json';
    restPort = "3000";
    restAPIURL = `localhost:${this.restPort}`;
    productURL = `${this.restAPIURL}/products`;
    invoiceURL = `${this.restAPIURL}/invoices`;

    GQLPort = "4000";

    getRestDBFile() { return this.restDBFile; }
    getRestPort() { return this.restPort; }
    getProductURL() { return this.productURL; }
    getInvoiceURL() { return this.invoiceURL; }
    getPort() { return this.GQLPort; }
    getNotPortConfiguredError() { return NotPortConfiguredError; }
    getPortIsTakenError() { return PortIsTakenError; }
    getRESTAPIUnreachableError() { return APIUnreachableError; }

    async cleanAndRestartRESTAPIServer() {

        const invoices = [{ id: "000001", total: 993, productIds: ["001", "002"] },
            { id: "000002", total: 125, productIds: ["003"] }];

        const products = [
            { id: "001", value: 3.30 },
            { id: "002", value: 6.90 },
            { id: "003", value: 1.25 }
        ];

        const DBData = JSON.stringify({ invoices, products });
        fs.writeFileSync(this.getRestDBFile(), DBData);

        if(!this.RESTAPIserver){
            this.RESTAPIserver = jsonServer.create();
            const router = jsonServer.router(this.getRestDBFile());
            const middlewares = jsonServer.defaults();

            this.RESTAPIserver.use(middlewares);
            this.RESTAPIserver.use(router);
            this.RESTAPIserver.listen(this.getRestPort());
        }
    }

    createProductEntity() {
        return new Entity(this.getProductURL(), [
            new Field("id", "string"),
            new Field("value", "number")
        ]);
    }

    createInvoiceEntity() {
        return new Entity(this.getInvoiceURL(), [
            new Field("id", "string"),
            new Field("total", "number"),
            new Field("productIds", "array", "string")
        ]);
    }

    async getProductDataFromRest(){
        return this.fetchRESTAPIServer(this.getProductURL());
    }

    async getInvoiceDataFromRest(){
        return this.fetchRESTAPIServer(this.getInvoiceURL());
    }

    async fetchRESTAPIServer(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    }

    async fetchGQLServer(entity, data) {
        const query = ``; // TODO: Make a proper query

        const response = await fetch(`localhost:${this.getPort()}/graphql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        return response;
    }
}

module.exports = new testUtils();