const { Server, Fields, Entities} = require('../../src/index');
const { StringField, FloatField, ObjectArrayField, ReferenceField, ArrayReferenceField } = Fields;
const { Entity } = Entities;

const RESTAPIServerPath = "http://localhost:3000";

const invoiceId = new StringField("id");
const invoiceTotal = new FloatField("total");
const invoiceClientId = new ReferenceField("clientId").setAlias("client");
const items = new ObjectArrayField("items");
const paymentIds = new ArrayReferenceField("paymentIds").setAlias("payments");
const invoiceFields = [invoiceId, invoiceTotal, invoiceClientId, items, paymentIds];
const invoice = new Entity("Invoice", `${RESTAPIServerPath}/invoices`, invoiceFields);

const productId = new StringField("id");
const productName = new StringField("name");
const productValue = new FloatField("value");
const productFields = [productId, productName, productValue];
const product = new Entity("Product", `${RESTAPIServerPath}/products`, productFields);

const paymentId = new StringField("id");
const paymentMethod = new StringField("method");
const paymentValue = new FloatField("value");
const paymentFields = [paymentId, paymentMethod, paymentValue];
const payment = new Entity("Payment", `${RESTAPIServerPath}/payments`, paymentFields);


const clientId = new StringField("id");
const clientName = new StringField("name");
const clientFields = [clientId, clientName];
const client = new Entity("Client", `${RESTAPIServerPath}/clients`, clientFields);

invoice.referenceBy(payment,"paymentIds", "id");
invoice.referenceBy(client, "clientId", "id");

const server = new Server("4001", [invoice, product, client, payment]);
server.start();
