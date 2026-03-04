let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

const container = document.getElementById("productsContainer");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const searchInput = document.getElementById("searchInput");

/* RENDER PRODUCTS */
function renderProducts() {
    container.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();

    products
        .filter(p => p.name.toLowerCase().includes(searchValue))
        .forEach(product => {

            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image || 'https://via.placeholder.com/250'}">
                <h3>${product.name}</h3>
                <p>Seller: ${product.farmerName || "Farmer"}</p>
                <p>KSh ${product.price}</p>
                <p class="status ${product.status === "Sold" ? "sold" : "available"}">
                    ${product.status}
                </p>
                ${
                    product.status === "Available"
                    ? `<button onclick="addToCart(${product.id})">Add to Cart</button>`
                    : `<button disabled>Sold</button>`
                }
            `;

            container.appendChild(card);
        });
}

/* CART FUNCTIONS */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(product && product.status === "Available") {
        cart.push(product);
        updateCart();
    }
}

function updateCart() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${item.name} - KSh ${item.price}</p>`;
        cartItems.appendChild(div);
    });
}

function toggleCart() {
    cartSidebar.classList.toggle("active");
}

function checkout() {
    alert("Checkout successful!");
    cart = [];
    updateCart();
    toggleCart();
}

/* SEARCH */
searchInput.addEventListener("input", renderProducts);

/* CAROUSEL AUTO SLIDE */
let slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}, 3000);

renderProducts();