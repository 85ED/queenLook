document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card:not(.featured)');
  const modal = document.getElementById('serviceModal');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const serviceButtons = document.querySelectorAll('[data-service]');

  const serviceDetails = {
    cilios: {
      title: 'Extensão de Cílios',
      description: 'Oferecemos extensão de cílios fio a fio, volume brasileiro, volume russo e lifting de cílios. Nossos profissionais utilizam técnicas modernas e produtos de alta qualidade para garantir resultados naturais e duradouros. Realce seu olhar com segurança e conforto.'
    },
    sobrancelha: {
      title: 'Design de Sobrancelha',
      description: 'Design personalizado de sobrancelhas, micropigmentação fio a fio, henna e laminação. Analisamos seu formato de rosto para criar a moldura perfeita que realça sua beleza natural. Resultados impecáveis com técnicas atualizadas.'
    },
    massagem: {
      title: 'Massagem Terapêutica',
      description: 'Massagem relaxante, modeladora, desportiva e terapêutica. Nossos massoterapeias especializados aplicam técnicas que promovem relaxamento profundo, alívio de tensões e bem-estar físico e mental. Um momento de paz e renovação.'
    },
    podologia: {
      title: 'Podologia Especializada',
      description: 'Cuidados completos para seus pés: tratamento de calosidades, unhas encravadas, micose, e spa dos pés. Nossa podóloga qualificada oferece atendimento profissional com foco em saúde e estética, garantindo conforto e segurança.'
    },
    cabelo: {
      title: 'Tratamentos Capilares',
      description: 'Corte, coloração, mechas, alisamentos, tratamentos de reconstrução e hidratação profunda. Nossa equipe de cabeleireiros está sempre atualizada com as últimas tendências e técnicas para transformar seu cabelo dos sonhos em realidade.'
    },
    depilacao: {
      title: 'Depilação a Laser',
      description: 'Tecnologia de ponta em depilação a laser para remoção permanente de pelos. Equipamentos modernos que garantem eficácia e conforto durante o procedimento. Pele suave e livre de pelos por muito mais tempo.'
    },
    juridica: {
      title: 'Assessoria Jurídica',
      description: 'Consultoria jurídica especializada para profissionais de estética e beleza. Orientação sobre regulamentação, contratos, direitos e deveres, abertura de empresa e questões trabalhistas. Proteja seu negócio com segurança jurídica.'
    },
    'estetica-facial': {
      title: 'Estética Facial',
      description: 'Limpeza de pele profunda, peeling químico, microagulhamento, tratamentos anti-idade e lifting facial. Protocolos personalizados para cada tipo de pele, visando rejuvenescimento, luminosidade e saúde da pele do rosto.'
    },
    drenagem: {
      title: 'Drenagem Linfática',
      description: 'Técnica especializada de massagem que estimula o sistema linfático, promovendo eliminação de toxinas, redução de inchaço e retenção de líquidos. Ideal para pós-operatório e bem-estar geral. Em breve no Queen Look.'
    },
    reflexologia: {
      title: 'Reflexologia Podal',
      description: 'Terapia holística que trabalha pontos reflexos dos pés correspondentes a órgãos e sistemas do corpo. Promove relaxamento profundo, equilíbrio energético e bem-estar geral. Uma experiência única de autocuidado. Em breve no Queen Look.'
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }

        navMenu.classList.remove('active');
      }
    });
  });

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

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    observer.observe(el);
  });

  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });
});
