/* ============================================================================
   FREE 2B ME - canonical mobile menu
   ----------------------------------------------------------------------------
   Builds the MENU trigger and the navigation panel from the .navlinks already in
   the page, so the panel can never drift out of step with the header: there is one
   list of routes in the markup and both surfaces read from it.

   Not loaded on the Book 1 landing page or the Sovereignty audit tool - both keep
   their own navigation deliberately.

   LABELLING - LOCKED. The panel wordmark is "FREE 2B ME" and the first route stays
   "Home". Do not rename Home to FREE 2B ME: brand identity and destination label do
   different jobs, and using the brand twice would make the reader work out whether it
   meant the brand, the ecosystem overview, or the home page.
   ========================================================================== */
(function () {
  'use strict';

  var bar = document.querySelector('nav.bar');
  var links = document.querySelector('.navlinks');
  if (!bar || !links || document.querySelector('.menu-panel')) return;

  /* ---- trigger --------------------------------------------------------- */
  var openBtn = document.createElement('button');
  openBtn.className = 'menu-open';
  openBtn.type = 'button';
  openBtn.setAttribute('aria-expanded', 'false');
  openBtn.setAttribute('aria-controls', 'f2bm-menu');
  openBtn.innerHTML = '<span class="bars" aria-hidden="true"><i></i></span>Menu';
  bar.appendChild(openBtn);

  /* ---- panel ----------------------------------------------------------- */
  var panel = document.createElement('div');
  panel.className = 'menu-panel';
  panel.id = 'f2bm-menu';
  panel.dataset.open = 'false';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Site menu');

  var head = document.createElement('div');
  head.className = 'menu-panel-head';
  head.innerHTML = '<span class="menu-panel-wordmark">Free 2B Me</span>';
  var closeBtn = document.createElement('button');
  closeBtn.className = 'menu-close';
  closeBtn.type = 'button';
  closeBtn.textContent = 'Close';
  head.appendChild(closeBtn);
  panel.appendChild(head);

  var list = document.createElement('nav');
  list.className = 'menu-list';
  list.setAttribute('aria-label', 'Site');

  Array.prototype.forEach.call(links.querySelectorAll('a'), function (src) {
    var a = document.createElement('a');
    a.href = src.getAttribute('href');
    a.textContent = (src.textContent || '').trim();
    /* Button classes are deliberately dropped. Inside the panel every route gets
       the same treatment - one active-state system, no oversized pill. */
    if (src.hasAttribute('aria-current')) {
      a.setAttribute('aria-current', src.getAttribute('aria-current'));
    }
    list.appendChild(a);
  });
  panel.appendChild(list);

  var accent = document.createElement('div');
  accent.className = 'menu-accent';
  accent.setAttribute('aria-hidden', 'true');
  panel.appendChild(accent);

  document.body.appendChild(panel);

  /* ---- behaviour ------------------------------------------------------- */
  var lastFocus = null;

  function focusables() {
    return panel.querySelectorAll('a[href], button');
  }

  function setOpen(open) {
    panel.dataset.open = open ? 'true' : 'false';
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      lastFocus = document.activeElement;
      closeBtn.focus();
    } else if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }

  openBtn.addEventListener('click', function () { setOpen(true); });
  closeBtn.addEventListener('click', function () { setOpen(false); });

  /* Following a link should close the panel, so an in-page anchor does not leave
     the menu covering the thing it just jumped to. */
  list.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (panel.dataset.open !== 'true') return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key !== 'Tab') return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Leaving mobile width with the panel open would strand it over the desktop nav. */
  var mq = window.matchMedia('(min-width:861px)');
  var onChange = function (e) { if (e.matches && panel.dataset.open === 'true') setOpen(false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
