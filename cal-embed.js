// cal-embed.js — self-mounting Cal.com inline booking embed.
// Mounts into every <div class="cal-embed-mount" data-location="..."> found on the page.

(function () {
  const CAL_LINK = 'akshatkharbanda/30min';
  const CAL_NS = '30min';

  // Cal.com loader (verbatim from their official embed snippet).
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");

  function trackEvent(name, data) {
    if (typeof window.va === 'function') {
      window.va('event', { name, data });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mounts = document.querySelectorAll('.cal-embed-mount');
    if (!mounts.length) return;

    window.Cal('init', CAL_NS, { origin: 'https://cal.com' });

    mounts.forEach(function (mount, i) {
      if (!mount.id) mount.id = 'cal-inline-' + i;
      window.Cal.ns[CAL_NS]('inline', {
        elementOrSelector: '#' + mount.id,
        config: { layout: 'month_view' },
        calLink: CAL_LINK,
      });
    });

    window.Cal.ns[CAL_NS]('ui', { hideEventTypeDetails: false, layout: 'month_view' });

    window.Cal.ns[CAL_NS]('on', {
      action: 'bookingSuccessful',
      callback: function () {
        const loc = (document.querySelector('.cal-embed-mount') || {}).dataset;
        trackEvent('cal_booking', { location: (loc && loc.location) || 'unknown' });
      },
    });
  });
})();
