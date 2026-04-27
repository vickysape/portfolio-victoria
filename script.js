// ============================================
//   VICTORIA SAPELLI — PORTFOLIO SCRIPTS
// ============================================

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(8, 11, 18, 0.95)';
  } else {
    navbar.style.background = 'rgba(8, 11, 18, 0.7)';
  }
});

// ===== ACCENT LINE TEXT CLONE =====
document.querySelectorAll('.accent-line').forEach(el => {
  el.setAttribute('data-text', el.textContent);
});

// ===== SCROLL REVEAL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(
  '.info-card, .skill-category, .timeline-content, .project-card, .cert-card, .contact-card, .about-text p, .section-header'
);

animatedElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`;
  observer.observe(el);
});

const styleSheet = document.createElement('style');
styleSheet.textContent = `.in-view { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleSheet);

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      if (!link.classList.contains('nav-cta')) {
        link.style.color = 'var(--accent)';
      }
    }
  });
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});


// ============================================
//               💬 CHAT IA
// ============================================

async function sendMessage(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("Error chat:", error);
    return "Error conectando con el asistente.";
  }
}

// conectar UI del chat
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chatInput");
  const button = document.getElementById("sendBtn");
  const box = document.getElementById("chatBox");

  if (!input || !button || !box) return;

  button.addEventListener("click", async () => {
    const message = input.value.trim();
    if (!message) return;

    // mensaje usuario
    box.innerHTML += `<div class="msg user">${message}</div>`;
    input.value = "";

    // loader
    const loading = document.createElement("div");
    loading.className = "msg bot";
    loading.textContent = "Escribiendo...";
    box.appendChild(loading);

    const reply = await sendMessage(message);

    loading.textContent = reply;
  });
});
