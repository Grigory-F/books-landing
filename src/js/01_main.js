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
/* new SimpleBar(document.querySelector(".content-book-tabs")); */
document.querySelectorAll(".books-card__scroll-box").forEach((elem, index) => {
  new SimpleBar(elem);
});

document
  .querySelectorAll(".content-book-slider__text")
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
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    768: {
      spaceBetween: 30,
    },
  },
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

/* const wrapper = document.querySelector(".reviews-block");
const layers = document.querySelectorAll(".reviews-block__bg-image");

const handleParallax = (evt) => {
  const parallaxLeftOffset = wrapper.getBoundingClientRect().left;
  const parallaxTopOffset = wrapper.getBoundingClientRect().top;

  const coordX = evt.clientX - parallaxLeftOffset - 0.5 * wrapper.offsetWidth;
  const coordY = evt.clientY - parallaxTopOffset - 0.5 * wrapper.offsetHeight;
  console.log(coordX, coordY);
  layers.forEach((layer) => {
    const layerSpeed = layer.dataset.speed;
    const x = -(coordX * layerSpeed).toFixed(2);
    const y = -(coordY * layerSpeed).toFixed(2);
    layer.setAttribute(
      "style",
      `transform: translate(${x}px, ${y}px);transition: .1s ease`
    );
  });
};
 */
/* const reset = () => {
  layers.forEach((layer) => {
    layer.setAttribute(
      "style",
      `transform: translate(0px, 0px);transition: .1s ease`
    );
  });
}; */
/* 
wrapper.addEventListener("mousemove", handleParallax);
wrapper.addEventListener("mouseout", reset); */

/* class CollapseNewText extends Collapse {
  constructor(container, collapseElem, init) {
    super(container, collapseElem, init);
  }
}

class CollapseNewBox extends Collapse {
  constructor(container, collapseElem) {
    super(container, collapseElem);
    this.init();
  }
}

class Collapse {
  constructor(container, collapseElem) {
    this.container = container;
    this.collapseElem = collapseElem;
  }
  init() {
    if (!this.container && !this.collapseElem) {
      throw new Error("Add selectors");
    }
    this.container = document.querySelectorAll(this.container);
    this.collapseElem = document.querySelectorAll(this.collapseElem);
  }
}

function FactoryCollapse(type) {
  if (type === "text") {
    return new CollapseNewText({});
  } else {
    return new CollapseNewBox({});
  }
}

let ars = FactoryCollapse("text");
console.log(ars);

new CollapseNew(".reviews-block__inner-text"); */

class Parallax {
  constructor(elements) {
    this.wrapper = elements.wrapper || document.querySelector(elements.wrapper);
    this.layers = elements.layers || document.querySelectorAll(elements.layers);
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
        `transform: translate(${x}px, ${y}px);transition: .1s ease`
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
    if (!this.wrapper && !this.layers) {
      throw new Error("Add selectors");
    }
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

/* let scrollButton = document.querySelector(".upbtn");
let mainWrap = document.querySelector(".main");


let tarrifsContentMoreButton = document.querySelectorAll(
  ".tarrifs-content__more-button"
);
let tarrifsTableHidden = document.querySelectorAll(".tarrifs-table--hidden");

tarrifsContentMoreButton.forEach((tarrifsContentMoreButtonThis, index) => {
  tarrifsContentMoreButtonThis.addEventListener("click", () => {
    tarrifsTableHidden.forEach((elem, index) => {
      elem.classList.remove("tarrifs-table--hidden");

    });
    delButtons();
  });
});

function delButtons(params) {
  tarrifsContentMoreButton.forEach((elem, index) => {
    elem.classList.add("d-none");
  });
}

mainWrap.addEventListener("scroll", function (e) {
  if (mainWrap.scrollTop >= 500) {
    scrollButton.classList.add("upbtn--active");
  } else {
    scrollButton.classList.remove("upbtn--active");
  }
});

scrollButton.addEventListener("click", () => {
  mainWrap.scrollTo({ top: 0, behavior: "smooth" });
}); */

/* $(window).scroll(function () {
  if ($(this).scrollTop() > 500) {
      $('#upbtn').fadeIn();
  } else {
      $('#upbtn').fadeOut();
  }
});
$('#upbtn').click(function(){
  //window.scrollTo(0, 0);
  $("html, body").animate({ scrollTop: 0 }, "slow");
}); */

/* document.querySelectorAll(".btn-expand").forEach((elem, index) => {
  elem.addEventListener("click", (e) => {
    elem.classList.toggle("btn-expand--active");
  });
});

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
let overflowNew = document.querySelector(".over-new");
let burgerButton = document.querySelector(".burger-button");
let sidebarClose = document.querySelector(".sidebar-close");
burgerButton.addEventListener("click", taggleButton);
let sidebar = document.querySelector(".sidebar");
function taggleButton() {
  this.classList.toggle("change");
  sidebar.classList.toggle("show");
  overflowNew.classList.add("active");
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

new SimpleBar(document.getElementById("menu"));
new SimpleBar(document.getElementById("sidebar-scroll"));

const PartnersSlider = new Swiper(".partners-slider", {
  navigation: {
    nextEl: ".slider-partners-next",
    prevEl: ".slider-partners-prev",
  },
  slidesPerView: "auto",
  breakpoints: {
    320: {
      spaceBetween: 10,
    },
    575: {},

    992: {
      spaceBetween: 25,
    },
  },
});

const CertificatesSlider = new Swiper(".certificates-slider", {
  

  navigation: {
    nextEl: ".slider-certificates-next",
    prevEl: ".slider-certificates-prev",
  },
  slidesPerView: "auto",
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    575: {},

    992: {
      spaceBetween: 30,
    },
  },
});

const StuffSlider = new Swiper(".slider-stuff", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".slider-stuff-next",
    prevEl: ".slider-stuff-prev",
  },
  breakpoints: {
    320: {
      spaceBetween: 0,
    },

    992: {
      spaceBetween: 15,
    },
  },
}); */

/* const SliderTech = new Swiper(".slider-tech", {
  slidesPerView: "auto",
  breakpoints: {
    320: {
      spaceBetween: 0,
    },

    992: {
      spaceBetween: 15,
    },
  },
});

const ServiceContentSlider = new Swiper(".service-content-slider", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".service-content-slider-next",
    prevEl: ".service-content-slider-prev",
  },
  pagination: {
    el: ".service-content-slider-pag",
    dynamicBullets: true,
    clickable: true,
    renderBullet: function (index, className) {
      return `<a href="#" class="${className}">${index + 1}</a>`;
    },
  },
});

const SliderTop = new Swiper(".slider-top", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-slider-top",
    clickable: true,
    renderBullet: function (index, className) {
      return `<a href="#" class="${className}"></a>`;
    },
  },
}); */

/* tarrifs-slider */

/* const TarrifsSlider = new Swiper(".tarrifs-slider", {
  slidesPerView: "auto",

  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    575: {},

    992: {
      spaceBetween: 30,
    },
  },
});

const QuizSlider = new Swiper(".quiz-slider", {
  slidesPerView: 1,
  autoHeight: true,
  allowTouchMove: false,
  pagination: {
    el: ".quiz-pag",
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class="quiz-pag__box ${className}">
      <span>${index + 1}</span>
    </div><div class="quiz-pag__line"></div>`;
    },
  },
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    575: {},

    992: {
      spaceBetween: 30,
    },
  },
}); */

/* let quizPag = document.querySelector('.') */

/* QuizSlider.on("slideChange", handlerSlider);
function handlerSlider(slider) {
  elPag = slider.pagination.$el[0];
  widthSetPag = slider.pagination.$el[0].offsetWidth;
  widthContainerPag = document.querySelector(".quiz__cont-pag").offsetWidth;
  console.log(widthSetPag, widthContainerPag);
  elPag.style.transform = `translateX(${
    widthContainerPag / 2 - widthSetPag
  }px)`;
  console.log(widthSetPag / 5);
} */
/* 
const ArticlesSlider = new Swiper(".articles-slider", {
  pagination: {
    el: ".swiper-slider-pag",
    clickable: true,
    renderBullet: function (index, className) {
      return `<a href="#" class="${className}">${index + 1}</a>`;
    },
  },

  navigation: {
    nextEl: ".swiper-button-prev",
    prevEl: ".swiper-button-next",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    575: {
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const BudgeSliderMin = new Swiper(".budges-slider-min", {
  slidesPerView: "auto",
  breakpoints: {
    320: {
      spaceBetween: 0,
    },

    992: {
      spaceBetween: 15,
    },
  },
}); */

/* const BudgeSlider = new Swiper(".simple-budge-slider", {
  spaceBetween: 20,
  slidesPerView: "auto",
  breakpoints: {
    
  },
});
 */
/* class ItcTabs {
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

const tabs = document.querySelectorAll(".tabs");
tabs.forEach((el, index) => {
  new ItcTabs(tabs[index]);
});

const reviewsTextSlider = new Swiper(".reviews-text-slider", {
  slidesPerView: "auto",
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

const ReviewsVideoSlider = new Swiper(".reviews-video-slider", {
  slidesPerView: "auto",
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
document.querySelectorAll(".tariff-btn").forEach((elem, index) => {
  elem.addEventListener("click", () => {
    textButton = elem.querySelector("span");
    if (textButton.textContent == "Что входит") {
      textButton.textContent = "Свернуть";
    } else {
      textButton.textContent = "Что входит";
    }
  });
});
document.querySelectorAll(".box-case").forEach((elem, index) => {
  const height = elem.clientHeight;
  const width = elem.clientWidth;
  elem.addEventListener("mousemove", (e) => {
    const xVal = e.layerX;

    const yVal = e.layerY;

    const yRotation = 10 * ((xVal - width / 2) / width);

    const xRotation = -20 * ((yVal - height / 2) / height);

    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";

    elem.style.transform = string;
  });
  elem.addEventListener("mouseout", function () {
    elem.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  });

  elem.addEventListener("mousedown", function () {
    elem.style.transform =
      "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
  });

  elem.addEventListener("mouseup", function () {
    elem.style.transform =
      "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  });
}); */
