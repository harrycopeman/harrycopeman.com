// Slide data from previous implementation
const slides = [
  {
    type: 'image',
    src: 'assets/img/bb-office.jpeg',
    year: '2020',
    caption: 'Founded the London office for Bakken & Bæck',
    alt: 'Bakken & Bæck London office'
  },
  {
    type: 'video',
    src: 'assets/vid/shop-2.mp4',
    year: '2024',
    caption: 'Led varying projects at Shop including a full redesign, a new homefeed, and AI strategy',
    alt: 'Shop redesign video'
  },
  {
    type: 'image',
    src: 'assets/img/universe-2.png',
    year: '2023',
    caption: 'Led a redesign of the Universe editor experience, winner of the 2023 Apple Design Award',
    alt: 'Universe editor redesign'
  },
  {
    type: 'video',
    src: 'assets/vid/ruter-screen.mp4',
    year: '2022',
    caption: 'Led a redesign for Norways public transportation company',
    alt: 'Ruter redesign video'
  },
  {
    type: 'image',
    src: 'assets/img/farewill.png',
    year: '2016',
    caption: 'Founding designer at Farewill (acquired), raising over £1B for charity',
    alt: 'Farewill founding designer'
  },
  {
    type: 'image',
    src: 'assets/img/kron-2.png',
    year: '2019',
    caption: 'Designed Kron, Norways #1 finance app',
    alt: 'Kron finance app design'
  },
  {
    type: 'image',
    src: 'assets/img/insta2.png',
    year: '2016',
    caption: 'Designed product tagging across Facebook and Instagram',
    alt: 'Instagram product tagging'
  },
  {
    type: 'image',
    src: 'assets/img/devices.png',
    year: '2015',
    caption: 'Part of the small team that launched Facebook design resources',
    alt: 'Facebook design resources'
  },
  {
    type: 'image',
    src: 'assets/img/mailbox.png',
    year: '2014',
    caption: 'Design and prototypes at Mailbox',
    alt: 'Mailbox design and prototypes'
  }
];

let current = 0;

function renderSlides() {
  const track = document.querySelector('.carousel-track');
  track.innerHTML = '';
  slides.forEach((slide, idx) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'carousel-slide';
    slideDiv.setAttribute('data-index', idx);
    let el;
    if (slide.type === 'image') {
      el = document.createElement('img');
      el.src = slide.src;
      el.alt = slide.alt;
      el.draggable = false;
    } else if (slide.type === 'video') {
      el = document.createElement('video');
      el.src = slide.src;
      el.autoplay = true;
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.setAttribute('aria-label', slide.alt);
      el.draggable = false;
    }
    slideDiv.appendChild(el);
    // Add caption under media
    const captionDiv = document.createElement('div');
    captionDiv.className = 'carousel-caption';
    const yearSpan = document.createElement('span');
    yearSpan.className = 'gallery-year';
    yearSpan.textContent = slide.year;
    const descSpan = document.createElement('span');
    descSpan.className = 'gallery-desc';
    descSpan.textContent = slide.caption;
    captionDiv.appendChild(yearSpan);
    captionDiv.appendChild(descSpan);
    slideDiv.appendChild(captionDiv);
    track.appendChild(slideDiv);
  });
}

function renderNav() {
  const nav = document.querySelector('.gallery-nav');
  nav.innerHTML = '';
  slides.forEach((slide, idx) => {
    const btn = document.createElement('button');
    btn.className = 'gallery-nav-btn' + (idx === current ? ' active' : '');
    btn.textContent = slide.year;
    btn.addEventListener('click', () => {
      goToSlide(idx);
    });
    nav.appendChild(btn);
  });
}

function updateCarousel(animate = true) {
  const track = document.querySelector('.carousel-track');
  const slidesEls = Array.from(track.children);
  const slide = slidesEls[current];
  if (!slide) return;
  const viewport = document.querySelector('.carousel-viewport');
  // Calculate the left offset of the slide relative to the track
  const slideRect = slide.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const viewportRect = viewport.getBoundingClientRect();
  // The center of the slide relative to the track
  const slideCenterInTrack = slide.offsetLeft + slide.offsetWidth / 2;
  // The center of the viewport relative to the track
  const viewportCenterInTrack = (viewportRect.width) / 2;
  // The offset needed to center the slide
  const offset = viewportCenterInTrack - slideCenterInTrack;
  track.style.transition = animate ? 'transform 0.6s cubic-bezier(.4,0,.2,1)' : 'none';
  track.style.transform = `translateX(${offset}px)`;
  // Update preview states
  slidesEls.forEach((el, idx) => {
    el.classList.remove('carousel-slide--preview');
    if (idx === current + 1) {
      el.classList.add('carousel-slide--preview');
    }
  });
  // Update caption
  document.querySelector('.gallery-year').textContent = slides[current].year;
  document.querySelector('.gallery-desc').textContent = slides[current].caption;
}

function goToSlide(idx, animate = true) {
  if (idx === current) return;
  current = idx;
  updateCarousel(animate);
  renderNav();
  centerActiveNavBtn();
}

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    if (current > 0) goToSlide(current - 1);
  } else if (e.key === 'ArrowRight') {
    if (current < slides.length - 1) goToSlide(current + 1);
  }
});

// Initial render
renderSlides();

function ensureCenteredAfterMediaLoad() {
  const track = document.querySelector('.carousel-track');
  const slidesEls = Array.from(track.children);
  let pending = 0;
  slidesEls.forEach(slideDiv => {
    const media = slideDiv.querySelector('img, video');
    if (media) {
      if (media.complete || media.readyState === 4) {
        // Already loaded
      } else {
        pending++;
        media.addEventListener('load', () => {
          pending--;
          if (pending === 0) updateCarousel();
        });
        media.addEventListener('loadeddata', () => {
          pending--;
          if (pending === 0) updateCarousel();
        });
      }
    }
  });
  // Fallback: always call after a short delay
  setTimeout(() => updateCarousel(), 100);
}

window.addEventListener('resize', () => updateCarousel());
ensureCenteredAfterMediaLoad();
renderNav();

// Time and theme logic (unchanged)
function updateTime() {
  const el = document.getElementById('gallery-time');
  const now = new Date();
  el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

const lightBtn = document.getElementById('light-toggle');
const darkBtn = document.getElementById('dark-toggle');
lightBtn.addEventListener('click', () => {
  document.body.classList.remove('dark');
  lightBtn.classList.add('active');
  darkBtn.classList.remove('active');
});
darkBtn.addEventListener('click', () => {
  document.body.classList.add('dark');
  darkBtn.classList.add('active');
  lightBtn.classList.remove('active');
}); 