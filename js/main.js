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

  /* ===================== HEADER AL HACER SCROLL + VOLVER ARRIBA =====================
     Un solo manejador pasivo, limitado a 1 vez por cuadro, que solo cambia clases
     cuando cambia el estado (sin leer tamaños del DOM). El parallax lo hace el CSS. */
  var backToTop = $('#backToTop');
  var ticking = false, wasScrolled = null, wasFar = null;
  function onScroll() {
    ticking = false;
    var y = window.pageYOffset;
    var s = y > 24, f = y > 500;
    if (s !== wasScrolled && header) { header.classList.toggle('scrolled', s); wasScrolled = s; }
    if (f !== wasFar && backToTop) { backToTop.classList.toggle('visible', f); wasFar = f; }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (backToTop) backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ===================== ZONAS ANIMADAS: SOLO SE MUEVEN SI SE VEN ===================== */
  if ('IntersectionObserver' in window) {
    var liveIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('live', e.isIntersecting); });
    }, { rootMargin: '120px 0px 120px 0px' });
    $$('.layered, .wave, .marquee, .acceso-grid').forEach(function (el) { liveIO.observe(el); });
  } else {
    $$('.layered, .wave, .marquee, .acceso-grid').forEach(function (el) { el.classList.add('live'); });
  }

  /* ===================== TÍTULOS PALABRA POR PALABRA ===================== */
  $$('h1.wsplit').forEach(function (h1) {
    if (prefersReduced) { h1.classList.add('is-split'); return; }
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var parts = c.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var w = document.createElement('span');
            w.className = 'w'; w.style.setProperty('--w', n++); w.textContent = p;
            frag.appendChild(w);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) {
          // Los textos con degradado (.highlight / em) se animan como un bloque
          if (c.matches('.highlight, em')) { c.classList.add('w'); c.style.setProperty('--w', n++); n += 1; }
          else walk(c);
        }
      });
    })(h1);
    h1.classList.add('is-split');
  });

  /* ===================== ANIMACIONES DE ENTRADA ESCALONADAS ===================== */
  var RV = '.reveal, .service-card, .location-card, .blog-card, .acceso-card, .ba-card, .sede-mini, .media-frame, .results-photo, .contact-form';
  $$('.stagger').forEach(function (group) {
    $$(':scope > .reveal', group).forEach(function (el, i) { el.style.setProperty('--d', (Math.min(i, 6) * 90) + 'ms'); });
  });
  // Tarjetas con foto en una grilla: entran una tras otra
  $$('.service-card, .location-card, .blog-card, .acceso-card, .ba-card, .sede-mini').forEach(function (el) {
    var sib = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.matches(RV); });
    el.style.setProperty('--d', (Math.min(sib.indexOf(el), 5) * 110) + 'ms');
  });
  // Tarjetas solo de texto: se inclinan con el ratón
  $$('.symptom-card, .type-card, .why-item, .stat-item, .process-step, .testimonial-card, .sede-mini').forEach(function (el) { el.classList.add('tilt'); });
  var revealEls = $$(RV);
  // Las fotos que ya están en pantalla al abrir la página se muestran de inmediato (carga más rápida)
  var vh0 = window.innerHeight;
  revealEls = revealEls.filter(function (el) {
    if (!el.querySelector('img') || el.getBoundingClientRect().top > vh0 * 0.9) return true;
    el.classList.add('visible', 'no-anim');
    return false;
  });
  function afterReveal(el) {
    // Sin retraso para el hover una vez que la tarjeta ya entró
    setTimeout(function () { el.style.setProperty('--d', '0ms'); }, 1300);
    $$('[data-count]', el).forEach(countUp);
    if (el.hasAttribute('data-count')) countUp(el);
  }
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); afterReveal(entry.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.06 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ===================== CONTADORES ===================== */
  function countUp(el) {
    if (el.__counted || prefersReduced) return;
    el.__counted = true;
    var to = parseInt(el.getAttribute('data-count'), 10), from = parseInt(el.getAttribute('data-from') || '0', 10);
    if (isNaN(to)) return;
    var t0 = 0, dur = 1400;
    el.textContent = from;
    (function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  /* ===================== INCLINACIÓN 3D (solo escritorio) ===================== */
  if (!prefersReduced && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.tilt').forEach(function (card) {
      var pend = null, ev = null;
      card.addEventListener('pointermove', function (e) {
        ev = e;
        if (pend) return;
        pend = requestAnimationFrame(function () {
          pend = null;
          var r = card.getBoundingClientRect();
          var nx = (ev.clientX - r.left) / r.width - 0.5, ny = (ev.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--ry', (nx * 10).toFixed(2) + 'deg');
          card.style.setProperty('--rx', (ny * -8).toFixed(2) + 'deg');
        });
      }, { passive: true });
      card.addEventListener('pointerleave', function () { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
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

  /* ===================== PARALLAX CON EL RATÓN (escritorio) =====================
     Solo escribe dos variables en la sección; el CSS mueve cada capa según su profundidad. */
  (function initPointerParallax() {
    if (prefersReduced) return;
    var fine = window.matchMedia && window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    if (!fine) return;
    $$('.hero.layered, .cta-band.layered, .page-hero.layered').forEach(function (host) {
      var pending = null, ev = null;
      host.classList.add('mouse-px');
      host.addEventListener('mousemove', function (e) {
        ev = e;
        if (pending) return;
        pending = requestAnimationFrame(function () {
          pending = null;
          var r = host.getBoundingClientRect();
          host.style.setProperty('--mx', ((ev.clientX - r.left) / Math.max(r.width, 1) - 0.5).toFixed(3));
          host.style.setProperty('--my', ((ev.clientY - r.top) / Math.max(r.height, 1) - 0.5).toFixed(3));
        });
      }, { passive: true });
      host.addEventListener('mouseleave', function () { host.style.setProperty('--mx', '0'); host.style.setProperty('--my', '0'); });
    });
  })();

  /* ===================== AÑO DEL PIE DE PÁGINA ===================== */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
