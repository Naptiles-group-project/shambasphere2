// Simulated multi-farmer data
let farmers = [
    {
        name: 'Farmer John',
        produce: [],
        orders: []
    },
    {
        name: 'Farmer Mary',
        produce: [],
        orders: []
    }
];

// Logged-in farmer index (simulate login)
let loggedInFarmerIndex = 0; // Change to 1 for Farmer Mary

// DOM Elements
const addProduceForm = document.getElementById('add-produce-form');
const produceList = document.getElementById('produce-list');
const marketplaceList = document.getElementById('marketplace-list');
const ordersList = document.getElementById('orders-list');

const totalListingsEl = document.getElementById('total-listings');
const totalOrdersEl = document.getElementById('total-orders');
const totalIncomeEl = document.getElementById('total-income');

// ===== Add Produce =====
addProduceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = addProduceForm[0].value;
    const quantity = parseFloat(addProduceForm[1].value);
    const price = parseFloat(addProduceForm[2].value);
    const image = addProduceForm[3].value || 'https://via.placeholder.com/200x120.png?text=Produce';

    const newProduce = {name, quantity, price, image};
    farmers[loggedInFarmerIndex].produce.push(newProduce);

    addProduceForm.reset();
    renderProduce();
    renderMarketplace();
    updateStats();
});

// ===== Render Farmer Listings =====
function renderProduce() {
    const farmer = farmers[loggedInFarmerIndex];
    produceList.innerHTML = '';
    farmer.produce.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'produce-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Qty: ${item.quantity} kg</p>
            <p>Price: KSh ${item.price}/kg</p>
            <button class="edit-btn" onclick="editProduce(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteProduce(${index})">Delete</button>
        `;
        produceList.appendChild(card);
    });
}

// ===== Render Marketplace =====
function renderMarketplace() {
    marketplaceList.innerHTML = '';
    farmers.forEach((farmer) => {
        farmer.produce.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'produce-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity} kg</p>
                <p>Price: KSh ${item.price}/kg</p>
                <p><strong>Farmer:</strong> ${farmer.name}</p>
            `;
            marketplaceList.appendChild(card);
        });
    });
}

// ===== Render Orders =====
function renderOrders() {
    const farmer = farmers[loggedInFarmerIndex];
    ordersList.innerHTML = '';
    if(farmer.orders.length === 0){
        ordersList.innerHTML = '<p>No orders yet.</p>';
        return;
    }
    farmer.orders.forEach((order, index) => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
            <p><strong>Produce:</strong> ${order.produceName}</p>
            <p><strong>Quantity:</strong> ${order.quantity} kg</p>
            <p><strong>Price per kg:</strong> KSh ${order.price}</p>
            <p><strong>Buyer:</strong> ${order.buyerName || 'Anonymous'}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            ${order.status === 'Pending' ? `<button class="accept-btn" onclick="acceptOrder(${index})">Accept</button>
            <button class="reject-btn" onclick="rejectOrder(${index})">Reject</button>` : ''}
        `;
        ordersList.appendChild(card);
    });
}

// ===== Accept / Reject Orders =====
function acceptOrder(index) {
    farmers[loggedInFarmerIndex].orders[index].status = 'Accepted';
    renderOrders();
    updateStats();
}

function rejectOrder(index) {
    farmers[loggedInFarmerIndex].orders[index].status = 'Rejected';
    renderOrders();
    updateStats();
}

// ===== Edit / Delete Produce =====
function editProduce(index) {
    const farmer = farmers[loggedInFarmerIndex];
    const item = farmer.produce[index];
    const newName = prompt("Edit Produce Name:", item.name) || item.name;
    const newQuantity = prompt("Edit Quantity (kg):", item.quantity) || item.quantity;
    const newPrice = prompt("Edit Price (KSh):", item.price) || item.price;
    const newImage = prompt("Edit Image URL:", item.image) || item.image;

    farmer.produce[index] = {name: newName, quantity: newQuantity, price: newPrice, image: newImage};
    renderProduce();
    renderMarketplace();
    updateStats();
}

function deleteProduce(index) {
    const farmer = farmers[loggedInFarmerIndex];
    if(confirm("Are you sure you want to delete this produce?")) {
        farmer.produce.splice(index,1);
        renderProduce();
        renderMarketplace();
        renderOrders();
        updateStats();
    }
}

// ===== Dashboard Stats =====
function updateStats() {
    const farmer = farmers[loggedInFarmerIndex];
    totalListingsEl.innerText = farmer.produce.length;
    totalOrdersEl.innerText = farmer.orders.length;

    const income = farmer.orders
        .filter(o => o.status === 'Accepted')
        .reduce((acc,o) => acc + (o.quantity*o.price), 0);
    totalIncomeEl.innerText = `KSh ${income}`;
}

// Initial render
renderProduce();
renderMarketplace();
renderOrders();
updateStats();