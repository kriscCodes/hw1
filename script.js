document.addEventListener('DOMContentLoaded', function () {
	let slideIndex = 0;
	const slides = document.getElementsByClassName('slide');
	const dotsContainer = document.querySelector('.dots-container');

	// Create dots
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('span');
		dot.className = 'dot';
		dot.addEventListener('click', () => showSlides(i));
		dotsContainer.appendChild(dot);
	}

	const dots = document.getElementsByClassName('dot');

	// Show first slide
	showSlides(slideIndex);

	// Add event listeners to buttons
	document.querySelector('.prev').addEventListener('click', () => {
		showSlides(slideIndex - 1);
	});

	document.querySelector('.next').addEventListener('click', () => {
		showSlides(slideIndex + 1);
	});

	// Auto advance slides every 5 seconds
	setInterval(() => {
		showSlides(slideIndex + 1);
	}, 5000);

	function showSlides(n) {
		// Hide all slides
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
			dots[i].classList.remove('active');
		}

		// Update slide index
		slideIndex = n;
		if (slideIndex >= slides.length) slideIndex = 0;
		if (slideIndex < 0) slideIndex = slides.length - 1;

		// Show current slide and activate corresponding dot
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
			// Swipe left
			showSlides(slideIndex + 1);
		}
		if (touchEndX > touchStartX + swipeThreshold) {
			// Swipe right
			showSlides(slideIndex - 1);
		}
	}
});
