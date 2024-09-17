// Client facing scripts here
$("#logo").on("click", () => {
  console.log("Clicked on logo");
})

// Client facing scripts here
$("#logo").on("click", () => {
  console.log("Clicked on logo");
})

$(document).ready(function() {
  const $carousel = $('.carousel');
  const $carouselSlide = $('.carousel-slide');
  const $prevButton = $('.prev');
  const $nextButton = $('.next');
  const slideWidth = $('.featuredMovieSlider').outerWidth(true);
  const totalSlides = $('.featuredMovieSlider').length;
  const visibleSlides = 5;
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * slideWidth;
    $carousel.css('transform', `translateX(${offset}px)`);
  }

  $prevButton.click(function() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - visibleSlides;
    }
    updateCarousel();
  });

  $nextButton.click(function() {
    if (currentIndex < totalSlides - visibleSlides) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    updateCarousel();
  });

  // Initialize carousel position
  updateCarousel();
});