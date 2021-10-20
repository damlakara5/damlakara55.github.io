"use strict";
// Sticky navigation: Intersection Observer API
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const section1 = document.querySelector("#section--1");
const labelTimer = document.querySelector(".timer");
const indirim = document.querySelector(".indirim");
const containerIndirim = document.querySelector(".container--indirim");
const indirimHeight = containerIndirim.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the offset position of the navbar
const stickyIndirim = indirim.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset < stickyIndirim) {
    indirim.classList.add("container--indirim-sticky");
  } else {
    indirim.classList.remove("container--indirim-sticky");
  }
}

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//link animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest("nav").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener("mouseover", function (e) {
  //mouseover like hover . mouseenter dan farkı mouseenter da bubble yok
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//////FAQ
let button = document.querySelectorAll(".question");
let arrow = document.querySelectorAll(".arrow");
let answwerList = document.querySelectorAll(".answer");

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function (event) {
    let x = event.target;
    let answer = this.nextElementSibling;
    for (let i = 0; i < answwerList.length; i++) {
      answwerList[i] !== answer
        ? answwerList[i].classList.add("hidden")
        : console.log();
    }

    answer.classList.toggle("hidden");
    /*     answer.classList.contains("hidden")
      ? answer.classList.remove("hidden")
      : answer.classList.add("hidden"); */

    arrow[i].classList.contains("rotate")
      ? arrow[i].classList.remove("rotate")
      : arrow[i].classList.add("rotate");

    for (let j = 0; j < button.length; j++) {
      if (button[j] === x) {
        x.classList.contains("bold")
          ? x.classList.remove("bold")
          : x.classList.add("bold");
      } else {
        button[j].classList.remove("bold");
      }
    }
  });
}

/* // Set the date we're counting down to
var countDownDate = new Date("Oct 27, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  labelTimer.textContent =
    days + " g " + hours + " s " + minutes + " dk " + seconds + "s  ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000); */

const startLogOutTimer = function () {
  const tick = function () {
    const day = String(Math.trunc(time / (60 * 60 * 24))).padStart(2, 0);
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    const hour = String(Math.trunc(time / (60 * 60) - day / 24) % 24).padStart(
      2,
      0
    );
    min = min % 60;
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${day}:${hour}:${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      time = 432000;
    }

    // Decrease 1s
    time--;
  };

  // Set time to   saniye
  let time = 432000;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

startLogOutTimer();
