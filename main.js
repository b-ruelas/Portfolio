/* ============================================
   BRAYAN RUELAS — PORTFOLIO JS
   ============================================ */

// ——— MOBILE NAV ———
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ——— ACTIVE ROLE CYCLING ———
const roles = document.querySelectorAll('.role-item');
let currentRole = 0;

setInterval(() => {
  roles[currentRole].classList.remove('active');
  currentRole = (currentRole + 1) % roles.length;
  roles[currentRole].classList.add('active');
}, 2200);

// ——— COUNTER ANIMATION ———
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + '+';
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ——— SECTION FADE IN ———
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-group, .project-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// ——— PROJECTS MANAGEMENT ———
const addProjectBtn = document.getElementById('addProjectBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const cancelBtn = document.getElementById('cancelBtn');
const saveProjectBtn = document.getElementById('saveProjectBtn');
const projectsGrid = document.getElementById('projectsGrid');
const emptyHint = document.getElementById('emptyHint');

let projects = loadProjects();
renderExistingProjects();

function openModal() {
  modalOverlay.classList.add('open');
  document.getElementById('projTitle').focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  clearForm();
}

addProjectBtn?.addEventListener('click', openModal);
modalClose?.addEventListener('click', closeModal);
cancelBtn?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

saveProjectBtn?.addEventListener('click', () => {
  const title = document.getElementById('projTitle').value.trim();
  const desc = document.getElementById('projDesc').value.trim();

  if (!title || !desc) {
    document.getElementById('projTitle').style.borderColor = !title ? '#ff4444' : '';
    document.getElementById('projDesc').style.borderColor = !desc ? '#ff4444' : '';
    return;
  }

  const project = {
    id: Date.now(),
    title,
    desc,
    category: document.getElementById('projCategory').value,
    tech: document.getElementById('projTech').value.split(',').map(t => t.trim()).filter(Boolean),
    github: document.getElementById('projGithub').value.trim(),
    demo: document.getElementById('projDemo').value.trim(),
  };

  addProjectCard(project);
  saveProjects();
  closeModal();
  checkEmpty();
});

function addProjectCard(project) {
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.dataset.category = project.category;
  card.dataset.id = project.id;

  const techHtml = project.tech.map(t => `<span>${t}</span>`).join('');
  const linksHtml = [
    project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub →</a>` : '',
    project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">Live →</a>` : '',
  ].filter(Boolean).join('');

  card.innerHTML = `
    <div class="project-category">${project.category}</div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-desc">${project.desc}</p>
    <div class="project-tech">${techHtml}</div>
    <div class="project-links">${linksHtml || '<span style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono);">No links added</span>'}</div>
    <button class="delete-btn" title="Remove project">✕</button>
  `;

  card.querySelector('.delete-btn').addEventListener('click', () => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'all 0.2s';
    setTimeout(() => {
      card.remove();
      projects = projects.filter(p => p.id !== project.id);
      saveProjects();
      checkEmpty();
    }, 200);
  });

  // Animate in
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  projectsGrid.appendChild(card);
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  if (!projects.find(p => p.id === project.id)) {
    projects.push(project);
  }
}

function clearForm() {
  ['projTitle', 'projDesc', 'projTech', 'projGithub', 'projDemo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.style.borderColor = ''; }
  });
  const cat = document.getElementById('projCategory');
  if (cat) cat.value = 'Backend';
}

function checkEmpty() {
  const cards = projectsGrid.querySelectorAll('.project-card');
  emptyHint.style.display = cards.length === 0 ? 'block' : 'none';
}

function saveProjects() {
  try {
    localStorage.setItem('br_projects', JSON.stringify(projects));
  } catch(e) { /* localStorage unavailable */ }
}

function loadProjects() {
  try {
    return JSON.parse(localStorage.getItem('br_projects') || '[]');
  } catch(e) { return []; }
}

function renderExistingProjects() {
  projects.forEach(p => addProjectCard(p));
}

// ——— NAV SCROLL EFFECT ———
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(8, 12, 16, 0.95)';
  } else {
    nav.style.background = 'rgba(8, 12, 16, 0.8)';
  }
});

// ——— CONTACT FORM ———
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sent! ✓';
  btn.style.background = 'var(--accent-2)';
  btn.style.color = 'var(--bg)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
});
