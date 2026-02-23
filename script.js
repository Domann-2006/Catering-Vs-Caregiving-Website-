/* ===========================
   NAVBAR SCROLL BEHAVIOR
   =========================== */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
  updateActiveNav();
});

/* ===========================
   HAMBURGER MENU
   =========================== */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ===========================
   ACTIVE NAV LINK
   =========================== */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

/* ===========================
   SCROLL REVEAL
   =========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   BACK TO TOP
   =========================== */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   LIGHTBOX GALLERY
   =========================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[index];
  const img = item.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];
  const img = item.querySelector('img');
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt;
    lightboxImg.style.opacity = '1';
  }, 150);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  const item = galleryItems[currentIndex];
  const img = item.querySelector('img');
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt;
    lightboxImg.style.opacity = '1';
  }, 150);
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightboxImg.style.transition = 'opacity 0.15s ease';

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

/* ===========================
   CONTACT FORM
   =========================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('formBtnText');
  const successEl = document.getElementById('formSuccess');

  btn.textContent = 'Sending...';

  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    successEl.classList.add('visible');
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
    }, 4000);
  }, 1200);
}

/* ===========================
   SMOOTH SCROLL FOR ALL ANCHORS
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===========================
   ANIMATED NUMBER COUNTER
   =========================== */
function animateCounters() {
  const counters = document.querySelectorAll('.exp-num, .ib-number');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace('+', ''));
    if (isNaN(target)) return;
    let current = 0;
    const increment = target / 40;
    const suffix = counter.textContent.includes('+') ? '+' : '';
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, 30);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsTarget = document.querySelector('.about-exp-card') || document.querySelector('.image-badge');
if (statsTarget) statsObserver.observe(statsTarget);

/* ===========================
   TYPING EFFECT ON HERO SUBTITLE
   =========================== */
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const texts = [
    'Professional Caterer & Certified Caregiver',
    'Event Catering Specialist',
    'Compassionate Caregiver',
    'Based in Lagos, Nigeria'
  ];
  let tIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingActive = false;

  function typeEffect() {
    const current = texts[tIndex];
    if (isDeleting) {
      heroSubtitle.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        tIndex = (tIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
        return;
      }
    } else {
      heroSubtitle.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        if (tIndex === 0 && !typingActive) {
          return; // Don't cycle after initial display
        }
        isDeleting = true;
        setTimeout(typeEffect, 2500);
        return;
      }
    }
    const speed = isDeleting ? 40 : 80;
    setTimeout(typeEffect, speed);
  }

  // Start cycling after 5 seconds
  setTimeout(() => {
    typingActive = true;
    isDeleting = true;
    typeEffect();
  }, 5000);
}

/* ===========================
   PRICING CARD HOVER TILT
   =========================== */
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (y / rect.height) * -4;
    const rotY = (x / rect.width) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===========================
   INIT ON LOAD
   =========================== */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});
