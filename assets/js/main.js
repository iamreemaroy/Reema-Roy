function loadHTML(id, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(file + ' not found');
      return response.text();
    })
    .then(data => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = data;
      if (callback) callback();
    })
    .catch(error => console.error('Error loading:', error));
}

// IMPORTANT: paths updated for _includes folder
loadHTML("header-placeholder", "*/header.html");
loadHTML("footer-placeholder", "*/footer.html");

(function () {
  "use strict";

  /**
   * Init Header AFTER header.html loads
   */
  function initHeader() {
    const headerToggleBtn = document.querySelector('.header-toggle');
    const header = document.querySelector('#header');

    if (!headerToggleBtn || !header) return;

    function headerToggle() {
      header.classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }

    headerToggleBtn.addEventListener('click', headerToggle);

    // Close menu on nav click
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (header.classList.contains('header-show')) {
          headerToggle();
        }
      });
    });

    // Mobile dropdowns
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdown => {
      dropdown.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll Top Button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * AOS
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed.js
   */
  const typedEl = document.querySelector('.typed');
  if (typedEl && typeof Typed !== "undefined") {
    let strings = typedEl.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * PureCounter
   */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /**
   * Skills animation
   */
  document.querySelectorAll('.skills-animation').forEach(item => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * GLightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: '.glightbox' });
  }

  /**
   * Isotope
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    let layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') || '*';
    let sort = isotopeItem.getAttribute('data-sort') || 'original-order';

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      let iso = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(btn => {
        btn.addEventListener('click', function () {
          isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({ filter: this.getAttribute('data-filter') });
          aosInit();
        });
      });
    });
  });

  /**
   * Swiper
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(swiperEl => {
      let config = JSON.parse(
        swiperEl.querySelector('.swiper-config').innerHTML.trim()
      );
      new Swiper(swiperEl, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Scroll to hash on page load
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Scrollspy
   */
  const navLinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const pos = window.scrollY + 200;
      if (pos >= section.offsetTop && pos <= section.offsetTop + section.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
