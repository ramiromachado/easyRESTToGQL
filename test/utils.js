require('isomorphic-fetch');
const { createApolloFetch } = require('apollo-fetch');

const fs = require('fs');
const jsonServer = require('json-server');

const { ArrayField, Field, Entity, Errors } = require("../src/index");

class testUtils {

    RESTAPIserver;
    restDBFile = './test/db.json'; // TODO: Replace this json for a js with a function that return what you want
    restPort = "3000";
    restAPIURL = `http://localhost:${this.restPort}`;
    productURL = `${this.restAPIURL}/products`;
    invoiceURL = `${this.restAPIURL}/invoices`;
    clientURL = `${this.restAPIURL}/clients`;
    paymentURL = `${this.restAPIURL}/paymentss`;

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

    getClientURL() {
        return this.clientURL;
    }

    getPaymentURL() {
        return this.paymentURL;
    }

    getPort() {
        return this.GQLPort;
    }

    getGQLURL() {
        return this.GQLURL;
    }

    getNoPortConfiguredError() {
        return Errors.NoPortConfiguredError;
    }

    getNoEntitiesConfiguredError() {
        return Errors.NoEntitiesConfiguredError;
    }

    getPortIsTakenError() {
        return Errors.PortIsTakenError;
    }

    getRESTAPIUnreachableError() {
        return Errors.RESTAPIUnreachableError;
    }

    getEntityWithoutNameError() {
        return Errors.EntityWithoutNameError;
    }

    getEntityRepeatedName() {
        return Errors.EntityRepeatedName;
    }

    getEntityWithoutURLError() {
        return Errors.EntityWithoutURLError;
    }

    getEntityWithoutFieldsError() {
        return Errors.EntityWithoutFieldsError;
    }

    getEntityWithRepeatedFieldError() {
        return Errors.EntityWithRepeatedFieldError;
    }

    cleanRESTAPIServer() {
        try {
            fs.unlinkSync(this.getRestDBFile());
        } catch (_) {
        }
    }

    async cleanAndRestartRESTAPIServer() {

        this.cleanRESTAPIServer();

        const invoices = [
            { id: "IN-1", total: 99, clientId: "CL-2", paymentIds: ["PY-1"], items: [{ productId: "PR-1", quantity: 5 }, { productId: "PR-2", quantity: 3 }]},
            { id: "IN-2", total: 125, clientId: "CL-1", paymentIds: ["PY-2", "PY-3"], items: [{ productId: "PR-3", quantity: 1 }] },
            { id: "IN-3", total: 0, clientId: "CL-2", paymentIds: [], items: [] }
        ];

        const clients = [
            { id: "CL-1", name: "Client #1" },
            { id: "CL-2", name: "Client #2" }
        ];

        const payments = [
            { id: "PY-1", amount:99, method:"CASH"},
            { id: "PY-2", amount:74.5, method:"CASH"},
            { id: "PY-3", amount:55.5, method:"CREDITCARD"}
        ];

        const products = [
            { id: "PR-1", value: 3.30, isAvailable: true, stock: 1700, attributes: { height: "150cm" }, tags: [ "forYou", "2x1"] },
            { id: "PR-2", value: 6.90, isAvailable: false, stock: 100, attributes: { color: "red" } , tags: [ "specialOffer"] },
            { id: "PR-3", value: 1.25, isAvailable: true, stock: 3, attributes: { height: "150cm" } , tags: [] },
        ];

        const DBData = JSON.stringify({ invoices, products, clients, payments });
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
        return new Entity("Product", this.getProductURL(), [
            new Field("id", "string"),
            new Field("value", "float"),
            new Field("isAvailable", "boolean"),
            new Field("stock", "int"),
            new Field("attributes", "object"),
            new ArrayField("tags", "string")
        ]);
    }

    getProductGQLQuery() {
        return `{
            Product {
                id
                value
                isAvailable
                stock
                attributes
                tags
            }
        }`
    }

    createInvoiceAndClientEntity() {
        const clientEntity = this.createClientEntity();
        const paymentEntity = this.createPaymentEntity();

        const invoiceEntity = new Entity("Invoice", this.getInvoiceURL(), [
            new Field("id", "string"),
            new Field("total", "int"),
            new Field("client", new ReferenceField(clientEntity, "clientId")),
            new ArrayField("payments", new ReferenceField( paymentEntity, "paymentIds")),
            new ArrayField("items", "object")
        ]);

        return [clientEntity, invoiceEntity];
    }

    getInvoiceGQLQuery() {
        return `{
            Invoice {
                id
                total
                clientId {
                    id
                    name
                }
                pays {
                  id
                  amount
                  method  
                }
                items
            }
        }`
    }

    createClientEntity() {
        return new Entity("Client", this.getClientURL(), [
            new Field("id", "string"),
            new Field("name", "string")
        ]);
    }

    getClientGQLQuery() {
        return `{
            Client {
                id
                name
            }
        }`
    }

    createPaymentEntity() {
        return new Entity("Payment", this.getPaymentURL(), [
            new Field("id", "string"),
            new Field("amount", "float"),
            new Field("method", "string")
        ]);
    }

    getClientGQLQuery() {
        return `{
            Payment {
                id
                amount
                method
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

    async getProductDataFromRest() {
        return this.fetchRESTAPIServer(this.getProductURL());
    }

    async getInvoiceDataFromRest() {
        return this.fetchRESTAPIServer(this.getInvoiceURL());
    }

    async getClientDataFromRest() {
        return this.fetchRESTAPIServer(this.getClientURL());
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