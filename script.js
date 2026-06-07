let cart = [];

function showMessage() {
    document.getElementById("message").innerText =
        "Thank you for visiting Green Haven Nursery! 🌿";
}

function loginUser(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("loginMessage");

    if (username === "admin" && password === "1234") {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        message.innerText = "Invalid username or password.";
    }
}

function checkLogin() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

function logoutUser() {
    sessionStorage.removeItem("loggedIn");
}

function addToCart(name, price) {

    let existingItem =
    cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        let image = "";

        if(name === "Red Bougainvillea"){
            image = "images/bougainvillea.jpg";
        }

        if(name === "White Bougainvillea"){
            image = "images/bougainvillea-white.jpg";
        }

        if(name === "Yellow Bougainvillea"){
            image = "images/bougainvillea-yellow.jpg";
        }

        cart.push({
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
    }

    displayCart();
}

function displayCart() {

    let cartItems = document.getElementById("cartItems");
    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        document.getElementById("totalPrice").innerHTML =
            "Total: RM0";

        return;
    }

    let html = "";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        html += `
<div class="cart-item">

    <div class="cart-left">

        <img src="${item.image}"
             class="cart-image">

    </div>

    <div class="cart-info">

        <strong>${item.name}</strong>

        <br>

        RM${item.price}

        <br>

        Qty: ${item.quantity}

    </div>

    <div class="cart-buttons">

        <button onclick="increaseQty(${index})">
            +
        </button>

        <button onclick="decreaseQty(${index})">
            -
        </button>

        <button onclick="deleteItem(${index})">
            Delete
        </button>

    </div>

</div>
`;
    });

    cartItems.innerHTML = html;

    document.getElementById("totalPrice").innerHTML =
        "Total: RM" + total;
}

function increaseQty(index) {

    cart[index].quantity++;

    displayCart();
}

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;
    }

    displayCart();
}

function deleteItem(index) {

    cart.splice(index, 1);

    displayCart();
}

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "Order Successful! 🌿 Thank you for shopping with Green Haven Nursery."
    );

    cart = [];

    displayCart();
}

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("cartItems")) {

        displayCart();
    }
});
