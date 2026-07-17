// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== MODO OSCURO =====
const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;
if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
}
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
    toggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    toggleBtn.textContent = '🌙';
  }
});

// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== FADE UP =====
const faders = document.querySelectorAll('.fade-up');
const appearOptions = { threshold: 0.12, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// ===== CONTADORES =====
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString() + (target === 98 ? '%' : target === 10 ? '+' : '+');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statNumbers.forEach(n => counterObserver.observe(n));

// ===== TESTIMONIOS =====
const testimonials = [
  { text: "“Nunca había visto mi casa tan limpia. El equipo es súper amable y detallista. ¡Los recomiendo al 100%!”", name: "María García", role: "Cliente frecuente", initials: "MG" },
  { text: "“Contraté la limpieza profunda después de una reforma y quedó impecable. Profesionales y responsables.”", name: "Carlos Mendoza", role: "Cliente verificado", initials: "CM" },
  { text: "“Me encanta que usen productos ecológicos, mi bebé puede gatear tranquilo. Servicio impecable.”", name: "Ana Lucía Romero", role: "Madre y cliente", initials: "AR" }
];
const slides = testimonials;
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const tText = document.getElementById('testimonialText');
const tName = document.getElementById('testimonialName');
const tRole = document.getElementById('testimonialRole');
const tAvatar = document.getElementById('testimonialAvatar');

function showSlide(index) {
  const t = slides[index];
  tText.style.opacity = 0;
  setTimeout(() => {
    tText.textContent = t.text;
    tName.textContent = t.name;
    tRole.textContent = t.role;
    tAvatar.textContent = t.initials;
    tText.style.opacity = 1;
  }, 200);
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
  currentSlide = index;
}
tText.style.transition = 'opacity 0.3s';
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    showSlide(parseInt(dot.getAttribute('data-slide')));
  });
});
setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 5000);

// ===== FAQ =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===== FORMULARIO =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = '✓ Enviado correctamente';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => {
    btn.textContent = originalText;
    e.target.reset();
  }, 2500);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});