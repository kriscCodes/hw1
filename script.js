document.addEventListener('DOMContentLoaded', function () {
	let slideIndex = 0;
	const slides = document.getElementsByClassName('slide');
	const dotsContainer = document.querySelector('.dots-container');


	updateCartCount();

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('span');
		dot.className = 'dot';
		dot.addEventListener('click', () => showSlides(i));
		dotsContainer.appendChild(dot);
	}

	const dots = document.getElementsByClassName('dot');

	
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
		if (slideIndex >= slides.length) slideIndex = 0;
		if (slideIndex < 0) slideIndex = slides.length - 1;

		slides[slideIndex].style.display = 'block';
		dots[slideIndex].classList.add('active');
	}

	// Add touch support for mobile
	let touchStartX = 0;
	let touchEndX = 0;

	const slideshowContainer = document.querySelector('.slideshow-container');

	slideshowContainer.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	slideshowContainer.addEventListener('touchend', (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		const swipeThreshold = 50;
		if (touchEndX < touchStartX - swipeThreshold) {
			showSlides(slideIndex + 1);
		}
		if (touchEndX > touchStartX + swipeThreshold) {
			showSlides(slideIndex + 1);
		}
	}

	//shopping car
	const addToCartButtons = document.querySelectorAll('.add-to-cart');
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', function () {
			const name = this.getAttribute('data-name');
			const price = this.getAttribute('data-price');
			const image = this.getAttribute('data-image');

			addToCart(name, price, image);

			
			this.textContent = 'Added!';
			this.style.backgroundColor = '#28a745';
			setTimeout(() => {
				this.textContent = 'Add to Cart';
				this.style.backgroundColor = '#4a1e00';
			}, 1000);
		});
	});
});

// Cart functionality (shared with cart.js)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
