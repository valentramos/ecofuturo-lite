/*
 * Modo demo (solo lectura) para publicar CLICK Financiero en GitHub Pages sin backend.
 *
 * Se carga ANTES de los bundles de Angular y:
 *  1. Intercepta las llamadas XHR al API original y responde con datos locales.
 *     Nada se envía ni se guarda en ningún servidor.
 *  2. Reemplaza los videos que estaban en S3 (ya no existen) por un aviso.
 *  3. Desactiva el inicio de sesión y el registro: "QUIERO INICIAR" lleva al Módulo 1.
 */
(function () {
  'use strict';

  var API_PATTERN = /\/api\/v1\//i;
  var DISABLED_MSG = 'Esta función no está disponible en la versión demo de solo lectura.';

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function parseBody(body) {
    try { return typeof body === 'string' ? JSON.parse(body) : (body || {}); } catch (e) { return {}; }
  }

  function handleApi(url, body) {
    var payload = parseBody(body);
    if (/QuestionsAndAswers/i.test(url)) {
      var questions = (window.DEMO_QUIZZES || {})[payload.moduleNumber];
      if (questions) return { status: 200, body: { data: { questions: clone(questions) }, message: 'OK' } };
      return { status: 404, body: { message: 'Quiz no disponible en la versión demo.' } };
    }
    if (/AnswerQuestion/i.test(url)) {
      // Respuesta exitosa simulada: no se persiste nada.
      return { status: 200, body: { data: true, message: 'OK' } };
    }
    return { status: 503, body: { message: DISABLED_MSG } };
  }

  // 1. Mock de XMLHttpRequest para el API
  var XHR = window.XMLHttpRequest;
  var proto = XHR.prototype;
  var origOpen = proto.open;
  var origSend = proto.send;
  var origSetHeader = proto.setRequestHeader;

  proto.open = function (method, url) {
    this.__demoUrl = String(url);
    this.__demoMock = API_PATTERN.test(this.__demoUrl);
    if (!this.__demoMock) return origOpen.apply(this, arguments);
  };

  proto.setRequestHeader = function () {
    if (!this.__demoMock) return origSetHeader.apply(this, arguments);
  };

  proto.send = function (body) {
    if (!this.__demoMock) return origSend.apply(this, arguments);
    var xhr = this;
    var res = handleApi(xhr.__demoUrl, body);
    var text = JSON.stringify(res.body);
    setTimeout(function () {
      var props = {
        readyState: 4,
        status: res.status,
        statusText: res.status === 200 ? 'OK' : 'Demo',
        responseText: text,
        response: text,
        responseURL: xhr.__demoUrl
      };
      Object.keys(props).forEach(function (k) {
        Object.defineProperty(xhr, k, { value: props[k], configurable: true });
      });
      xhr.getAllResponseHeaders = function () { return 'content-type: application/json\r\n'; };
      xhr.getResponseHeader = function (h) { return /content-type/i.test(h) ? 'application/json' : null; };
      ['readystatechange', 'load', 'loadend'].forEach(function (type) {
        xhr.dispatchEvent(new Event(type));
      });
    }, 250);
  };

  // 2. Videos externos (S3) -> aviso
  var VIDEO_TITLES = [
    [/SISTEMA.?FINANCIERO/i, 'El Sistema Financiero'],
    [/ALCANCE/i, 'Alcance de la Normativa'],
    [/GARANTE/i, '¿Qué es ser garante?'],
    [/BENEFICIOS/i, 'Beneficios de los Instrumentos Electrónicos de Pago'],
    [/SEGURIDAD/i, 'Medidas de seguridad para medios de pago'],
    [/CAJEROS/i, 'Uso de cajeros automáticos']
  ];

  function videoTitle(src) {
    var name = decodeURIComponent(src);
    for (var i = 0; i < VIDEO_TITLES.length; i++) {
      if (VIDEO_TITLES[i][0].test(name)) return VIDEO_TITLES[i][1];
    }
    return 'Video del módulo';
  }

  function replaceVideo(video) {
    if (video.__demoDone) return;
    var source = video.querySelector('source');
    var src = (source && source.getAttribute('src')) || video.getAttribute('src') || '';
    if (!/amazonaws\.com/i.test(src)) return;
    video.__demoDone = true;
    if (source) source.removeAttribute('src');
    video.removeAttribute('src');
    try { video.load(); } catch (e) { /* noop */ }

    var box = document.createElement('div');
    box.className = 'demo-video-placeholder';
    box.setAttribute('role', 'note');
    box.innerHTML =
      '<i class="fa fa-film" aria-hidden="true"></i>' +
      '<strong></strong>' +
      '<span>Video no disponible en la versión demo: estaba alojado en un servidor externo que fue dado de baja.</span>';
    box.querySelector('strong').textContent = videoTitle(src);
    video.style.display = 'none';
    video.parentNode.insertBefore(box, video);

    // Oculta el botón de play personalizado del contenedor, si existe
    var wrap = video.closest('.video');
    if (wrap) wrap.classList.add('demo-video-wrap');
  }

  function scan(root) {
    if (!root.querySelectorAll) return;
    if (root.tagName === 'VIDEO') replaceVideo(root);
    var vids = root.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) replaceVideo(vids[i]);
  }

  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      for (var i = 0; i < m.addedNodes.length; i++) {
        var n = m.addedNodes[i];
        if (n.nodeType === 1) scan(n.tagName === 'SOURCE' ? n.parentNode : n);
      }
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  // 3. Login / registro desactivados: "QUIERO INICIAR" lleva al Módulo 1
  window.addEventListener('click', function (ev) {
    var el = ev.target.closest && ev.target.closest('[data-target=".login-modal"], [data-target=".register-modal"]');
    if (!el) return;
    ev.preventDefault();
    ev.stopPropagation();
    window.location.hash = '#/modulo-1';
    window.scrollTo(0, 0);
  }, true);

  // 4. Aviso legal: sitio no oficial (se muestra en la primera visita y se reabre desde la etiqueta)
  var NOTICE_KEY = 'demo-notice-dismissed';

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* noop */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var notice = document.createElement('div');
    notice.className = 'demo-notice';
    notice.id = 'demo-notice';
    notice.setAttribute('role', 'region');
    notice.setAttribute('aria-label', 'Aviso: sitio no oficial');
    notice.innerHTML =
      '<div class="demo-notice__body">' +
        '<strong class="demo-notice__title"><i class="fa fa-info-circle" aria-hidden="true"></i> Sitio de demostración no oficial</strong>' +
        '<p>Este es un sitio de demostración. <b>No es un sitio oficial.</b></p>' +
      '</div>' +
      '<button type="button" class="demo-notice__close">Entendido</button>';

    var badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'demo-badge';
    badge.textContent = 'Demo no oficial · solo lectura';
    badge.setAttribute('aria-controls', 'demo-notice');

    function setOpen(open) {
      notice.classList.toggle('is-open', open);
      badge.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    notice.querySelector('.demo-notice__close').addEventListener('click', function () {
      setOpen(false);
      storageSet(NOTICE_KEY, '1');
      badge.focus();
    });
    badge.addEventListener('click', function () {
      setOpen(!notice.classList.contains('is-open'));
    });

    document.body.appendChild(notice);
    document.body.appendChild(badge);
    setOpen(storageGet(NOTICE_KEY) !== '1');
  });
})();
