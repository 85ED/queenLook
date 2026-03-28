document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('#navMenu a');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('serviceModal');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const serviceButtons = document.querySelectorAll('[data-service]');
  const heroSlides = document.querySelectorAll('.hero-slide');

  const serviceDetails = {
    botox: {
      title: 'Botox (toxina botulínica)',
      description:
        'Suavize linhas de expressão com aplicação de toxina botulínica no Tatuapé. Procedimento seguro, com avaliação individualizada, que proporciona aparência mais jovem e natural, sem abrir mão da expressividade quando bem indicado.'
    },
    'preenchimento-labial': {
      title: 'Preenchimento labial',
      description:
        'Realce o volume e contorno dos lábios com preenchimento labial no Tatuapé, garantindo harmonia facial e resultados naturais. Técnica refinada para equilíbrio entre lábios e traços, com foco em segurança e naturalidade.'
    },
    rinomodelacao: {
      title: 'Rinomodelação (rinopreenchimento)',
      description:
        'Corrija imperfeições do nariz sem cirurgia com rinomodelação no Tatuapé. Resultado imediato, sem tempo de recuperação como em cirurgias, com planejamento para um perfil harmonioso e alinhado ao restante do rosto.'
    },
    'harmonizacao-labial': {
      title: 'Harmonização labial',
      description:
        'Equilíbrio de cor e forma dos lábios no Tatuapé, com técnica micropigmentar precisa. Indicado para uniformizar tons, definir contorno com naturalidade e integrar o sorriso ao restante da estética facial, sempre com avaliação prévia.'
    },
    'revitalizacao-labial': {
      title: 'Revitalização labial',
      description:
        'Protocolo para devolver viço e aparência saudável aos lábios em São Paulo, ideal como preparação ou manutenção após harmonização ou micropigmentação. Atendimento personalizado e resultados discretos e elegantes.'
    },
    'micropigmentacao-labial': {
      title: 'Micropigmentação labial',
      description:
        'Definição duradoura de contorno e cor dos lábios em São Paulo, especialmente no Tatuapé, com técnica que valoriza simetria, conforto e um resultado natural no dia a dia, elevando sua autoestima.'
    },
    microblading: {
      title: 'Microblading fio a fio (hiper-realista)',
      description:
        'Sobrancelhas com aparência natural no Tatuapé: fios desenhados um a um para simular pelo real e emoldurar o olhar. Ideal para quem busca hiper-realismo e harmonia com o rosto, com técnica atualizada e segura.'
    },
    'shadow-line': {
      title: 'Shadow line (fio + sombra)',
      description:
        'Técnica combinada de fio e sombra para densidade e profundidade nas sobrancelhas, com acabamento suave e elegante no Tatuapé. Resultado dimensional e natural, respeitando seu formato e estilo.'
    },
    'cilios-hibrido': {
      title: 'Alongamento de cílios híbrido',
      description:
        'Olhar marcante e natural: mistura de fios para volume e definição, aplicada com segurança para valorizar seus cílios no Tatuapé. Conforto e durabilidade com visual equilibrado, sem exageros.'
    }
  };

  const isMobileNav = () => window.matchMedia('(max-width: 768px)').matches;

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove('is-open');
    if (navBackdrop) {
      navBackdrop.classList.remove('is-open');
      navBackdrop.setAttribute('aria-hidden', 'true');
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.add('is-open');
    if (navBackdrop) {
      navBackdrop.classList.add('is-open');
      navBackdrop.setAttribute('aria-hidden', 'false');
    }
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('nav-open');
  };

  const toggleMenu = () => {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (el && header) {
      window.scrollTo({
        top: el.offsetTop - header.offsetHeight,
        behavior: 'smooth'
      });
    }
  };

  document.querySelectorAll('.logo-link[href="#home"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      scrollToSection('home');
      closeMenu();
    });
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      toggleMenu();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      if (isMobileNav()) closeMenu();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const id = href.slice(1);
        scrollToSection(id);
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobileNav()) closeMenu();
  });

  if (heroSlides.length > 1) {
    let slideIndex = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setInterval(() => {
        heroSlides[slideIndex].classList.remove('is-active');
        slideIndex = (slideIndex + 1) % heroSlides.length;
        heroSlides[slideIndex].classList.add('is-active');
      }, 5000);
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'todos' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const serviceName = button.getAttribute('data-service');
      const service = serviceDetails[serviceName];

      if (service && !button.disabled) {
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  document.querySelectorAll('.modal-cta[href="#contato"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      closeModal();
      scrollToSection('contato');
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.65s ease forwards';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card').forEach(el => observer.observe(el));

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 120) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });
});
