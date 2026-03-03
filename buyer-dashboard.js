// Use the same farmers array
let buyerOrders = [];

const marketplaceList = document.getElementById('marketplace-list');
const ordersList = document.getElementById('orders-list');

// Render marketplace
function renderMarketplace() {
    marketplaceList.innerHTML = '';
    farmers.forEach((farmer, farmerIndex) => {
        farmer.produce.forEach((item, produceIndex) => {
            const card = document.createElement('div');
            card.className = 'produce-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>Qty Available: ${item.quantity} kg</p>
                <p>Price: KSh ${item.price}/kg</p>
                <p><strong>Farmer:</strong> ${farmer.name}</p>
                <button onclick="placeOrder(${farmerIndex}, ${produceIndex})">Place Order</button>
            `;
            marketplaceList.appendChild(card);
        });
    });
}

// Place an order
function placeOrder(farmerIndex, produceIndex) {
    const farmer = farmers[farmerIndex];
    const item = farmer.produce[produceIndex];

    let orderQty = parseInt(prompt(`Enter quantity to order for ${item.name} (max ${item.quantity} kg):`, 1));
    if(!orderQty || orderQty < 1 || orderQty > item.quantity){
        alert('Invalid quantity.');
        return;
    }

    const order = {
        produceName: item.name,
        quantity: orderQty,
        price: item.price,
        farmerName: farmer.name,
        status: 'Pending',
        buyerName: 'Buyer 1' // Simulate buyer identity
    };

    buyerOrders.push(order);
    farmer.orders.push({...order});

    alert(`Order placed for ${order.quantity} kg of ${order.produceName} from ${order.farmerName}!`);
    renderOrders();
}

// Render buyer orders
function renderOrders() {
    ordersList.innerHTML = '';
    if(buyerOrders.length === 0){
        ordersList.innerHTML = '<p>No orders yet.</p>';
        return;
    }

    buyerOrders.forEach((order) => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
            <p><strong>Produce:</strong> ${order.produceName}</p>
            <p><strong>Quantity:</strong> ${order.quantity} kg</p>
            <p><strong>Price per kg:</strong> KSh ${order.price}</p>
            <p><strong>Farmer:</strong> ${order.farmerName}</p>
            <p><strong>Status:</strong> ${order.status}</p>
        `;
        ordersList.appendChild(card);
    });
}

// Initial render
renderMarketplace();
renderOrders();