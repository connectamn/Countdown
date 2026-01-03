// Configuration: place your images inside images/ folder and list their filenames here.
const imageFolder = 'images/';
const images = [
  'g1.jpg',
  'g10.jpg',
  'g2.jpg',
  'g3.jpg',
  'g4.jpg',
  'g5.jpg',
  'g6.jpg',
  'g7.jpg',
  'g8.jpg',
  'g9.jpg',
  'IMG_20251224_143349.jpg',
  'IMG_20251224_143351.jpg',
  'IMG_20251224_143355.jpg',
  'IMG_20251224_143357.jpg',
  'IMG_20251224_143815.jpg',
  'IMG_20251224_143824.jpg',
  'IMG_20251224_143827.jpg',
  'IMG_20251224_143845.jpg',
  'IMG_20251224_143847.jpg',
  'IMG_20251224_143853.jpg',
  'IMG_20251224_143854.jpg',
  'IMG_20251224_144055.jpg',
  'IMG_20251224_144103.jpg',
  'IMG_20251224_144107.jpg',
  'IMG_20251224_144930.jpg',
  'IMG_20251224_144939.jpg',
  'IMG_20251224_145033.jpg',
  'IMG_20251224_145055.jpg',
  'IMG_20251224_145116.jpg',
  'IMG_20251224_145119.jpg',
  'IMG_20251224_145122.jpg',
  'IMG_20251224_150107.jpg',
  'IMG_20251224_150114.jpg',
  'IMG_20251224_150137.jpg',
  'IMG_20251224_150203.jpg',
  'IMG_20251224_150207.jpg',
  'IMG_20251224_154639.jpg',
  'IMG_20251224_154658.jpg',
  'IMG_20251224_154720.jpg',
  'IMG_20251224_155029.jpg',
  'IMG_20251224_155039.jpg',
  'IMG_20251224_155115.jpg',
  'IMG_20251224_155122.jpg',
  'IMG_20251224_155124.jpg',
  'IMG_20251224_155125.jpg',
  'IMG_20251224_155127.jpg',
  'IMG_20251224_155139.jpg',
  'IMG_20251224_155141.jpg',
  'IMG_20251224_155143.jpg',
  'IMG_20251224_155147.jpg',
  'IMG_20251224_155248.jpg',
  'IMG_20251224_155251.jpg',
  'IMG_20251224_155254.jpg',
  'IMG_20251224_155316.jpg',
  'IMG_20251224_155318.jpg',
  'IMG_20251224_155323.jpg',
  'IMG_20251224_155325.jpg',
  'IMG_20251224_155326.jpg',
  'IMG_20251224_155330.jpg',
  'IMG_20251224_155331.jpg',
  'IMG_20251224_155339.jpg',
  'IMG_20251224_155345.jpg',
  'IMG_20251224_155347.jpg',
  'IMG_20251224_155432.jpg',
  'IMG_20251224_155433.jpg',
  'IMG_20251224_155435.jpg',
  'IMG_20251224_155436.jpg',
  'IMG_20251224_155437.jpg',
  'IMG_20251224_155455.jpg',
  'IMG_20251224_155500.jpg',
  'IMG_20251224_155502.jpg',
  'IMG_20251224_155505.jpg',
  'IMG_20251224_155533.jpg',
  'IMG_20251224_155540.jpg',
  'IMG_20251224_155543.jpg',
  'IMG_20251224_155545.jpg',
  'IMG_20251224_155620.jpg',
  'IMG_20251224_155621.jpg',
  'IMG_20251224_155624.jpg',
  'IMG_20251224_155625.jpg',
  'IMG_20251224_155637.jpg',
  'IMG_20251224_155639.jpg',
  'IMG_20251224_155719.jpg',
  'IMG_20251224_155720.jpg',
  'IMG_20251224_160356.jpg',
  'IMG_20251224_160402.jpg',
  'IMG_20251224_160409.jpg',
  'IMG_20251224_160410.jpg',
  'IMG_20251224_160425.jpg',
  'IMG_20251224_160449.jpg',
  'IMG_20251224_160452.jpg',
  'IMG_20251224_160454.jpg',
  'IMG_20251224_160517.jpg',
  'IMG_20251224_160525.jpg',
  'IMG_20251224_160527.jpg',
  'IMG_20251224_160528.jpg',
  'IMG_20251224_160541.jpg',
  'IMG_20251224_160543.jpg',
  'IMG_20251224_160547.jpg'
];

// Carousel: create slides from images array
const carousel = document.getElementById('carousel');
const slidesContainer = document.createElement('div');
slidesContainer.className = 'slides';
carousel.appendChild(slidesContainer);

// choose a fallback image that actually exists in the images folder
const FALLBACK_IMAGE = 'g2.jpg';

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

// start the loop when images have loaded sizes
window.addEventListener('load', ()=> requestAnimationFrame(step));

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
  audioEl.volume = 0.02; // 1% volume

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
