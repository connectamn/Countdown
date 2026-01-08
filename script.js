// Configuration: place your images inside images/ folder and list their filenames here.
const imageFolder = 'images/';
const images = [
  'IMG (1).jpg',
  'IMG (2).jpg',
  'IMG (4).jpg',
  'IMG (5).jpg',
  'IMG (6).jpg',
  'IMG (7).jpg',
  'IMG (8).jpg',
  'IMG (9).jpg',
  'IMG (10).jpg',
  'IMG (11).jpg',
  'IMG (12).jpg',
  'IMG (13).jpg',
  'IMG (14).jpg',
  'IMG (15).jpg',
  'IMG (16).jpg',
  'IMG (17).jpg',
  'IMG (18).jpg',
  'IMG (19).jpg',
  'IMG (20).jpg',
  'IMG (21).jpg',
  'IMG (22).jpg',
  'IMG (23).jpg',
  'IMG (24).jpg',
  'IMG (25).jpg',
  'IMG (26).jpg',
  'IMG (27).jpg',
  'IMG (28).jpg',
  'IMG (29).JPG',
  'IMG (30).JPG',
  'IMG (31).jpg',
  'IMG (32).jpg',
  'IMG (33).jpg',
  'IMG (34).jpg',
  'IMG (35).JPG',
  'IMG (36).JPG',
  'IMG (37).jpg',
  'IMG (38).JPG',
  'IMG (39).JPG',
  'IMG (40).jpg',
  'IMG (41).JPG',
  'IMG (42).jpg',
  'IMG (43).jpg',
  'IMG (44).jpg',
  'IMG (45).jpg',
  'IMG (46).jpg'
];

// Carousel: create slides from images array
const carousel = document.getElementById('carousel');
const slidesContainer = document.createElement('div');
slidesContainer.className = 'slides';
carousel.appendChild(slidesContainer);

// choose a fallback image that actually exists in the images folder
const FALLBACK_IMAGE = 'IMG (1).jpg';

images.forEach((name, i) => {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.dataset.index = i;
  const img = document.createElement('img');
  img.alt = `Slide ${i+1}`;
  // set src and attach error handler to replace missing images with a fallback
  img.src = `${imageFolder}${name}`;
  img.addEventListener('error', () => {
    if (!img.dataset.fallbackSet) {
      img.dataset.fallbackSet = '1';
      img.src = `${imageFolder}${FALLBACK_IMAGE}`;
      img.classList.add('placeholder');
    }
  }, {once: true});

  slide.appendChild(img);
  slidesContainer.appendChild(slide);
});

// --- Continuous scrolling carousel setup ---
// Clone slides so we can scroll seamlessly
const originalSlides = Array.from(slidesContainer.children);
originalSlides.forEach(node => slidesContainer.appendChild(node.cloneNode(true)));

slidesContainer.style.willChange = 'transform';
slidesContainer.style.display = 'flex';

let scrollOffset = 0;
let lastTimestamp = null;
const speed = 80; // pixels per second, adjust for faster/slower scroll

function getOriginalWidth(){
  // width of the original set (before cloning) — compute by summing original slides
  return originalSlides.reduce((sum, el) => sum + el.getBoundingClientRect().width + parseFloat(getComputedStyle(el).marginRight || 0), 0);
}

function step(ts){
  if (!lastTimestamp) lastTimestamp = ts;
  const dt = (ts - lastTimestamp) / 1000;
  lastTimestamp = ts;
  const origW = getOriginalWidth();
  scrollOffset += speed * dt;
  if (scrollOffset >= origW) scrollOffset -= origW;
  slidesContainer.style.transform = `translateX(${-scrollOffset}px)`;
  requestAnimationFrame(step);
}

// Reset animation on window resize for responsive behavior
function resetCarouselAnimation(){
  scrollOffset = 0;
  lastTimestamp = null;
}

// start the loop when images have loaded sizes
window.addEventListener('load', ()=> requestAnimationFrame(step));

// handle window resize for responsive carousel
window.addEventListener('resize', resetCarouselAnimation);

// keep pointer-events none so background doesn't block interactions
carousel.style.pointerEvents = 'none';

// Countdown calculation from Jan 1 2026 start (if now < start, use start) to Jun 30 2026 end
const startDate = new Date(Date.UTC(2026,0,1,0,0,0)); // Jan 1 2026 UTC
const endDate = new Date(Date.UTC(2026,5,30,23,59,59)); // Jun 30 2026 UTC

function computeRemaining(now){
  // use startDate if now < startDate
  const current = now < startDate ? new Date(startDate) : new Date(now);
  if (current >= endDate) return {months:0,days:0,hours:0,minutes:0,seconds:0,done:true};

  let months = (endDate.getUTCFullYear() - current.getUTCFullYear())*12 + (endDate.getUTCMonth() - current.getUTCMonth());

  // provisional date = current + months
  function addMonths(d, m){
    const y = d.getUTCFullYear();
    const mo = d.getUTCMonth();
    const day = d.getUTCDate();
    const newMo = mo + m;
    const newDate = new Date(Date.UTC(y, newMo, 1, d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()));
    // set to same day or last day of month
    const daysInMonth = new Date(Date.UTC(newDate.getUTCFullYear(), newDate.getUTCMonth()+1, 0)).getUTCDate();
    newDate.setUTCDate(Math.min(day, daysInMonth));
    return newDate;
  }

  let provisional = addMonths(current, months);
  if (provisional > endDate){
    months -= 1;
    provisional = addMonths(current, months);
  }

  let remMs = endDate - provisional;
  const days = Math.floor(remMs / (24*3600*1000));
  remMs -= days * 24*3600*1000;
  const hours = Math.floor(remMs / (3600*1000));
  remMs -= hours * 3600*1000;
  const minutes = Math.floor(remMs / (60*1000));
  remMs -= minutes * 60*1000;
  const seconds = Math.floor(remMs / 1000);

  return {months, days, hours, minutes, seconds, done:false};
}

// DOM elements
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function pad(n){return String(n).padStart(2,'0');}

function tick(){
  const now = new Date();
  const r = computeRemaining(now);
  monthsEl.textContent = r.months;
  daysEl.textContent = r.days;
  hoursEl.textContent = pad(r.hours);
  minutesEl.textContent = pad(r.minutes);
  secondsEl.textContent = pad(r.seconds);
}

// initial and interval
tick();
setInterval(tick, 1000);


// --- Background audio: always-on loop at 3% volume ---
const audioEl = document.getElementById('bg-audio');
if (audioEl) {
  audioEl.loop = true; // nonstop
  audioEl.preload = 'auto';
  audioEl.volume = 0.50; // 1% volume

  // Try autoplay on load; if blocked, start on first user interaction
  async function tryStartAudio() {
    try {
      await audioEl.play();
      return true;
    } catch (err) {
      return false;
    }
  }

  window.addEventListener('load', async () => {
    const started = await tryStartAudio();
    if (!started) {
      const startHandler = async () => {
        await tryStartAudio();
        ['click','touchstart','keydown'].forEach(ev => window.removeEventListener(ev, startHandler));
      };
      ['click','touchstart','keydown'].forEach(ev => window.addEventListener(ev, startHandler, {passive:true}));
    }
  });
}
