const sliderWrap = document.querySelector('.slider_wrapper');
const sliderLine = document.querySelector('.slider_line');
const sliderBlock = document.querySelectorAll('.slider_body');
const sliderNext = document.querySelector('.slider_next');
const sliderPrev = document.querySelector('.slider_prev');
const lines = document.querySelectorAll('.line_pic');


let count = 0;
let sliderWidth = sliderWrap.offsetWidth;

sliderNext.addEventListener('click', nextSlide);
sliderPrev.addEventListener('click', prevSlide);

let sliderTimer = setInterval(() => {
    nextSlide()
}, 5000);

function nextSlide() {
    count ++;
    if (count >= sliderBlock.length) {
        count = 0;
    }
    moveSlider();
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
        nextSlide()
    }, 5000);
}

function prevSlide() {
    count --;
    if (count < 0) {
        count = sliderBlock.length - 1;
    }
    moveSlider();
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
        nextSlide()
    }, 5000);
}

function moveSlider() {
    sliderLine.style.transform = `translateX(${-count * sliderWidth}px)`;
    lines.forEach((line, index) => {
        line.classList.toggle('active_slider', index === count);
    });
}

let start = 0;
let end = 0;

sliderWrap.addEventListener('touchstart', (event) => {
    start = event.touches[0].clientX;
});
sliderWrap.addEventListener('touchmove', (event) => {
    if (!start) { 
      return;
    }
    end = event.touches[0].clientX;
});
sliderWrap.addEventListener('touchend', () => {
    if ((end - start) > 0) {
              prevSlide();
            }
    else {
                nextSlide();
            }
});
sliderWrap.addEventListener('mouseover', () => {
    clearInterval(sliderTimer);
    lines.forEach((line, index) => {
        line.classList.add('paused', index === count);
    });
});
sliderWrap.addEventListener('mouseleave', () => {
    sliderTimer = setInterval(() => {
        nextSlide()
    }, 5000);
    lines.forEach((line, index) => {
        line.classList.remove('paused', index === count);
    });
});
