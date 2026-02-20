/* ============================================
   PORTFOLIO - ABDUL RASYID FADHILAH HANAN
   Main JavaScript
   ============================================ */

'use strict';

/* ============================================
   LOADING SCREEN (Diperbaiki)
   ============================================ */
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.add('page-transition');
    }, 1200); 
  }
});

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollTop();
  initScrollReveal();
  initActiveNav();

  // Page specific
  if (document.querySelector('.hero')) initHero();
  if (document.querySelector('.counters-section')) initCounters();
  if (document.querySelector('.skills-grid')) initSkillBars();
  if (document.querySelector('.portfolio-grid')) initPortfolio();
  if (document.querySelector('.works-masonry')) initWorks();
  if (document.querySelector('.contact-form')) initContactForm();
  if (document.querySelector('.circular-charts')) initCircularCharts();
  if (document.querySelector('.skill-preview-fill')) initPreviewBars();
  if (document.querySelector('.carousel-track')) initCarousel();
});

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

/* ============================================
   ACTIVE NAV
   ============================================ */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   SCROLL TO TOP
   ============================================ */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   HERO TYPING ANIMATION
   ============================================ */
function initHero() {
  const subtitleEl = document.querySelector('#hero-subtitle');
  if (!subtitleEl) return;

  const roles = [
    'Web Developer',
    
    'Video Editor',
    'Graphic Designer',
    'Problem Solver',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      subtitleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; }, 1800);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 60 : 110;
    setTimeout(type, speed);
  }

  setTimeout(type, 800);
}

/* ============================================
   COUNTERS
   ============================================ */
function initCounters() {
  const counters = document.querySelectorAll('.counter-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const start = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ============================================
   SKILL BARS
   ============================================ */
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-progress-fill').forEach(fill => {
          const pct = fill.getAttribute('data-pct');
          setTimeout(() => { fill.style.width = pct + '%'; }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
}

function initPreviewBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-preview-fill').forEach(fill => {
          const pct = fill.getAttribute('data-pct');
          setTimeout(() => { fill.style.width = pct + '%'; }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-preview-list').forEach(el => observer.observe(el));
}

/* ============================================
   CIRCULAR CHARTS
   ============================================ */
function initCircularCharts() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.circle-progress').forEach(circle => {
          const pct = parseFloat(circle.getAttribute('data-pct'));
          const circumference = 283;
          const offset = circumference - (pct / 100) * circumference;
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.circular-charts').forEach(el => observer.observe(el));
}


/* ============================================
   WORKS / LIGHTBOX
   ============================================ */
function initWorks() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const items = Array.from(document.querySelectorAll('.masonry-item[data-index]'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const icon = item.querySelector('.masonry-thumb').textContent;
    const title = item.querySelector('.masonry-title').textContent;
    const cat = item.querySelector('.masonry-cat').textContent;

    lightbox.querySelector('.lightbox-content').textContent = icon;
    lightbox.querySelector('.lightbox-title').textContent = title;
    lightbox.querySelector('.lightbox-cat').textContent = cat;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightbox.querySelector('.lb-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  });

  lightbox.querySelector('.lb-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  });

  // Touch/Swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % items.length;
      } else {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      }
      openLightbox(currentIndex);
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      openLightbox(currentIndex);
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % items.length;
      openLightbox(currentIndex);
    }
  });
}

/* ============================================
   CAROUSEL
   ============================================ */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  document.querySelector('.carousel-prev')?.addEventListener('click', () => {
    track.scrollBy({ left: -320, behavior: 'smooth' });
  });

  document.querySelector('.carousel-next')?.addEventListener('click', () => {
    track.scrollBy({ left: 320, behavior: 'smooth' });
  });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Clear errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    // Validate
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim()) {
      name.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      message.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Simulate send
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      const successEl = document.getElementById('form-success');
      if (successEl) {
        successEl.classList.add('show');
      }
    }, 1500);
  });
}

/* ============================================
   CARD TILT 3D
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Skip on touch devices and reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  document.querySelectorAll('.glass-card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -8;
      const rotY = ((x - midX) / midX) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

/* ============================================
   PARALLAX (light)
   ============================================ */
window.addEventListener('scroll', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax-layer').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed') || '0.3');
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });
