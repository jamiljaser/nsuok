// https://stackoverflow.com/questions/35237862/best-way-to-handle-overflowing-reveal-js-slide
// makes a scrollable slide -- listens for the associated CSS in reveal.scss

function resetSlideScrolling(slide) {
    slide.classList.remove('scrollable-slide');
}

function handleSlideScrolling(slide) {
    if (slide.scrollHeight >= 800) {
        slide.classList.add('scrollable-slide');
    }
}

Reveal.addEventListener('ready', function (event) {
    handleSlideScrolling(event.currentSlide);
});

Reveal.addEventListener('slidechanged', function (event) {
    if (event.previousSlide) {
        resetSlideScrolling(event.previousSlide);
    }
    handleSlideScrolling(event.currentSlide);
});
