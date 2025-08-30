document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.innerHTML = '↑';
  backToTopButton.title = 'Back to top';
  backToTopButton.style.opacity = '0';
  backToTopButton.style.transition = 'opacity 0.3s ease-in-out';
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.pointerEvents = 'auto';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.pointerEvents = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
      behavior: 'smooth'
    });
  });

  // Intersection Observer for scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize animations
  animateOnScroll();

  // Handle mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });

  // Add animation delay to elements with data-delay attribute
  document.querySelectorAll('[data-delay]').forEach(element => {
    const delay = element.getAttribute('data-delay');
    element.style.animationDelay = `${delay}ms`;
  });

  // Parallax effect for elements with data-parallax attribute
  const handleParallax = () => {
    document.querySelectorAll('[data-parallax]').forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.3;
      const scrollY = window.pageYOffset;
      const offset = scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', handleParallax);
  window.addEventListener('resize', handleParallax);

  // Initialize tooltips
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);

    const updateTooltipPosition = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      
      tooltip.style.left = `${x - (tooltipWidth / 2)}px`;
      tooltip.style.top = `${y - tooltipHeight - 10}px`;
    };

    element.addEventListener('mouseenter', (e) => {
      tooltip.classList.add('visible');
      updateTooltipPosition(e);
    });

    element.addEventListener('mousemove', updateTooltipPosition);
    element.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });

  // Add loading animation to buttons with loading class
  document.querySelectorAll('.btn-loading').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('loading');
      this.setAttribute('disabled', 'disabled');
      
      // Simulate loading (remove this in production)
      setTimeout(() => {
        this.classList.remove('loading');
        this.removeAttribute('disabled');
      }, 2000);
    });
  });

  // Initialize AOS (Animate On Scroll) for elements with data-aos attribute
  const initAOS = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
      element.classList.add('aos-item');
      observer.observe(element);
    });
  };

  initAOS();

  // Handle form submissions with loading states
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.classList.add('loading');
        submitButton.setAttribute('disabled', 'disabled');
      }
      
      // In a real application, you would handle the form submission with fetch or XMLHttpRequest
      // and remove the loading state in the response/error handlers
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // Initialize counters with count-up animation
  const initCounters = () => {
    const counterElements = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-target'));
          const duration = parseInt(target.getAttribute('data-duration')) || 2000;
          const steps = 50;
          const stepValue = targetValue / steps;
          let currentValue = 0;
          
          const interval = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(interval);
            }
            target.textContent = Math.round(currentValue);
          }, duration / steps);
          
          observer.unobserve(target);
        }
      });
    }, {
      threshold: 0.5
    });

    counterElements.forEach(counter => {
      observer.observe(counter);
    });
  };

  initCounters();
});
