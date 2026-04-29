// ============================================
//   VICTORIA SAPELLI — PORTFOLIO SCRIPTS
// ============================================

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(8, 11, 18, 0.95)';
    } else {
      navbar.style.background = 'rgba(8, 11, 18, 0.7)';
    }
  }
});

// ===== ACCENT LINE TEXT =====
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

// cerrar menú móvil al click fuera
document.addEventListener('click', (e) => {
  if (hamburger && mobileMenu && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});


// ============================================
//               💬 CHAT IA (CLAUDE)
// ============================================

async function sendMessage(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error("API_FAIL");

    const data = await res.json();
    
    // Si la respuesta es nula, muy corta, o contiene la palabra "error", activamos el respaldo
    const respuestaFalsa = !data.reply || data.reply.length < 5 || data.reply.toLowerCase().includes("error");

    if (respuestaFalsa) {
      throw new Error("REPLY_INVALID");
    }

    return data.reply;
  } catch (error) {
    // ESTO ES LO QUE VERÁ EL USUARIO SI ALGO FALLA (Modo Elegante)
    return "En este momento, mi asistente está en modo de simulación estratégica debido a la alta demanda. Sigo aquí para presentarte mi perfil y mis capacidades en ingeniería de software mientras se restablece el servicio completo.";
  }
}


// ============================================
//           💬 CHAT UI LOGIC
// ============================================

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


// ============================================
//           📦 GITHUB REPOS
// ============================================

async function loadGitHubRepos() {
  try {
    const res = await fetch("https://api.github.com/users/vickysape/repos");
    const repos = await res.json();

    const container = document.getElementById("repos");
    if (!container) return;

    container.innerHTML = "";

    repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "pcard";

        card.innerHTML = `
          <div class="ptop">
            <span class="pbadge">${repo.language || "Code"}</span>
            <a class="plink" href="${repo.html_url}" target="_blank">↗</a>
          </div>

          <h3>${repo.name}</h3>
          <p>${repo.description || "Sin descripción disponible"}</p>

          <div class="ptech">
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
          </div>
        `;

        container.appendChild(card);
      });

  } catch (error) {
    console.error("Error cargando repos:", error);
  }
}

// ejecutar al cargar página
document.addEventListener("DOMContentLoaded", () => {
  loadGitHubRepos();
});
