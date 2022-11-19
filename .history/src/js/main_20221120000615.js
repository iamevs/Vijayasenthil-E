import { menu } from "./menu.js";

menu();

// about-text animation

const text = document.querySelector(".text");
// replace span to .text except the id static
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
const eavbsi = document.querySelector("#static");
console.log(eavbsi);


const element = document.querySelectorAll("span");

for (let i = 0; i < element.length; i++) {
  if (element[i].children.length == 0) {
    element[i].addEventListener("mouseover", function () {
      this.classList.add("active-text");
    });
  }
}


// navbar animation

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

let nav = document.querySelector("nav");
document.querySelector(".toggle").onclick = function () {
  this.classList.toggle("active");
  nav.classList.toggle("active");
}
nav.onclick = function () {
  this.classList.remove("active");
  document.querySelector(".toggle").classList.remove("active");
}

let filename = [
  'HTML', 'CSS', 'JAVASCRIPT',
  'Bootstrap', 'Tailwind', 'REACT',
  'PYTHON', 'SASS',
  'C/C++', 'NODEJS', 'MONGODB',
  'EXPRESS', 'MYSQL', 'JQUERY', 'JAVA', 'Svelte', 'Astro', 'Next js', 'Three js', 'D3 js', 'PHP', 'NPM', '🖤'
];

var tagCloud = TagCloud('.Sphere', filename, {

  radius: (window.innerWidth > 768) ? 250 : 190,
  maxSpeed: 'fast',
  initSpeed: 'fast',
  direction: 135,
  keep: true

});

var color = '#3a86ff';
document.querySelector('.Sphere').style.color = color;

// custom context menu


document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
  document.getElementById(
    "contextMenu").style.display = "none"
}

hideMenu();

function rightClick(e) {
  e.preventDefault();

  if (document.getElementById(
    "contextMenu").style.display == "block")
    hideMenu();
  else {
    var menu = document
      .getElementById("contextMenu")

    menu.style.display = 'block';
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    // console.log(e.pageX, e.pageY);
  }
}


//skill section
function down(x, y) {
  x.addEventListener("click", function () {
    y.style.display = "block";
    x.classList.add("enable");
  });
  document.addEventListener("click", (e) => {
    if (e.target !== x && e.target !== y) {
      y.style.display = "none";
      x.classList.remove("enable");
    }
  });
}
function innerdown(x, y) {
  x.addEventListener("mouseover", function () {
    y.style.display = "block";
    x.classList.add("enable");
  });
  document.addEventListener("click", (e) => {
    if (e.target !== x && e.target !== y) {
      y.style.display = "none";
      x.classList.remove("enable");
    }
  });
}
const adown = document.querySelector('.a');
const content = document.querySelector(".a1");
down(adown, content);
const jsdown = document.querySelector('.js');
const jscontent = document.querySelector(".js-lib");
innerdown(jsdown, jscontent);
const bdown = document.querySelector('.b');
const bcontent = document.querySelector(".b1");
down(bdown, bcontent);
const cdown = document.querySelector('.c');
const ccontent = document.querySelector(".c1");
down(cdown, ccontent);
const ddown = document.querySelector('.d');
const dcontent = document.querySelector(".d1");
down(ddown, dcontent);
const dvdown = document.querySelector('.d-v');
const dvcontent = document.querySelector(".d-v-content");
innerdown(dvdown, dvcontent);

// github calendar

const container = document.getElementById("calender");

// GitHubCalendar(container, "iamevs");

GitHubCalendar(container, "iamevs", { responsive: true });

//projects

/*
  More about this function - 
  https://codepen.io/rachsmith/post/animation-tip-lerp
*/
function lerp({ x, y }, { x: targetX, y: targetY }) {
  const fraction = 0.1;
  
  x += (targetX - x) * fraction;
  y += (targetY - y) * fraction;
  
  return { x, y };
}

class Slider {
  constructor (el) {
    const imgClass = this.IMG_CLASS = 'slider__images-item';
    const textClass = this.TEXT_CLASS = 'slider__text-item';
    const activeImgClass = this.ACTIVE_IMG_CLASS = `${imgClass}--active`;
    const activeTextClass = this.ACTIVE_TEXT_CLASS =  `${textClass}--active`;
    
    this.el = el;
    this.contentEl = document.getElementById('slider-content');
    this.onMouseMove = this.onMouseMove.bind(this);
    
    // taking advantage of the live nature of 'getElement...' methods
    this.activeImg = el.getElementsByClassName(activeImgClass);
    this.activeText = el.getElementsByClassName(activeTextClass);
    this.images = el.getElementsByTagName('img');
    
    document.getElementById('slider-dots')
      .addEventListener('click', this.onDotClick.bind(this));
    
    document.getElementById('left')
      .addEventListener('click', this.prev.bind(this));
    
    document.getElementById('right')
      .addEventListener('click', this.next.bind(this));
    
    window.addEventListener('resize', this.onResize.bind(this));
    
    this.onResize();
    
    this.length = this.images.length;
    this.lastX = this.lastY = this.targetX = this.targetY = 0;
  }
  onResize () {
    const htmlStyles = getComputedStyle(document.documentElement);
    const mobileBreakpoint =  htmlStyles.getPropertyValue('--mobile-bkp');
    
    const isMobile = this.isMobile = matchMedia(
      `only screen and (max-width: ${mobileBreakpoint})`
    ).matches;
    
    this.halfWidth = innerWidth / 2;
    this.halfHeight = innerHeight / 2;
    this.zDistance = htmlStyles.getPropertyValue('--z-distance');
    
    if (!isMobile && !this.mouseWatched) {
      this.mouseWatched = true;
      this.el.addEventListener('mousemove', this.onMouseMove);
      this.el.style.setProperty(
        '--img-prev', 
        `url(${this.images[+this.activeImg[0].dataset.id - 1].src})`
      );
      this.contentEl.style.setProperty('transform', `translateZ(${this.zDistance})`);
    } else if (isMobile && this.mouseWatched) {
      this.mouseWatched = false;
      this.el.removeEventListener('mousemove', this.onMouseMove);
      this.contentEl.style.setProperty('transform', 'none');
    }
  }
  getMouseCoefficients ({ pageX, pageY } = {}) {
    const halfWidth = this.halfWidth;
    const halfHeight = this.halfHeight;
    const xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
    const yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;
    
    return { xCoeff,  yCoeff }
  }
  onMouseMove ({ pageX, pageY }) {   
    this.targetX = pageX;
    this.targetY = pageY;
    
    if (!this.animationRunning) {
      this.animationRunning = true;
      this.runAnimation();
    }
  }
  runAnimation () {
    if (this.animationStopped) {
      this.animationRunning = false;
      return;
    }
    
    const maxX = 0;
    const maxY = 0;
    
    const newPos = lerp({
      x: this.lastX,
      y: this.lastY
    }, {
      x: this.targetX,
      y: this.targetY
    });
    
    const { xCoeff, yCoeff } = this.getMouseCoefficients({
      pageX: newPos.x, 
      pageY: newPos.y
    });
      
    this.lastX = newPos.x;
    this.lastY = newPos.y;

    this.positionImage({ xCoeff, yCoeff });
    
    this.contentEl.style.setProperty('transform', `
      translateZ(${this.zDistance})
      rotateX(${maxY * yCoeff}deg)
      rotateY(${maxX * xCoeff}deg)
    `);
    
    if (this.reachedFinalPoint) {
      this.animationRunning = false;
    } else {
      requestAnimationFrame(this.runAnimation.bind(this)); 
    }
  }
  get reachedFinalPoint () {
    const lastX = ~~this.lastX;
    const lastY = ~~this.lastY;
    const targetX = this.targetX;
    const targetY = this.targetY;
    
    return (lastX == targetX || lastX - 1 == targetX || lastX + 1 == targetX) 
        && (lastY == targetY || lastY - 1 == targetY || lastY + 1 == targetY);
  }
  positionImage ({ xCoeff, yCoeff }) {
    const maxImgOffset = 1;
    const currentImage = this.activeImg[0].children[0];
    
    currentImage.style.setProperty('transform', `
      translateX(${maxImgOffset * -xCoeff}em)
      translateY(${maxImgOffset * yCoeff}em)
    `);  
  }
  onDotClick ({ target }) {
    if (this.inTransit) return;
    
    const dot = target.closest('.slider__nav-dot');
    
    if (!dot) return;
    
    const nextId = dot.dataset.id;
    const currentId = this.activeImg[0].dataset.id;
    
    if (currentId == nextId) return;
    
    this.startTransition(nextId);
  }
  transitionItem (nextId) {
    function onImageTransitionEnd (e) {
      e.stopPropagation();
      
      nextImg.classList.remove(transitClass);
      
      self.inTransit = false;
      
      this.className = imgClass;
      this.removeEventListener('transitionend', onImageTransitionEnd);
    }
    
    const self = this;
    const el = this.el;
    const currentImg = this.activeImg[0];
    const currentId = currentImg.dataset.id;
    const imgClass = this.IMG_CLASS;
    const textClass = this.TEXT_CLASS;
    const activeImgClass = this.ACTIVE_IMG_CLASS;
    const activeTextClass = this.ACTIVE_TEXT_CLASS;
    const subActiveClass = `${imgClass}--subactive`;
    const transitClass = `${imgClass}--transit`;
    const nextImg = el.querySelector(`.${imgClass}[data-id='${nextId}']`);
    const nextText = el.querySelector(`.${textClass}[data-id='${nextId}']`);
    
    let outClass = '';
    let inClass = '';

    this.animationStopped = true;
    
    nextText.classList.add(activeTextClass);
    
    el.style.setProperty('--from-left', nextId);
    
    currentImg.classList.remove(activeImgClass);
    currentImg.classList.add(subActiveClass);
    
    if (currentId < nextId) {
      outClass = `${imgClass}--next`;
      inClass = `${imgClass}--prev`;
    } else {
      outClass = `${imgClass}--prev`;
      inClass = `${imgClass}--next`;
    }
    
    nextImg.classList.add(outClass);
    
    requestAnimationFrame(() => {
      nextImg.classList.add(transitClass, activeImgClass);
      nextImg.classList.remove(outClass);
      
      this.animationStopped = false;
      this.positionImage(this.getMouseCoefficients());
      
      currentImg.classList.add(transitClass, inClass);
      currentImg.addEventListener('transitionend', onImageTransitionEnd);
    });

    if (!this.isMobile)
      this.switchBackgroundImage(nextId);
  }
  startTransition (nextId) {
    function onTextTransitionEnd(e) {
      if (!e.pseudoElement) {
        e.stopPropagation();

        requestAnimationFrame(() => {
          self.transitionItem(nextId);
        });

        this.removeEventListener('transitionend', onTextTransitionEnd);
      }
    }
    
    if (this.inTransit) return;

    const activeText = this.activeText[0];
    const backwardsClass = `${this.TEXT_CLASS}--backwards`;
    const self = this;
    
    this.inTransit = true;
    
    activeText.classList.add(backwardsClass);
    activeText.classList.remove(this.ACTIVE_TEXT_CLASS);
    activeText.addEventListener('transitionend', onTextTransitionEnd);
    
    requestAnimationFrame(() => {
      activeText.classList.remove(backwardsClass);
    });
  }
  next () {
    if (this.inTransit) return;
    
    let nextId = +this.activeImg[0].dataset.id + 1;
    
    if (nextId > this.length)
        nextId = 1;
    
    this.startTransition(nextId);
  }
  prev () {
    if (this.inTransit) return;
    
    let nextId = +this.activeImg[0].dataset.id - 1;
    
    if (nextId < 1)
        nextId = this.length;
    
    this.startTransition(nextId);
  }
  switchBackgroundImage (nextId) {
    function onBackgroundTransitionEnd (e) {
      if (e.target === this) {
        this.style.setProperty('--img-prev', imageUrl);
        this.classList.remove(bgClass);
        this.removeEventListener('transitionend', onBackgroundTransitionEnd);
      }
    }

    // const bgClass = 'slider--bg-next';
    const el = this.el;
    const imageUrl = `url(${this.images[+nextId - 1].src})`;
    
    el.style.setProperty('--img-next', imageUrl);
    el.addEventListener('transitionend', onBackgroundTransitionEnd);
    // el.classList.add(bgClass);
  }
}

const sliderEl = document.getElementById('slider');
const slider = new Slider(sliderEl);
