require('isomorphic-fetch');
const { createApolloFetch } = require('apollo-fetch');
const fs = require('fs');
const jsonServer = require('json-server');

const { ArrayField, Field, ReferenceField, ArrayReferenceField, Entity } = require("../../src/index");
const serverUtils = require('./server');
const entityUtils = require('./entity');

class integrationUtils {

    RESTAPIserver;
    restDBFile = './test/db.json'; // TODO: Replace this json for a js with a function that return what you want
    restPort = "3000";
    restAPIURL = `http://localhost:${this.restPort}`;
    productURL = `${this.restAPIURL}/products`;
    invoiceURL = `${this.restAPIURL}/invoices`;
    clientURL = `${this.restAPIURL}/clients`;
    paymentURL = `${this.restAPIURL}/payments`;


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

    cleanRESTAPIServer() {
        try {
            fs.unlinkSync(this.getRestDBFile());
        } catch (_) {
        }
    }

    async cleanAndRestartRESTAPIServer() {

        this.cleanRESTAPIServer();

        const invoices = [
            {
                id: "IN-1",
                total: 99,
                clientId: "CL-2",
                paymentIds: ["PY-1"],
                items: [{ productId: "PR-1", quantity: 5 }, { productId: "PR-2", quantity: 3 }]
            },
            {
                id: "IN-2",
                total: 125,
                clientId: "CL-1",
                paymentIds: ["PY-2", "PY-3"],
                items: [{ productId: "PR-3", quantity: 1 }]
            },
            { id: "IN-3", total: 0, clientId: "CL-2", paymentIds: [], items: [] }
        ];

        const clients = [
            { id: "CL-1", name: "Client #1" },
            { id: "CL-2", name: "Client #2" }
        ];

        const payments = [
            { id: "PY-1", amount: 99, method: "CASH" },
            { id: "PY-2", amount: 74.5, method: "CASH" },
            { id: "PY-3", amount: 55.5, method: "CREDITCARD" }
        ];

        const products = [
            {
                id: "PR-1",
                value: 3.30,
                isAvailable: true,
                stock: 1700,
                attributes: { height: "150cm" },
                tags: ["forYou", "2x1"]
            },
            {
                id: "PR-2",
                value: 6.90,
                isAvailable: false,
                stock: 100,
                attributes: { color: "red" },
                tags: ["specialOffer"]
            },
            { id: "PR-3", value: 1.25, isAvailable: true, stock: 3, attributes: { height: "150cm" }, tags: [] },
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
            new ReferenceField("clientId"),
            new ArrayReferenceField("paymentIds"),
            new ArrayField("items", "object")
        ]);

        entityUtils.referenceBy(invoiceEntity, clientEntity, "clientId","id");
        entityUtils.referenceBy(invoiceEntity, paymentEntity, "paymentIds","id");

        return [clientEntity, invoiceEntity, paymentEntity];
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
                paymentIds {
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

    async getProductDataFromRest() {
        return this.fetchRESTAPIServer(this.getProductURL());
    }

    async getInvoiceDataFromRest() {
        return this.fetchRESTAPIServer(this.getInvoiceURL());
    }

    async getClientDataFromRest() {
        return this.fetchRESTAPIServer(this.getClientURL());
    }

    async getPaymentDataFromRest() {
        return this.fetchRESTAPIServer(this.getPaymentURL());
    }

    async fetchRESTAPIServer(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    }

    async fetchGQLServer(query) {
        const fetch = createApolloFetch({ uri: serverUtils.getGQLURL() });
        return fetch({ query });
    }
}

module.exports = new integrationUtils();