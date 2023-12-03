/**
 * Filename: advanced_image_slider.js
 * Content: A sophisticated and complex image slider with advanced functionality.
 */

// Global variables
const SLIDE_DURATION = 3000; // Time in milliseconds for each slide to stay visible
let currentSlideIndex = 0;
let slideTimer;

// DOM elements
const sliderContainer = document.getElementById('slider-container');
const slides = document.getElementsByClassName('slide');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const playPauseButton = document.getElementById('play-pause-button');

// Function to show slide at given index
const showSlide = (index) => {
  slides[currentSlideIndex].classList.remove('active');
  slides[index].classList.add('active');
  currentSlideIndex = index;
};

// Function to handle previous button click
const prevButtonClickHandler = () => {
  const newIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
  showSlide(newIndex);
};

// Function to handle next button click
const nextButtonClickHandler = () => {
  const newIndex = currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
  showSlide(newIndex);
};

// Function to handle play/pause button click
const playPauseButtonClickHandler = () => {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
    playPauseButton.textContent = 'Play';
  } else {
    slideTimer = setInterval(() => {
      const newIndex = currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
      showSlide(newIndex);
    }, SLIDE_DURATION);
    playPauseButton.textContent = 'Pause';
  }
};

// Event listeners
prevButton.addEventListener('click', prevButtonClickHandler);
nextButton.addEventListener('click', nextButtonClickHandler);
playPauseButton.addEventListener('click', playPauseButtonClickHandler);

// Automatically start the slider
slideTimer = setInterval(() => {
  const newIndex = currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
  showSlide(newIndex);
}, SLIDE_DURATION);

// Pause slider when hovering over it
sliderContainer.addEventListener('mouseover', () => {
  clearInterval(slideTimer);
  slideTimer = null;
});

// Resume slider when not hovering over it
sliderContainer.addEventListener('mouseout', () => {
  if (!slideTimer) {
    slideTimer = setInterval(() => {
      const newIndex = currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
      showSlide(newIndex);
    }, SLIDE_DURATION);
  }
});

// Initially show the first slide
showSlide(0);