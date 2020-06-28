require('isomorphic-fetch');
const { createApolloFetch } = require('apollo-fetch');
const fs = require('fs');
const jsonServer = require('json-server');

const { Fields, Entities } = require("../../src/index");
const { StringField, FloatField, IntField, BooleanField, ObjectField, DateField, StringArrayField, ReferenceField,
    ArrayReferenceField, NestedField, ArrayNestedField } = Fields;
const { Entity, NestedEntity } = Entities;

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
    cashierURL = `${this.restAPIURL}/cashiers`;


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

    getCashierURL() {
        return this.cashierURL;
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
                header: { datetime: new Date(1592188158137), counter:"3", cashierId: "CA-1"},
                total: 99,
                clientId: "CL-2",
                paymentIds: ["PY-1"],
                items: [{ productId: "PR-1", quantity: 5 }, { productId: "PR-2", quantity: 3 }]
            },
            {
                id: "IN-2",
                header: { datetime: new Date(1592274534044), counter:"2", cashierId: "CA-2"},
                total: 125,
                clientId: "CL-1",
                paymentIds: ["PY-2", "PY-3"],
                items: [{ productId: "PR-3", quantity: 1 }]
            },
            {
                id: "IN-3",
                header: { datetime: new Date(1592284534044), counter:"1", cashierId: "CA-1"},
                total: 0,
                clientId: "CL-2",
                paymentIds: [],
                items: []
            }
        ];

        const cashiers = [
            { id: "CA-1", name: "Cashier #1" },
            { id: "CA-2", name: "Cashier #2" }
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
            {
                id: "PR-3",
                value: 1.25,
                isAvailable: true,
                stock: 3,
                attributes: { height: "150cm" },
                tags: []
            }
        ];

        const DBData = JSON.stringify({ invoices, cashiers, products, clients, payments });
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
        const url = this.getProductURL();
        const fields = [
            new StringField("id"),
            new FloatField("value"),
            new BooleanField("isAvailable"),
            new IntField("stock"),
            new ObjectField("attributes"),
            new StringArrayField("tags")
        ];
        const entityConfig = { url, fields};
        return new Entity("Product", entityConfig);
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

    createInvoiceFullModel() {
        const clientEntity = this.createClientEntity();
        const cashierEntity = this.createCashierEntity();
        const paymentEntity = this.createPaymentEntity();
        const productEntity = this.createProductEntity();
        const invoiceHeaderNestedEntity = this.createInvoiceHeaderNestedEntity();
        const invoiceItemNestedEntity = this.createInvoiceItemNestedEntity();

        const asyncTrue = async () => {
            return new Promise(resolve => setTimeout(() => resolve(true), 1000));
        }

        const syncTrue = () => true;

        const url = this.getInvoiceURL();
        const fields = [
            new StringField("id"),
            new NestedField("header", invoiceHeaderNestedEntity.getName()),
            new IntField("total"),
            new ReferenceField("clientId").setAlias("client"),
            new ArrayReferenceField("paymentIds").setAlias("payments"),
            new BooleanField("isAuthorizedByTheGovernment", { resolver: asyncTrue}),
            new BooleanField("areAllBarCodesReadCorrectly", { resolver: syncTrue}),
            new ArrayNestedField("items", invoiceItemNestedEntity.getName())
        ];
        const entityConfig = { url, fields};
        const invoiceEntity = new Entity("Invoice", entityConfig);

        entityUtils.referenceBy(invoiceEntity, clientEntity, "clientId","id");
        entityUtils.referenceBy(invoiceEntity, paymentEntity, "paymentIds","id");
        entityUtils.referenceBy(invoiceHeaderNestedEntity, cashierEntity, "cashierId","id");
        entityUtils.referenceBy(invoiceItemNestedEntity, productEntity, "productId","id");

        return [cashierEntity, clientEntity, invoiceEntity, paymentEntity, productEntity, invoiceHeaderNestedEntity, invoiceItemNestedEntity];
    }

    getInvoiceGQLQuery() {
        return `{
            Invoice {
                id
                header{
                    datetime
                    counter
                    cashier{
                        id
                        name
                    }
                }
                total
                client {
                    id
                    name
                }
                payments {
                  id
                  amount
                  method  
                }
                items {
                    product{
                        id
                        value
                        isAvailable
                        stock
                        attributes
                        tags
                    }
                    quantity
                }
                isAuthorizedByTheGovernment
                areAllBarCodesReadCorrectly
            }
        }`
    }

    createClientEntity() {
        const url = this.getClientURL();
        const fields = [
            new StringField("id"),
            new StringField("name"),
            new NestedField("referrer", "Client")
        ];
        const entityConfig = { url, fields};
        return new Entity("Client", entityConfig);
    }

    createPaymentEntity() {
        const url = this.getPaymentURL();
        const fields = [
            new StringField("id"),
            new FloatField("amount"),
            new StringField("method")
        ];
        const entityConfig = { url, fields};
        return new Entity("Payment", entityConfig);
    }

    createCashierEntity() {
        const url = this.getCashierURL();
        const fields = [
            new StringField("id"),
            new StringField("name")
        ];
        const entityConfig = { url, fields};
        return new Entity("InvoiceHeader", entityConfig);
    }

    createInvoiceItemNestedEntity() {
        const fields = [
            new ReferenceField("productId").setAlias("product"),
            new IntField("quantity")
        ];
        const entityConfig = { fields };
        return new NestedEntity("InvoiceItem", entityConfig);
    }

    createInvoiceHeaderNestedEntity() {
        const fields = [
            new DateField("datetime"),
            new StringField("counter"),
            new ReferenceField("cashierId").setAlias("cashier")
        ];
        const entityConfig = { fields };
        return new NestedEntity("Cashier", entityConfig);
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

    async getCashiersDataFromRest() {
        return this.fetchRESTAPIServer(this.getCashierURL());
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