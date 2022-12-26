let booksButton = document.querySelectorAll(".button-book");
let booksButtonHideCont = document.querySelectorAll(".books-card__hide-cont");
let closeBookButton = document.querySelectorAll(".close-books-card");
let arw;
booksButton.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    console.log(arw, index);
    if (arw) {
      booksButtonHideCont[arw].classList.remove(
        "books-card__hide-cont--active"
      );
    } else {
      booksButtonHideCont[0].classList.remove("books-card__hide-cont--active");
    }
    booksButtonHideCont[index].classList.add("books-card__hide-cont--active");
    arw = index;
    console.log(arw, index);
  });
});

closeBookButton.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    booksButtonHideCont[index - 1].classList.remove(
      "books-card__hide-cont--active"
    );
  });
});

let listLink = document.querySelectorAll(".header-nav__item-link");
let overflowNew = document.querySelector(".over-new");
let burgerButton = document.querySelector(".burger-button");
let sidebarClose = document.querySelector(".burger-button-close");
burgerButton.addEventListener("click", taggleButton);
let sidebar = document.querySelector(".header-nav");
function taggleButton() {
  this.classList.toggle("change");
  sidebar.classList.toggle("show");
  overflowNew.classList.add("active");
}

if (window.innerWidth < 1440) {
  listLink.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overflowNew.classList.remove("active");
    });
  });
}

overflowNew.addEventListener("click", () => {
  burgerButton.classList.remove("change");
  sidebar.classList.remove("show");
  overflowNew.classList.remove("active");
});

sidebarClose.addEventListener("click", () => {
  burgerButton.classList.remove("change");
  sidebar.classList.remove("show");
  overflowNew.classList.remove("active");
});
document.querySelectorAll(".madal-cart__scroller").forEach((elem, index) => {
  new SimpleBar(elem);
});



document.querySelectorAll(".books-card__scroll-box").forEach((elem, index) => {
  new SimpleBar(elem);
});

document.querySelectorAll(".inner-scroll").forEach((elem, index) => {
  new SimpleBar(elem);
});

document
  .querySelectorAll(".content-book-slider__text > div")
  .forEach((elem, index) => {
    new SimpleBar(elem);
  });
class ChangerText {
  constructor(config) {
    this.selector = config.selector;
    this.text = config.text;
    this.changeText = config.changeText;
    this.init();
  }
  actChange(elem) {
    switch (elem.textContent) {
      case this.changeText:
        elem.textContent = this.text;
        break;
      case this.text:
        elem.textContent = this.changeText;
        break;
    }
  }
  init() {
    document.querySelectorAll(this.selector).forEach((elem, index) => {
      elem.textContent = this.text;
      elem.addEventListener("click", () => {
        this.actChange(elem);
      });
    });
  }
}

new ChangerText({
  selector: ".btn-expand",
  text: "Прочесть далее",
  changeText: "Свернуть",
});
new ChangerText({
  selector: ".btn-expands",
  text: "Развернуть еще",
  changeText: "Свернуть",
});

const newsSlider = new Swiper(".news-slider", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".news-slider-next",
    prevEl: ".news-slider-prev",
  },
  grabCursor: true,
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    1200: {
      spaceBetween: 30,
    },
  },
});

const reviewsSlider = new Swiper(".reviews-slider", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".reviews-slider-next",
    prevEl: ".reviews-slider-prev",
  },
  grabCursor: true,
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    768: {
      spaceBetween: 30,
    },
  },
});
const contentBookSlider = new Swiper(".content-book-slider", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".content-book-slider-next",
    prevEl: ".content-book-slider-prev",
  },
  grabCursor: true,
  
});


const contentBookBtnSlider = new Swiper(".content-book-btn-slider", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".content-book-btn-slider-next",
    prevEl: ".content-book-btn-slider-prev",
  },
  grabCursor: true,
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    768: {
      spaceBetween: 30,
    },
  },
});

const topSectionSlider = new Swiper(".top-section-slider", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".top-section-slider-next",
    prevEl: ".top-section-slider-prev",
  },
  grabCursor: true,
  
});

const reviewsVideo = new Swiper(".reviews-video-slider", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".reviews-video-next",
    prevEl: ".reviews-video-prev",
  },
  grabCursor: true,
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    768: {
      spaceBetween: 30,
    },
  },
});

class Parallax {
  constructor(elements) {
    this.wrapper = elements.wrapper;
    this.layers = elements.layers;
    this.scale = elements.scale;
    this._init();
  }
  calculateParallax(event) {
    const parallaxLeftOffset = this.wrapper.getBoundingClientRect().left;
    const parallaxTopOffset = this.wrapper.getBoundingClientRect().top;
    const coordX =
      event.clientX - parallaxLeftOffset - 0.5 * this.wrapper.offsetWidth;
    const coordY =
      event.clientY - parallaxTopOffset - 0.5 * this.wrapper.offsetHeight;
    this.layers.forEach((layer) => {
      const layerSpeed = layer.dataset.speed;
      const x = -(coordX * layerSpeed).toFixed(2);
      const y = -(coordY * layerSpeed).toFixed(2);
      layer.setAttribute(
        "style",
        `transform: translate(${x}px, ${y}px) ${
          this.scale ? `scale(${this.scale})` : ""
        };transition: .1s ease`
      );
    });
  }
  reset(e) {
    this.layers.forEach((layer) => {
      layer.setAttribute(
        "style",
        `transform: translate(0px, 0px);transition: .1s ease`
      );
    });
  }
  _init() {
    console.log(this.wrapper, this.layers);

    this.wrapper.addEventListener("mousemove", (e) => {
      this.calculateParallax(e);
    });
    this.wrapper.addEventListener("mouseout", (e) => {
      this.reset(e);
    });
  }
}

new Parallax({
  wrapper: document.querySelector(".top-section"),
  layers: document.querySelectorAll(".top-section-block__image"),
});

if (window.innerWidth > 992) {
  new Parallax({
    wrapper: document.querySelector(".form-news"),
    layers: document.querySelectorAll(".form-news__inner-image > img"),
  });
}

/* let elems = document.querySelectorAll(".news-block__bg-image")
document.querySelectorAll(".news .swiper-slide").forEach((elem, index) => {

  new Parallax({
  wrapper: elem,
  layers: elems[index],
  scale: 1.1,
});
}) */

class ItcTabs {
  constructor(target, config) {
    const defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs =
      typeof target === "string" ? document.querySelector(target) : target;
    this._elButtons = this._elTabs.querySelectorAll(".tabs__btn");
    this._elPanes = this._elTabs.querySelectorAll(".tabs__pane");
    this._eventShow = new Event("tab.itc.change");
    this._init();
    this._events();
  }
  _init() {
    this._elTabs.setAttribute("role", "tablist");
    this._elButtons.forEach((el, index) => {
      el.dataset.index = index;
      el.setAttribute("role", "tab");
      this._elPanes[index].setAttribute("role", "tabpanel");
    });
  }
  show(elLinkTarget) {
    const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this._elTabs.querySelector(".tabs__btn--active");
    const elPaneShow = this._elTabs.querySelector(".tabs__pane--show");
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove("tabs__btn--active") : null;
    elPaneShow ? elPaneShow.classList.remove("tabs__pane--show") : null;
    elLinkTarget.classList.add("tabs__btn--active");
    elPaneTarget.classList.add("tabs__pane--show");
    this._elTabs.dispatchEvent(this._eventShow);
    elLinkTarget.focus();
  }
  showByIndex(index) {
    const elLinkTarget = this._elButtons[index];
    elLinkTarget ? this.show(elLinkTarget) : null;
  }
  _events() {
    this._elTabs.addEventListener("click", (e) => {
      const target = e.target.closest(".tabs__btn");
      if (target) {
        e.preventDefault();
        this.show(target);
      }
    });
  }
}

const tabsRev = document.querySelectorAll(".tabs");
tabsRev.forEach((el, index) => {
  new ItcTabs(tabsRev[index]);
});
const tabsBooks = document.querySelectorAll(".tabs-books");
tabsBooks.forEach((el, index) => {
  new ItcTabs(tabsBooks[index]);
});

const contentBook = document.querySelectorAll(".content-book");
contentBook.forEach((el, index) => {
  new ItcTabs(contentBook[index]);
});
