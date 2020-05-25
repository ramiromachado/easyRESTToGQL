require('isomorphic-fetch');
const { createApolloFetch } = require('apollo-fetch');

const fs = require('fs');
const jsonServer = require('json-server');

const { ArrayField, Field, Entity, Errors } = require("../src/index");
const {
    NoPortConfiguredError, NoEntitiesConfiguredError, PortIsTakenError, RESTAPIUnreachableError, EntityWithoutNameError,
    EntityRepeatedName, EntityWithoutURLError, EntityWithoutFieldsError, EntityWithRepeatedFieldError,
    FieldWithoutNameError, FieldWithoutTypeError
} = Errors;

class testUtils {

    RESTAPIserver;
    restDBFile = './test/db.json'; // TODO: Replace this json for a js with a function that return what you want
    restPort = "3000";
    restAPIURL = `http://localhost:${this.restPort}`;
    productURL = `${this.restAPIURL}/products`;
    invoiceURL = `${this.restAPIURL}/invoices`;

    GQLPort = "4000";
    GQLURL = `http://localhost:${this.getPort()}/graphql`;

    getRestDBFile() {
        return this.restDBFile;
    }

    getRestPort() {
        return this.restPort;
    }

    getProductURL() {
        return this.productURL;
    }

    getInvoiceURL() {
        return this.invoiceURL;
    }

    getPort() {
        return this.GQLPort;
    }

    getGQLURL() {
        return this.GQLURL;
    }

    getNoPortConfiguredError() {
        return NoPortConfiguredError;
    }

    getNoEntitiesConfiguredError() {
        return NoEntitiesConfiguredError;
    }

    getPortIsTakenError() {
        return PortIsTakenError;
    }

    getRESTAPIUnreachableError() {
        return RESTAPIUnreachableError;
    }

    getEntityWithoutNameError() {
        return EntityWithoutNameError;
    }

    getEntityRepeatedName() {
        return EntityRepeatedName;
    }

    getEntityWithoutURLError() {
        return EntityWithoutURLError;
    }

    getEntityWithoutFieldsError() {
        return EntityWithoutFieldsError;
    }


    getEntityWithRepeatedFieldError() {
        return EntityWithRepeatedFieldError;
    }

    getFieldWithoutNameError() {
        return FieldWithoutNameError;
    }

    getFieldWithoutTypeError() {
        return FieldWithoutTypeError;
    }

    cleanRESTAPIServer() {
        try {
            fs.unlinkSync(this.getRestDBFile());
        } catch(_) {}
    }

    async cleanAndRestartRESTAPIServer() {

        this.cleanRESTAPIServer();

        const invoices = [
            { id: "000001", total: 993, productIds: ["001", "002"] },
            { id: "000002", total: 125, productIds: ["003"] }
        ];

        const products = [
            { id: "001", value: 3.30, isAvailable: true },
            { id: "002", value: 6.90, isAvailable: false },
            { id: "003", value: 1.25, isAvailable: true }
        ];

        const DBData = JSON.stringify({ invoices, products });
        fs.writeFileSync(this.getRestDBFile(), DBData);

        if (!this.RESTAPIserver) {
            // TODO: make it start quiet
            this.RESTAPIserver = jsonServer.create();
            const router = jsonServer.router(this.getRestDBFile());
            const middlewares = jsonServer.defaults();

            this.RESTAPIserver.use(middlewares);
            this.RESTAPIserver.use(router);
            await this.RESTAPIserver.listen(this.getRestPort());
        }
    }

    createProductEntity() {
        const entityName = "Product";
        return new Entity(entityName, this.getProductURL(), [
            new Field("id", "string"),
            new Field("value", "float"),
            new Field("isAvailable", "boolean")
        ]);
    }

    getProductGQLQuery() {
        return `{
            Product {
                id
                value
                isAvailable
            }
        }`
    }

    createInvoiceEntity() {
        const entityName = "Invoice";
        return new Entity(entityName, this.getInvoiceURL(), [
            new Field("id", "string"),
            new Field("total", "int"),
            new ArrayField("productIds", "string")
        ]);
    }

    getInvoiceGQLQuery() {
        return `{
            Invoice {
                id
                total
                productIds    
            }
        }`
    }

    createEntityWithoutName() {
        return new Entity(undefined, this.getInvoiceURL(), [new Field("id", "string")]);
    }



    createEntityWithoutURL() {
        return new Entity("withoutURL", undefined, [new Field("id", "string")]);
    }

    createEntityWithUnreachableURL() {
        return new Entity("withoutURL", "unreachable", [new Field("id", "string")]);
    }

    createEntityWithoutFields() {
        return new Entity("withoutFields", this.getInvoiceURL(), []);
    }

    createEntityWitRepeatedFieldName() {
        return new Entity("name", this.getInvoiceURL(), [new Field("id", "string"), new Field("id", "string")]);
    }

    createFieldWithoutName() {
        return new Field(undefined, "string");
    }

    createFieldWithoutType() {
        return new Field("id", undefined);
    }

    async getProductDataFromRest() {
        return this.fetchRESTAPIServer(this.getProductURL());
    }

    async getInvoiceDataFromRest() {
        return this.fetchRESTAPIServer(this.getInvoiceURL());
    }

    async fetchRESTAPIServer(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    }

    async fetchGQLServer(query) {
        const fetch = createApolloFetch({ uri: this.getGQLURL() });
        return fetch({ query });
    }
}

module.exports = new testUtils();