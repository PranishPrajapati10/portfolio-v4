/**
 * STACK THEME — CYBERPUNK NEON PORTFOLIO
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initCodeCopy();
  initAvatarToggle();
  initProjectFilters();
  initCopyEmail();
  initMonitorClock();
});

/* ==========================================================================
   NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   ANIMATED METRIC COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number[data-target]');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = 2000 / target;

          const updateCount = () => {
            const increment = Math.ceil(target / 40);
            if (count < target) {
              count = Math.min(count + increment, target);
              counter.textContent = count + suffix;
              setTimeout(updateCount, 40);
            } else {
              counter.textContent = target + suffix;
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-code-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   CODE WINDOW: COPY SNIPPET
   ========================================================================== */
function initCodeCopy() {
  const copyBtn = document.getElementById('copy-code-btn');
  const codeBody = document.getElementById('code-body');

  if (!copyBtn || !codeBody) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = codeBody.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span style="color: #10b981">Copied!</span>
      `;
      showToast('Code copied to clipboard! 📋');
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
      }, 2000);
    }).catch(() => {
      showToast('Could not copy to clipboard.');
    });
  });
}

/* ==========================================================================
   HERO AVATAR TOGGLE (ILLUSTRATION <-> REAL PHOTO)
   ========================================================================== */
function initAvatarToggle() {
  const avatarDisc = document.getElementById('avatar-disc');
  const toggleBtn = document.getElementById('avatar-toggle-btn');

  if (!avatarDisc) return;

  const toggleAvatar = () => {
    avatarDisc.classList.toggle('show-real');
    const isReal = avatarDisc.classList.contains('show-real');
    if (toggleBtn) {
      toggleBtn.textContent = isReal ? 'Switch to Cyber Avatar ⚡' : 'Switch to Real Photo 📷';
    }
    showToast(isReal ? 'Switched to Real Photo' : 'Switched to Cyber Illustration');
  };

  avatarDisc.addEventListener('click', toggleAvatar);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAvatar();
    });
  }
}

/* ==========================================================================
   PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   COPY EMAIL CLIPBOARD TOAST
   ========================================================================== */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-action');
  const email = 'pranishprajapati721@gmail.com';

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: ' + email + ' 📬');
      }).catch(() => {
        showToast('Direct email: ' + email);
      });
    });
  });
}

/* ==========================================================================
   MONITOR SIMULATION LIVE CLOCK
   ========================================================================== */
function initMonitorClock() {
  const clockEl = document.getElementById('monitor-clock');
  if (!clockEl) return;

  const updateClock = () => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `UTC ${utcHours}:${utcMinutes}:${utcSeconds}`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
