document.addEventListener('DOMContentLoaded', () => {
  
  // ===== 1. NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== 2. MODO OSCURO =====
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

  // ===== 3. MENÚ HAMBURGUESA =====
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

  // ===== 4. FADE UP & STAGGER (Intersection Observer) =====
  const faders = document.querySelectorAll('.fade-up');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach(fader => appearOnScroll.observe(fader));

  // ===== 5. FAQ ACCORDION (Robusto y corregido) =====
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Cerrar todos los demás
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Abrir el actual si no estaba activo
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ===== 6. FORMULARIO DE CONTACTO =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('.btn-submit');
      const originalText = btn.textContent;
      
      btn.textContent = '✓ Enviado correctamente';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
      }, 2500);
    });
  }

  // ===== 7. SMOOTH SCROLL =====
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

  // ===== 8. EFECTO COMBINADO: SPOTLIGHT + TILT 3D =====
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Para el efecto Spotlight (linterna)
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Para el efecto Tilt 3D (inclinación)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4; // Máximo 4 grados
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ===== 9. BOTONES MAGNÉTICOS =====
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ===== 10. PARALLAX SUAVE EN HERO =====
  const parallaxImg = document.querySelector('.parallax-img');
  if (parallaxImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      // Solo aplicar si estamos cerca del hero para ahorrar rendimiento
      if (scrolled < 800) {
        const rate = scrolled * 0.15;
        parallaxImg.style.transform = `translateY(${rate}px)`;
      }
    });
  }
});

  // ===== 6. FORMULARIO DE CONTACTO (ENVÍO REAL POR EMAIL) =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = e.target.querySelector('.btn-submit');
      const originalText = btn.textContent;
      
      // Estado de carga
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      // Recopilar datos del formulario
      const formData = new FormData(e.target);

      try {
        // ¡CAMBIA ESTE CORREO POR EL TUYO REAL!
        const response = await fetch("https://formsubmit.co/ajax/4a5a943aed6b11fe2ac30369dde8dbe0", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Éxito
          btn.textContent = '✓ Enviado correctamente';
          btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          btn.style.opacity = '1';
          e.target.reset(); // Limpiar formulario
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Error en el envío');
        }
      } catch (error) {
        // Error
        btn.textContent = '✗ Error al enviar. Intenta de nuevo.';
        btn.style.background = '#ef4444'; // Rojo de error
        btn.style.opacity = '1';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }