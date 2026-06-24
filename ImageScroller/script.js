// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DOM Elements
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const autoplayBtn = document.getElementById('autoplayBtn');

    // 2. Carousel State Variables
    let currentIndex = 0;              // Start at the first image (index 0)
    const totalSlides = dots.length;    // Total number of slides (4 in this case)
    let isPlaying = true;               // Track if autoplay is active
    let autoplayInterval = null;        // Store the timer ID for setInterval

    // 3. Update Slider Position & Indicator Dots
    function updateSlider() {
        // Move the track horizontally: 0% for slide 1, -100% for slide 2, -200% for slide 3, etc.
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update the active state of dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 4. Slide Navigation Functions
    function nextSlide() {
        // Go to the next slide. Wrap back to 0 if we reach the end.
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        // Go to the previous slide. Wrap to the last slide if we go below 0.
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // 5. Autoplay Management
    function startAutoplay() {
        // Run nextSlide every 3000ms (3 seconds)
        autoplayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoplay() {
        // Clear the timer so slides stop shifting automatically
        clearInterval(autoplayInterval);
    }

    function resetAutoplayTimer() {
        // Helper: If autoplay is active, restart the timer so manual navigation doesn't feel interrupted
        if (isPlaying) {
            stopAutoplay();
            startAutoplay();
        }
    }

    // 6. Click Event Listeners
    
    // Left arrow button click
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplayTimer();
    });

    // Right arrow button click
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplayTimer();
    });

    // Indicator dots click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplayTimer();
        });
    });

    // Play/Pause button click
    autoplayBtn.addEventListener('click', () => {
        if (isPlaying) {
            // If playing, stop it and update text
            stopAutoplay();
            isPlaying = false;
            autoplayBtn.textContent = 'Play Autoplay';
        } else {
            // If paused, start it and update text
            startAutoplay();
            isPlaying = true;
            autoplayBtn.textContent = 'Pause Autoplay';
        }
    });

    // 7. Initialize Carousel
    updateSlider();    // Align starting positions
    startAutoplay();   // Start moving automatically
});
