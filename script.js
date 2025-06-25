// Slideshow setup
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');
const dotsContainer = document.querySelector('.dots-container');

updateCartCount();

// dots on the sldiehow
for (let i = 0; i < slides.length; i++) {
	const dot = document.createElement('span');
	dot.className = 'dot';
	dot.addEventListener('click', () => showSlides(i));
	dotsContainer.appendChild(dot);
}

const dots = document.getElementsByClassName('dot');

// Show first slide
showSlides(slideIndex);

document.querySelector('.prev').addEventListener('click', () => {
	showSlides(slideIndex - 1);
});

document.querySelector('.next').addEventListener('click', () => {
	showSlides(slideIndex + 1);
});

setInterval(() => {
	showSlides(slideIndex + 1);
}, 5000);

function showSlides(n) {
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
		dots[i].classList.remove('active');
	}

	slideIndex = n;
	if (slideIndex >= slides.length) {
		slideIndex = 0;
	}
	if (slideIndex < 0) {
		slideIndex = slides.length - 1;
	}

	slides[slideIndex].style.display = 'block';
	dots[slideIndex].classList.add('active');
}

// Shopping cart functions and set up
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const name = this.getAttribute('data-name');
		const price = this.getAttribute('data-price');
		const image = this.getAttribute('data-image');

		addToCart(name, price, image);

		// Show feedback to make it clear the iteam has been added
		this.textContent = 'Added!';
		this.style.backgroundColor = '#28a745';
		setTimeout(() => {
			this.textContent = 'Add to Cart';
			this.style.backgroundColor = '#4a1e00';
		}, 1000);
	});
});

// Cart functions and setup
//using local storage to kinda emulate a more traditonal expereince
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
	const existingItem = cart.find(function (item) {
		return item.name === name;
	});

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
	updateCartCount();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
	const cartCount = document.querySelector('.cart-count');
	if (cartCount) {
		const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
		cartCount.textContent = totalItems;
	}
}
