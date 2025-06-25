// Cart functionality simialr to what we have in script
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Iset up page with proper valyes
renderCart();

document.getElementById('clear-cart').addEventListener('click', clearCart);


function addToCart(name, price, image) {
	const existingItem = cart.find((item) => item.name === name);

	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		cart.push({
			name: name,
			price: parseFloat(price),
			image: image,
			quantity: 1,
		});
	}

	saveCart();
}

function removeFromCart(name) {
	cart = cart.filter((item) => item.name !== name);
	saveCart();
	renderCart();
}


function updateQuantity(name, change) {
	const item = cart.find((item) => item.name === name);
	if (item) {
		item.quantity += change;
		if (item.quantity <= 0) {
			removeFromCart(name);
		} else {
			saveCart();
			renderCart();
		}
	}
}


function clearCart() {
	cart = [];
	saveCart();
	renderCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}


function calculateTotal() {
	return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Render cart items for the page
function renderCart() {
	const cartItemsContainer = document.getElementById('cart-items');
	const cartContainer = document.getElementById('cart-container');
	const emptyMessage = document.getElementById('empty-cart-message');
	const totalAmount = document.getElementById('total-amount');

	if (cart.length === 0) {
		cartContainer.style.display = 'none';
		emptyMessage.style.display = 'block';
		totalAmount.textContent = '0.00';
		return;
	}

	cartContainer.style.display = 'flex';
	emptyMessage.style.display = 'none';

	cartItemsContainer.innerHTML = '';

	cart.forEach((item) => {
		const cartItem = document.createElement('div');
		cartItem.className = 'cart-item';
		cartItem.innerHTML = `
            <img src="${item.image}" alt="${
			item.name
		}" class="cart-item-image" onerror="this.src='assets/images (2).png'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${
									item.name
								}', -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${
									item.name
								}', 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart('${
							item.name
						}')">Remove</button>
        `;
		cartItemsContainer.appendChild(cartItem);
	});

	totalAmount.textContent = calculateTotal().toFixed(2);
}


