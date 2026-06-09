/*1. HEADER SCROLL EFFECT*/
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  updateActiveNav();
});

/* 2. HAMBURGER MENU (MOBILE) */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/*3. ACTIVE NAV LINK berdasarkan posisi scroll */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const navEl  = document.querySelector(`.nav-link[href="#${id}"]`);

    if (navEl) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navEl.classList.add('active');
      }
    }
  });
}

/* 4. FILTER DOA BERDASARKAN KATEGORI */
const filterBtns = document.querySelectorAll('.filter-btn');
const doaCards   = document.querySelectorAll('.doa-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    doaCards.forEach(card => {
      const kategori = card.getAttribute('data-kategori');
      if (filter === 'semua' || kategori === filter) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* 5. TOGGLE DETAIL / FAEDAH DOA */
function toggleDetail(btn) {
  const card   = btn.closest('.doa-card');
  const detail = card.querySelector('.card-detail');

  if (detail.classList.contains('hidden')) {
    detail.classList.remove('hidden');
    btn.textContent = 'Sembunyikan';
    btn.style.background = '#0d7a5a';
    btn.style.color = '#fff';
  } else {
    detail.classList.add('hidden');
    btn.textContent = 'Lihat Manfaat';
    btn.style.background = '';
    btn.style.color = '';
  }
}

/* 6. COUNTER DZIKIR INTERAKTIF*/
const counters = {};

function hitungDzikir(id, maxCount, countElId, progElId) {
  if (!counters[id]) counters[id] = 0;

  if (counters[id] >= maxCount) {
    showNotifikasi('✅ Alhamdulillah! Dzikir sudah tercapai. Klik Reset untuk mulai lagi.');
    return;
  }

  counters[id]++;
  document.getElementById(countElId).textContent = counters[id];

  const persen = (counters[id] / maxCount) * 100;
  document.getElementById(progElId).style.width = persen + '%';

  if (counters[id] === maxCount) {
    showNotifikasi('✅ Alhamdulillah! Dzikir ke-' + id + ' selesai 🤲');
    document.getElementById(progElId).style.background = 'linear-gradient(90deg, #c8922a, #f0b429)';
  }
}

function resetDzikir(countElId, progElId) {
  
  const countEl = document.getElementById(countElId);
  const idNum   = countElId.replace('count', '');
  counters[idNum] = 0;

  countEl.textContent = '0';
  document.getElementById(progElId).style.width = '0%';
  document.getElementById(progElId).style.background = 'linear-gradient(90deg, #0d7a5a, #1aab7e)';
}

/* 7. NOTIFIKASI TOAST */
function showNotifikasi(pesan) {
  const old = document.querySelector('.toast-notif');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notif';
  toast.textContent = pesan;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    right: 24px;
    background: #0a5e45;
    color: #fff;
    padding: 13px 22px;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    z-index: 9999;
    transform: translateY(80px);
    opacity: 0;
    transition: all 0.35s ease;
    max-width: 340px;
    line-height: 1.5;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* 8. ANIMASI FADE IN SAAT SCROLL */
const elementsToAnimate = [
  '.doa-card',
  '.dzikir-card',
  '.keutamaan-card',
  '.wm-item',
  '.section-header',
  '.waktu-mustajab',
  '.tentang-text',
  '.tentang-card',
  '.hero-ayat'
];

elementsToAnimate.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-in');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* 9. SMOOTH SCROLL untuk tombol hero */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* 10. TAMPILKAN WAKTU SEKARANG (untuk sapaan di hero) */
function getSapaan() {
  const jam = new Date().getHours();
  if (jam >= 4  && jam < 12) return '🌅 Selamat Pagi';
  if (jam >= 12 && jam < 15) return '☀️ Selamat Siang';
  if (jam >= 15 && jam < 18) return '🌤 Selamat Sore';
  return '🌙 Selamat Malam';
}

console.log(getSapaan() + ' — Jangan lupa baca doa & dzikir hari ini! 🤲');
