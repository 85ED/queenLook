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
  const modalCta = document.querySelector('.modal-cta');
  const serviceButtons = document.querySelectorAll('[data-service]');
  const heroSlides = document.querySelectorAll('.hero-slide');

  const serviceDetails = {
    'curso-sobrancelhas': {
      title: 'Curso de Micropigmentação e Design de Sobrancelhas',
      description:
        'Formação completa para quem deseja atuar na área da beleza. Aprenda técnicas de design de sobrancelhas, visagismo e micropigmentação, do básico ao avançado, com prática supervisionada e foco em resultados naturais e profissionais.'
    },
    'design-sobrancelhas': {
      title: 'Design de Sobrancelhas',
      description:
        'Valorize seu olhar com um design de sobrancelhas personalizado, respeitando o formato do seu rosto e buscando harmonia e definição natural.'
    },
    'preenchimento-labial': {
      title: 'Preenchimento labial',
      description:
        'Realce o volume e contorno dos lábios com harmonia facial e resultados naturais. Técnica refinada para equilíbrio entre lábios e traços, com foco em segurança e naturalidade.'
    },
    rinomodelacao: {
      title: 'Rinomodelação (rinopreenchimento)',
      description:
        'Corrija imperfeições do nariz sem cirurgia com planejamento individualizado. Resultado visível, sem tempo de recuperação como em cirurgias, para um perfil harmonioso e alinhado ao restante do rosto.'
    },
    'linhas-expressao': {
      title: 'Linhas de expressão (Botox)',
      description:
        'Suavização das linhas de expressão com aplicação de toxina botulínica, indicada conforme avaliação individual. Um cuidado personalizado para uma aparência natural e harmoniosa.'
    },
    'jato-plasma': {
      title: 'Jato de Plasma (remoção de verrugas)',
      description:
        'Remoção segura de verrugas, pintas e pequenas imperfeições da pele com tecnologia de jato de plasma. Procedimento rápido, eficaz e com excelente resultado estético. Avaliação individualizada para definir o melhor protocolo para o seu caso, com foco em segurança e acabamento natural.'
    },
    'revitalizacao-labial': {
      title: 'Revitalização labial',
      description:
        'Protocolo para devolver viço e aparência saudável aos lábios, ideal como preparação ou manutenção após harmonização ou micropigmentação. Atendimento personalizado e resultados discretos e elegantes.'
    },
    'micropigmentacao-labial': {
      title: 'Micropigmentação labial',
      description:
        'Definição duradoura de contorno e cor dos lábios, com técnica que valoriza simetria, conforto e um resultado natural no dia a dia.'
    },
    microblading: {
      title: 'Micropigmentação de Sobrancelhas (Fio a Fio)',
      description:
        'Realce suas sobrancelhas com a técnica fio a fio (microblading), que cria traços semelhantes aos pelos naturais para proporcionar mais definição e um resultado harmonioso, conforme avaliação profissional.'
    },
    'shadow-line': {
      title: 'Micropigmentação de Sobrancelhas — Shadow Line',
      description:
        'Técnica de micropigmentação que combina definição e efeito sombreado para realçar as sobrancelhas. O resultado é planejado conforme o formato do rosto e o estilo desejado.'
    },
    'cilios-hibrido': {
      title: 'Alongamento de cílios híbrido',
      description:
        'Olhar marcante e natural: mistura de fios para volume e definição, aplicada com segurança para valorizar seus cílios. Conforto e durabilidade com visual equilibrado, sem exageros.'
    }
  };

  const CLINIC_WHATSAPP_NUMBER = '5511972336835';
  const DEFAULT_WHATSAPP_MESSAGE = 'Olá, gostaria de agendar um atendimento.';

  const buildWhatsappUrl = serviceTitle => {
    const message = serviceTitle
      ? `Olá! Gostaria de saber mais sobre ${serviceTitle} e verificar os horários disponíveis para agendamento.`
      : DEFAULT_WHATSAPP_MESSAGE;
    return `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const revealDelayedWidget = (element, visibleClass = 'is-visible') => {
    if (!element) return;
    element.removeAttribute('hidden');
    element.hidden = false;
    element.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      element.classList.add(visibleClass);
    });
  };

  const hideDelayedWidget = (element, visibleClass = 'is-visible', sessionKey, persist = true) => {
    if (!element) return;
    element.classList.remove(visibleClass);
    element.setAttribute('aria-hidden', 'true');
    element.hidden = true;
    if (persist && sessionKey) {
      try {
        sessionStorage.setItem(sessionKey, '1');
      } catch {
        /* ignore */
      }
    }
  };

  const initDelayedWidgets = () => {
    const floatingPromo = document.getElementById('floatingPromo');
    const floatingPromoDismiss = document.getElementById('floatingPromoDismiss');
    const floatingPromoLink = document.getElementById('floatingPromoLink');
    const FLOATING_PROMO_SESSION_KEY = `queenlook_floating_promo_dismissed_v2:${window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/$/, '') || '/'}`;
    const FLOATING_PROMO_DELAY_MS = 2500;
    const PROMO_ASSET_MESSAGE = 'Olá! Gostaria de agendar um atendimento para Bot.ox.';

    const buildPromoAssetUrl = () =>
      `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(PROMO_ASSET_MESSAGE)}`;

    const showFloatingPromo = () => {
      if (!floatingPromo) return;
      try {
        if (sessionStorage.getItem(FLOATING_PROMO_SESSION_KEY)) return;
      } catch {
        /* ignore */
      }
      if (floatingPromoLink) {
        floatingPromoLink.setAttribute('href', buildPromoAssetUrl());
      }
      revealDelayedWidget(floatingPromo);
    };

    if (floatingPromo && document.body.classList.contains('page-linhas-expressao')) {
      const promoDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 500
        : FLOATING_PROMO_DELAY_MS;
      window.setTimeout(showFloatingPromo, promoDelay);

      if (floatingPromoDismiss) {
        floatingPromoDismiss.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          hideDelayedWidget(floatingPromo, 'is-visible', FLOATING_PROMO_SESSION_KEY, true);
        });
      }
    }

    const whatsappBubble = document.getElementById('whatsappBubble');
    const whatsappBubbleClose = document.getElementById('whatsappBubbleClose');
    const WHATSAPP_BUBBLE_KEY = 'queenlook_whatsapp_bubble_dismissed_v2';
    const WHATSAPP_BUBBLE_DELAY_MS = 8000;

    const showWhatsappBubble = () => {
      if (!document.body.classList.contains('page-home')) return;
      if (!whatsappBubble) return;
      try {
        if (sessionStorage.getItem(WHATSAPP_BUBBLE_KEY)) return;
      } catch {
        /* ignore */
      }
      revealDelayedWidget(whatsappBubble);
    };

    if (whatsappBubble) {
      const bubbleDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? WHATSAPP_BUBBLE_DELAY_MS + 3000
        : WHATSAPP_BUBBLE_DELAY_MS;
      window.setTimeout(showWhatsappBubble, bubbleDelay);

      if (whatsappBubbleClose) {
        whatsappBubbleClose.addEventListener('click', () => {
          hideDelayedWidget(whatsappBubble, 'is-visible', WHATSAPP_BUBBLE_KEY, true);
        });
      }

      const bubbleLink = whatsappBubble.querySelector('.whatsapp-widget-bubble-link');
      if (bubbleLink) {
        const botoxService = serviceDetails['linhas-expressao'];
        if (botoxService) {
          bubbleLink.setAttribute('href', buildWhatsappUrl(botoxService.title));
        }
        bubbleLink.addEventListener('click', () => {
          hideDelayedWidget(whatsappBubble, 'is-visible', WHATSAPP_BUBBLE_KEY, true);
        });
      }
    }
  };

  initDelayedWidgets();

  document.querySelectorAll('[data-whatsapp-service]').forEach(link => {
    const serviceKey = link.getAttribute('data-whatsapp-service');
    const service = serviceDetails[serviceKey];
    if (service) {
      link.setAttribute('href', buildWhatsappUrl(service.title));
    }
  });

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
      if (href && href.startsWith('https://wa.me')) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (modal?.classList.contains('active')) {
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

      if (service && !button.disabled && modal && modalTitle && modalDescription) {
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;
        if (modalCta) {
          modalCta.setAttribute('href', buildWhatsappUrl(service.title));
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  document.querySelectorAll('a.modal-cta').forEach(a => {
    a.addEventListener('click', () => {
      closeModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

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
    if (!header) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 120) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  const GOOGLE_ADS_WHATSAPP_CONVERSION = 'AW-17516149290/chPHCIDM_pMdEKr0rKBB';

  const isClinicWhatsappHref = href => {
    if (!href) return false;
    try {
      const url = new URL(href, window.location.href);
      const host = url.hostname.replace(/^www\./, '');
      if (host === 'wa.me') {
        const path = url.pathname.replace(/^\//, '');
        return path === CLINIC_WHATSAPP_NUMBER || path.startsWith(`${CLINIC_WHATSAPP_NUMBER}?`);
      }
      if (host === 'api.whatsapp.com') {
        const phone = (url.searchParams.get('phone') || '').replace(/\D/g, '');
        return phone === CLINIC_WHATSAPP_NUMBER;
      }
    } catch {
      return (
        href.includes(`wa.me/${CLINIC_WHATSAPP_NUMBER}`) ||
        href.includes(`phone=${CLINIC_WHATSAPP_NUMBER}`)
      );
    }
    return false;
  };

  const getWhatsappClickSource = link => {
    if (link.classList.contains('whatsapp-float')) return 'float_button';
    if (link.classList.contains('whatsapp-widget-bubble-link')) return 'bubble_cta';
    if (link.classList.contains('floating-promo__action')) return 'floating_promo';
    if (link.classList.contains('modal-cta')) return 'service_modal';
    if (link.classList.contains('hero-cta')) return 'hero';
    if (link.classList.contains('btn-cta')) return 'header_menu';
    if (link.closest('#contato')) return 'contact';
    if (link.closest('footer')) return 'footer_social';
    return 'other';
  };

  const WHATSAPP_TRACK_DEBUG =
    window.location.search.includes('whatsapp_track_debug=1') ||
    window.localStorage.getItem('whatsapp_track_debug') === '1';

  const clinicWhatsappLinks = [...document.querySelectorAll('a[href]')].filter(link =>
    isClinicWhatsappHref(link.getAttribute('href'))
  );

  if (WHATSAPP_TRACK_DEBUG) {
    console.info('[whatsapp-track] clinic links found:', clinicWhatsappLinks.length);
  }

  const openWhatsappLink = link => {
    const href = link.href;
    const target = link.getAttribute('target');
    if (target === '_blank') {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.assign(href);
  };

  const trackWhatsappEngagement = (link, onTracked) => {
    const source = getWhatsappClickSource(link);

    if (typeof gtag !== 'function') {
      if (WHATSAPP_TRACK_DEBUG) {
        console.warn('[whatsapp-track] gtag unavailable; skipping events');
      }
      onTracked?.();
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onTracked?.();
    };

    if (WHATSAPP_TRACK_DEBUG) {
      console.info('[whatsapp-track] click detected:', source, link.href);
    }

    gtag('event', 'whatsapp_click', {
      link_source: source
    });

    if (WHATSAPP_TRACK_DEBUG) {
      console.info('[whatsapp-track] whatsapp_click sent:', { link_source: source });
    }

    gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_WHATSAPP_CONVERSION,
      transport_type: 'beacon',
      event_callback: () => {
        if (WHATSAPP_TRACK_DEBUG) {
          console.info('[whatsapp-track] conversion sent:', {
            send_to: GOOGLE_ADS_WHATSAPP_CONVERSION
          });
        }
        finish();
      }
    });

    window.setTimeout(finish, 1000);
  };

  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a[href]');
      if (!link || !isClinicWhatsappHref(link.getAttribute('href'))) return;

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }

      event.preventDefault();
      trackWhatsappEngagement(link, () => openWhatsappLink(link));
    },
    true
  );

});
