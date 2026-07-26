/**
 * PRAN Platform — Interactive Vanilla JavaScript Engine
 * Handles scroll effects, navigation drawers, dropdowns, reveals, counters, SVG animations, and tab switching.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initDropdownMenus();
  initMobileDrawer();
  initScrollReveals();
  initCounters();
  initEmissionsChartAnimation();
  initMarketplaceTabs();
});

/* ── 1. Header Scroll Progress & Glass Backdrop ──────────────────────────── */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!header && !progressBar) return;

  const updateScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Toggle header glass class
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Update progress bar
    if (progressBar && docHeight > 0) {
      const progress = (scrollY / docHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
}

/* ── 2. Header Dropdown Menus ───────────────────────────────────────────── */
function initDropdownMenus() {
  const dropdownItems = document.querySelectorAll('.nav-item');

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      // Close other dropdowns
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.nav-dropdown-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    dropdownItems.forEach((item) => {
      item.classList.remove('open');
      const trigger = item.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── 3. Mobile Menu Drawer ─────────────────────────────────────────────── */
function initMobileDrawer() {
  const openBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ── 4. Scroll Reveal Observer ─────────────────────────────────────────── */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ── 5. Stat Counter Animations ───────────────────────────────────────── */
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter-to]');
  if (!counterElements.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-counter-to'));
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
    const duration = 1200; // ms

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeProgress;

      el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterElements.forEach((el) => observer.observe(el));
}

/* ── 6. UNEP Emissions Gap SVG Chart Animation ─────────────────────────── */
function initEmissionsChartAnimation() {
  const chartSvg = document.querySelector('.emissions-svg');
  if (!chartSvg) return;

  const currentPath = chartSvg.querySelector('.current-line');
  const targetPath = chartSvg.querySelector('.target-line');
  const endPoints = chartSvg.querySelectorAll('.end-point');

  if (currentPath) {
    const len1 = currentPath.getTotalLength ? currentPath.getTotalLength() : 500;
    currentPath.style.strokeDasharray = len1;
    currentPath.style.strokeDashoffset = len1;
  }

  if (targetPath) {
    const len2 = targetPath.getTotalLength ? targetPath.getTotalLength() : 500;
    targetPath.style.strokeDasharray = len2;
    targetPath.style.strokeDashoffset = len2;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (currentPath) {
            currentPath.style.transition = 'stroke-dashoffset 1000ms cubic-bezier(.22,.9,.3,1)';
            currentPath.style.strokeDashoffset = '0';
          }
          if (targetPath) {
            targetPath.style.transition = 'stroke-dashoffset 1000ms cubic-bezier(.22,.9,.3,1) 100ms';
            targetPath.style.strokeDashoffset = '0';
          }
          if (endPoints) {
            endPoints.forEach((pt) => {
              pt.style.transition = 'opacity 500ms ease-out 900ms';
              pt.style.opacity = '1';
            });
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(chartSvg);
}

/* ── 7. Marketplace Section Tab Switcher ───────────────────────────────── */
function initMarketplaceTabs() {
  const tabs = document.querySelectorAll('.browser-tabs .tab-pill');
  const cards = document.querySelectorAll('.browser-card-grid .mini-card');

  if (!tabs.length || !cards.length) return;

  const projectData = {
    'All Projects': [
      { name: 'Biogas Recovery Project', price: '$18.50', sector: 'Biogas', bg: 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)' },
      { name: 'Solar Project Rajasthan', price: '$22.75', sector: 'Solar', bg: 'linear-gradient(135deg, #ffb800 0%, #ffd700 100%)' },
      { name: 'Wind Farm Tamil Nadu', price: '$19.25', sector: 'Wind', bg: 'linear-gradient(135deg, #003d5c 0%, #0066aa 100%)' }
    ],
    'Forestry': [
      { name: 'Western Ghats Afforestation', price: '$24.50', sector: 'Forestry', bg: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)' },
      { name: 'Sundarbans Mangrove', price: '$28.00', sector: 'Forestry', bg: 'linear-gradient(135deg, #081c15 0%, #1b4332 100%)' },
      { name: 'Himalayan Pine Protection', price: '$21.00', sector: 'Forestry', bg: 'linear-gradient(135deg, #2d5016 0%, #52b788 100%)' }
    ],
    'Solar': [
      { name: 'Solar Project Rajasthan', price: '$22.75', sector: 'Solar', bg: 'linear-gradient(135deg, #ffb800 0%, #ffd700 100%)' },
      { name: 'Gujarat Rooftop Solar', price: '$16.90', sector: 'Solar', bg: 'linear-gradient(135deg, #e67e22 0%, #f1c40f 100%)' },
      { name: 'Deccan Solar Grid', price: '$20.15', sector: 'Solar', bg: 'linear-gradient(135deg, #d35400 0%, #f39c12 100%)' }
    ],
    'Wind': [
      { name: 'Wind Farm Tamil Nadu', price: '$19.25', sector: 'Wind', bg: 'linear-gradient(135deg, #003d5c 0%, #0066aa 100%)' },
      { name: 'Coastal Wind Array', price: '$18.40', sector: 'Wind', bg: 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)' },
      { name: 'High-Altitude Wind Park', price: '$23.50', sector: 'Wind', bg: 'linear-gradient(135deg, #16a085 0%, #1abc9c 100%)' }
    ],
    'Biogas': [
      { name: 'Biogas Recovery Project', price: '$18.50', sector: 'Biogas', bg: 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)' },
      { name: 'Agricultural Waste Digestion', price: '$17.20', sector: 'Biogas', bg: 'linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)' },
      { name: 'Municipal Biomass Conversion', price: '$19.80', sector: 'Biogas', bg: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' }
    ],
    'Community': [
      { name: 'Clean Cookstoves MP', price: '$14.50', sector: 'Community', bg: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)' },
      { name: 'Rural Water Purification', price: '$15.75', sector: 'Community', bg: 'linear-gradient(135deg, #2980b9 0%, #8e44ad 100%)' },
      { name: 'Community Solar Pumps', price: '$18.00', sector: 'Community', bg: 'linear-gradient(135deg, #d35400 0%, #e67e22 100%)' }
    ]
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.textContent.trim();
      const categoryData = projectData[category] || projectData['All Projects'];

      cards.forEach((card, index) => {
        if (categoryData[index]) {
          const item = categoryData[index];
          const thumb = card.querySelector('.mini-card-thumb');
          const title = card.querySelector('.mini-card-title');
          const price = card.querySelector('.mini-card-price');

          if (thumb) thumb.style.background = item.bg;
          if (title) title.textContent = item.name;
          if (price) price.textContent = item.price;

          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
