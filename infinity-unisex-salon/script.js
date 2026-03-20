/* ============================================
   Infinity Unisex Salon — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Sticky Navbar ───
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ─── Mobile Menu Toggle ───
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ─── Smooth Scroll for anchors ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Scroll-triggered Animations ───
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ─── Counter Animation for Stats ───
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  function animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();
    const suffix = target >= 1000 ? '+' : (el.closest('.stat-item')?.querySelector('.stat-label')?.textContent.includes('%') ? '%' : '+');

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * target);

      if (target >= 1000) {
        el.textContent = current.toLocaleString() + '+';
      } else {
        el.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── Gallery Lightbox ───
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─── Parallax-like effect on hero ───
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.2}px)`;
      }
    }, { passive: true });
  }

  // ─── Active nav link highlighting ───
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ─── Service card hover sound-like effect (visual pulse) ───
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    });
  });

});
