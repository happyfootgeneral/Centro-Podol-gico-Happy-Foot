/* Happy Foot — JS compartido por todas las páginas */
(function () {
  'use strict';

  /* ===================== CONFIGURACIÓN CENTRAL ===================== */
  var CONFIG = {
    sedes: [
      { id: 'huanta', nombre: 'Huanta', whatsapp: '51998825963', telefono: '998825963' },
      { id: 'ate', nombre: 'Ate Vitarte', whatsapp: '51944208315', telefono: '944208315' },
      { id: 'santa-anita', nombre: 'Santa Anita', whatsapp: '51990063479', telefono: '990063479' }
    ],
    linkResenasGoogle: ''
  };
  var MENSAJE_GENERICO = 'Hola Happy Foot, quiero reservar una cita.';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var waUrl = function (numero, mensaje) { return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensaje); };
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===================== IMÁGENES: FALLBACK ===================== */
  $$('img.js-img-fallback').forEach(function (img) {
    var fb = img.getAttribute('data-fallback');
    img.addEventListener('error', function handler() {
      img.removeEventListener('error', handler);
      if (fb) {
        img.src = fb;
        img.addEventListener('error', function () { img.classList.add('img-error'); }, { once: true });
      } else {
        img.classList.add('img-error');
      }
    });
  });

  /* ===================== MENÚ ===================== */
  var hamburger = $('#hamburger');
  var mainNav = $('#mainNav');
  var header = $('#header');

  function openMenu() {
    mainNav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú de navegación');
    document.body.classList.add('menu-open');
    var first = mainNav.querySelector('a');
    if (first) first.focus();
  }
  function closeMenu(returnFocus) {
    if (!mainNav || !mainNav.classList.contains('open')) return;
    mainNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.classList.remove('menu-open');
    if (returnFocus) hamburger.focus();
  }
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mainNav.classList.contains('open')) closeMenu(); else openMenu();
    });
    $$('a', mainNav).forEach(function (a) { a.addEventListener('click', function () { closeMenu(); }); });
    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
    });
    // Mantener el foco dentro del menú abierto (Tab / Shift+Tab)
    mainNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mainNav.classList.contains('open')) return;
      var items = $$('a, button', mainNav).filter(function (el) { return el.offsetParent !== null; });
      items.push(hamburger);
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && i === 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 2) { e.preventDefault(); hamburger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1279) closeMenu(); });
  }

  /* ===================== WHATSAPP: SELECTOR DE SEDE ===================== */
  var whatsappToggle = $('#whatsappToggle');
  var whatsappPanel = $('#whatsappPanel');
  var whatsappOptions = $('#whatsappOptions');
  var whatsappPanelSub = $('#whatsappPanelSub');

  function generarOpcionesWhatsApp(mensajeBase) {
    if (!whatsappOptions) return;
    whatsappOptions.innerHTML = '';
    CONFIG.sedes.forEach(function (sede) {
      var a = document.createElement('a');
      a.href = waUrl(sede.whatsapp, mensajeBase);
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'whatsapp-option';
      a.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i><div><div class="city">' + sede.nombre +
        '</div><div class="number">' + sede.telefono + '</div></div>';
      whatsappOptions.appendChild(a);
    });
  }
  function abrirSelectorWhatsApp(mensaje) {
    var msg = mensaje || MENSAJE_GENERICO;
    generarOpcionesWhatsApp(msg);
    whatsappPanelSub.textContent = msg.length > 70 ? 'Elige la sede para continuar por WhatsApp' : msg;
    whatsappPanel.classList.add('active');
    whatsappToggle.setAttribute('aria-expanded', 'true');
    var first = whatsappOptions.querySelector('a');
    if (first) setTimeout(function () { first.focus(); }, 50);
  }
  function cerrarSelectorWhatsApp() {
    if (!whatsappPanel) return;
    whatsappPanel.classList.remove('active');
    whatsappToggle.setAttribute('aria-expanded', 'false');
  }
  if (whatsappToggle && whatsappPanel) {
    generarOpcionesWhatsApp(MENSAJE_GENERICO);
    whatsappToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (whatsappPanel.classList.contains('active')) cerrarSelectorWhatsApp(); else abrirSelectorWhatsApp(MENSAJE_GENERICO);
    });
    whatsappPanel.addEventListener('click', function (e) {
      if (e.target.closest('.whatsapp-option')) setTimeout(cerrarSelectorWhatsApp, 150);
      e.stopPropagation();
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('.js-open-wa-selector')) return;
      cerrarSelectorWhatsApp();
    });
    $$('.js-open-wa-selector').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        abrirSelectorWhatsApp(btn.getAttribute('data-wa-msg') || MENSAJE_GENERICO);
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (whatsappPanel && whatsappPanel.classList.contains('active')) { cerrarSelectorWhatsApp(); whatsappToggle.focus(); }
      closeMenu(true);
    }
  });

  /* ===================== HEADER AL HACER SCROLL + VOLVER ARRIBA ===================== */
  var backToTop = $('#backToTop');
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (backToTop) backToTop.classList.toggle('visible', y > 500);
    parallax(y);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  if (backToTop) backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ===================== PARALLAX (solo fondos y decoraciones) =====================
     Se aplica únicamente a elementos con [data-depth] (manchas de color, anillos,
     marcos decorativos). Las fotos reales y el logo nunca se mueven. */
  var layers = prefersReduced ? [] : $$('[data-depth]');
  function parallax(y) {
    if (!layers.length) return;
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var host = el.closest('.layered') || el.parentElement;
      var r = host.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var depth = parseFloat(el.getAttribute('data-depth')) || 0;
      var offset = (r.top + r.height / 2 - vh / 2) * depth * -1;
      el.style.setProperty('--py', offset.toFixed(1) + 'px');
    });
  }
  onScroll();

  /* ===================== ANIMACIONES DE ENTRADA ESCALONADAS ===================== */
  $$('.stagger').forEach(function (group) {
    $$(':scope > .reveal', group).forEach(function (el, i) { el.style.setProperty('--d', (i * 90) + 'ms'); });
  });
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ===================== PREGUNTAS FRECUENTES ===================== */
  $$('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var isActive = item.classList.contains('active');
      $$('.faq-item').forEach(function (i) {
        i.classList.remove('active');
        var q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) { item.classList.add('active'); button.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ===================== CARRUSEL DE EVOLUCIÓN =====================
     Sin reproducción automática: las fotos solo cambian cuando el visitante lo pide. */
  (function initCarousel() {
    var carousel = $('#hfCarousel'), track = $('#hfTrack'), dotsWrap = $('#hfDots');
    var prevBtn = $('#hfPrev'), nextBtn = $('#hfNext');
    if (!carousel || !track || !dotsWrap || !prevBtn || !nextBtn) return;
    var slides = $$('.hf-slide', track);
    if (!slides.length) return;
    var total = slides.length, current = 0;
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hf-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir al caso ' + (i + 1));
      dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = $$('.hf-dot', dotsWrap);
    function updateDots(idx) {
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
        d.setAttribute('aria-current', i === idx ? 'true' : 'false');
      });
      current = idx;
    }
    function goTo(idx) {
      var i = Math.max(0, Math.min(total - 1, idx));
      var slide = slides[i];
      track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: prefersReduced ? 'auto' : 'smooth' });
      updateDots(i);
    }
    prevBtn.addEventListener('click', function () { goTo(current - 1 < 0 ? total - 1 : current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1 > total - 1 ? 0 : current + 1); });
    var raf = null;
    track.addEventListener('scroll', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var center = track.scrollLeft + track.clientWidth / 2, best = 0, bestDist = Infinity;
        slides.forEach(function (s, i) {
          var d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        if (best !== current) updateDots(best);
      });
    }, { passive: true });
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevBtn.click(); }
    });
  })();

  /* ===================== RESEÑAS DE GOOGLE (oculto si no hay enlace) ===================== */
  var btnResenas = $('#btnVerResenasGoogle');
  if (btnResenas && CONFIG.linkResenasGoogle) {
    btnResenas.hidden = false;
    btnResenas.addEventListener('click', function () { window.open(CONFIG.linkResenasGoogle, '_blank', 'noopener'); });
  }

  /* ===================== FORMULARIO → WHATSAPP ===================== */
  var contactForm = $('#contactForm');
  var formMessage = $('#formMessage');
  function mostrarError(msg) { formMessage.className = 'form-message error'; formMessage.textContent = msg; }
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = $('#nombre').value.trim();
      var celular = $('#celular').value.trim();
      var sedeId = $('#sede').value;
      var servicio = $('#servicio').value;
      var mensaje = $('#mensaje').value.trim();
      if (!nombre) { mostrarError('Por favor, ingresa tu nombre completo.'); $('#nombre').focus(); return; }
      var phoneDigits = celular.replace(/\D/g, '');
      if (phoneDigits.length < 9 || phoneDigits.length > 12) { mostrarError('Por favor, ingresa un número de celular válido (9 a 12 dígitos).'); $('#celular').focus(); return; }
      if (!sedeId) { mostrarError('Por favor, selecciona una sede.'); $('#sede').focus(); return; }
      if (!servicio) { mostrarError('Por favor, selecciona un servicio de interés.'); $('#servicio').focus(); return; }
      if (!mensaje) { mostrarError('Por favor, escribe tu mensaje o consulta.'); $('#mensaje').focus(); return; }
      var sede = CONFIG.sedes.filter(function (s) { return s.id === sedeId; })[0];
      if (!sede) { mostrarError('La sede seleccionada no está disponible.'); return; }
      var texto = 'Hola Happy Foot, quiero hacer una consulta.\n\n' +
        'Nombre: ' + nombre + '\n' + 'Celular: ' + celular + '\n' +
        'Sede de preferencia: ' + sede.nombre + '\n' + 'Servicio de interés: ' + servicio + '\n' + 'Mensaje: ' + mensaje;
      var url = 'https://wa.me/51' + sede.telefono + '?text=' + encodeURIComponent(texto);
      var win = null;
      try { win = window.open(url, '_blank'); } catch (err) { win = null; }
      formMessage.className = 'form-message success';
      if (win) {
        formMessage.innerHTML = 'Gracias. Tu consulta está lista y se abrirá WhatsApp en una nueva pestaña. Si no ocurre, <a href="' + url + '" target="_blank" rel="noopener">haz clic aquí</a>.';
        contactForm.reset();
        setTimeout(function () { formMessage.className = 'form-message'; formMessage.textContent = ''; }, 8000);
      } else {
        formMessage.innerHTML = 'Tu consulta está lista. <a href="' + url + '" target="_blank" rel="noopener">Haz clic aquí para abrir WhatsApp</a>.';
      }
    });
  }

  /* ===================== AÑO DEL PIE DE PÁGINA ===================== */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
