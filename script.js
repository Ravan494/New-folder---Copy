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

	// Tractor: move tractor image smoothly from dot to dot while scrolling
	(function(){
		function initTractor() {
			const timeline = document.querySelector('.process-timeline');
			const dots = Array.from(document.querySelectorAll('.dot'));
			const tactorImg = document.querySelector('.tactor img');
			if(!timeline || !dots.length || !tactorImg) return;

			let ticking = false;
			let lastScrollY = window.scrollY || 0;
			let scrollingDown = false;

			function getTractorPosition() {
				const viewportMid = window.innerHeight / 2;
				let closestAbove = null;
				let closestBelow = null;
				let minDistAbove = Infinity;
				let minDistBelow = Infinity;

				dots.forEach(dot => {
					const r = dot.getBoundingClientRect();
					const dotMidViewport = r.top + r.height / 2;
					const dist = dotMidViewport - viewportMid;

					if(dist >= 0 && dist < minDistBelow) {
						minDistBelow = dist;
						closestBelow = dot;
					}
					if(dist <= 0 && -dist < minDistAbove) {
						minDistAbove = -dist;
						closestAbove = dot;
					}
				});

				// If we have both above and below, interpolate smoothly between them
				if(closestAbove && closestBelow) {
					const aboveRect = closestAbove.getBoundingClientRect();
					const belowRect = closestBelow.getBoundingClientRect();

					const aboveCenterPageY = aboveRect.top + window.scrollY + aboveRect.height/2;
					const belowCenterPageY = belowRect.top + window.scrollY + belowRect.height/2;
					const timelineTopPageY = timeline.getBoundingClientRect().top + window.scrollY;

					const aboveInTimeline = aboveCenterPageY - timelineTopPageY;
					const belowInTimeline = belowCenterPageY - timelineTopPageY;

					// Interpolation factor based on viewport position
					const totalDist = minDistAbove + minDistBelow;
					const factor = minDistAbove / totalDist;

					const interpolatedY = aboveInTimeline + (belowInTimeline - aboveInTimeline) * factor;
					return interpolatedY;
				}

				// Fallback: jump to nearest dot
				let closest = closestBelow || closestAbove;
				if(closest) {
					const dotRect = closest.getBoundingClientRect();
					const dotCenterPageY = dotRect.top + window.scrollY + dotRect.height/2;
					const timelineTopPageY = timeline.getBoundingClientRect().top + window.scrollY;
					return dotCenterPageY - timelineTopPageY;
				}

				return 0;
			}

			function updateTractorPosition() {
				const translateY = getTractorPosition();
				const imgH = tactorImg.getBoundingClientRect().height || tactorImg.naturalHeight || 50;
				const finalY = Math.round(translateY - imgH/2);
				// Apply flip based on scroll direction
				const scaleX = scrollingDown ? 1 : -1;
				tactorImg.style.transform = `translate(-50%, ${finalY}px) scaleY(${scaleX})`;
			}

			function onScroll() {
				const currentScroll = window.scrollY || 0;
				scrollingDown = currentScroll > lastScrollY;
				lastScrollY = currentScroll;

				if(!ticking) {
					window.requestAnimationFrame(() => { 
						updateTractorPosition(); 
						ticking = false; 
					});
					ticking = true;
				}
			}

			window.addEventListener('scroll', onScroll, { passive: true });
			window.addEventListener('resize', () => updateTractorPosition());
			// initial placement
			updateTractorPosition();
		}

		if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTractor);
		else initTractor();

	})();
