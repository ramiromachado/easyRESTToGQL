const _ = require("lodash");

module.exports = () => {

    const quantityClients = 100;
    const quantityProducts = 100;
    const quantityPayments = 100;
    const quantityInvoice = 100;
    const avgDiffItemsPerInvoice = 2;
    const avgDiffPaymentsPerInvoice = 2;

    const data = {
        invoices: [],
        products: [],
        clients: [],
        payments: []
    };

    // Clients
    for (let i = 0; i < quantityClients; i++) {
        data.clients.push({ id: `CL-${i}`, name: `Client #${i}` });
    }

    // Products
    for (let i = 0; i < quantityProducts; i++) {
        data.products.push({ id: `PR-${i}`, name: `Product #${i}`, value: (Math.random() * 100 + 0.5) });
    }

    // Payments
    for (let i = 0; i < quantityPayments; i++) {
        const method = Math.floor(Math.random() * 2) ? "CASH" : "CREDITCARD";
        data.payments.push({ id: `PY-${i}`, method, amount: (Math.random() * 100 + 0.5) });
    }

    const paymentsNotUsed = [...data.payments].map(payment => payment.id);
    // Invoice
    for (let i = 0; i < quantityInvoice; i++) {
        const productsIndices = _.uniq((Array.from(Array(Math.floor(Math.random() * 10)).keys())).map(_ => Math.floor(Math.random() * avgDiffItemsPerInvoice * 2)));
        const items = productsIndices.map(index => ({
            productId: data.products[index].id,
            quantity: Math.floor(Math.random() * 5 + 1)
        }));
        const total = items.reduce((acumm, item) => {
            const individualValue = data.products.find(product => product.id === item.productId).value;
            const itemValue = individualValue * item.quantity;
            return acumm + itemValue;
        }, 0);

        const paymentsQuantity = Math.floor(Math.random() * avgDiffPaymentsPerInvoice * 2);
        const paymentIds = paymentsNotUsed.splice(0, paymentsQuantity);

        const clientId = data.clients[Math.floor(Math.random() * quantityClients)].id;
        data.invoices.push({ id: `IN-${i}`, total, items, clientId, paymentIds });
    }

    return data
};