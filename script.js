// Touch-friendly flip + navbar scroll state
// (function(){
// 	const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
// 	const cards = document.querySelectorAll('.product-section .card');

	// Enable tap to flip on touch devices and keyboard toggles for accessibility
	// if(cards.length) {
	// 	if(isTouch) {
	// 		cards.forEach(card => {
	// 			card.addEventListener('click', function(e){
	// 				if (e.target.closest('a')) return; // don't toggle when clicking interactive children
	// 				this.classList.toggle('is-flipped');
	// 			});
	// 			card.addEventListener('keydown', function(e){
	// 				if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.classList.toggle('is-flipped'); }
	// 				if(e.key === 'Escape') { this.classList.remove('is-flipped'); }
	// 			});
	// 		});
	// 	} else {
	// 		// For pointer devices we still add keyboard support
	// 		cards.forEach(card => {
	// 			card.addEventListener('keydown', function(e){
	// 				if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.classList.toggle('is-flipped'); }
	// 				if(e.key === 'Escape') { this.classList.remove('is-flipped'); }
	// 			});
	// 		});
	// 	}
	// }

	// NAVBAR: toggle dark background when scrolled
	// function setupNavbarScroll() {
	// 	const nav = document.getElementById('mainNav') || document.querySelector('nav.navbar');
	// 	if(!nav) return;

	// 	const SCROLL_THRESHOLD = 100; // px

	// 	function update() {
	// 		if(window.scrollY > SCROLL_THRESHOLD) nav.classList.add('nav-scrolled');
	// 		else nav.classList.remove('nav-scrolled');
	// 	}

	// 	// run on load and on scroll
	// 	update();
	// 	window.addEventListener('scroll', update, { passive: true });
	// }

	// // initialize when DOM ready
	// if(document.readyState === 'loading') {
	// 	document.addEventListener('DOMContentLoaded', setupNavbarScroll);
	// } else {
	// 	setupNavbarScroll();
	// }

// })();
