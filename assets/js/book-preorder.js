/* ============================================================================
   FREE 2B ME - book reservation form
   ----------------------------------------------------------------------------
   Progressive enhancement only. Without JS the form is still complete and still
   submits: every quantity field is a real named input, the browser enforces the
   required name, email and acknowledgement, and Netlify captures the result.
   What this file adds is the running summary, the plain-language error handling,
   and the readable "selection" line that turns eight numeric fields into one
   sentence a human can act on in the notification email.

   PAYMENT - LOCKED. This form takes no money and must never appear to. There is
   no checkout, no card field and no payment provider on this page. The total is
   labelled an estimate precisely because it is not a charge: Tanya contacts the
   reader to arrange payment when the book they reserved launches.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('preorder-form');
  if (!form) return;

  var PRICE = 39;
  var CURRENCY = 'A$';

  var qtyInputs = Array.prototype.slice.call(form.querySelectorAll('.po-input'));
  if (!qtyInputs.length) return;

  var countEl     = document.getElementById('po-count');
  var totalEl     = document.getElementById('po-total');
  var errorEl     = document.getElementById('po-error');
  var selectionEl = document.getElementById('po-selection');
  var totalBooksEl= document.getElementById('po-total-books');
  var totalAudEl  = document.getElementById('po-total-aud');
  var nameEl      = document.getElementById('po-name');
  var emailEl     = document.getElementById('po-email');
  var consentEl   = document.getElementById('po-consent');

  /* A quantity is whatever survives being read as a whole number in range.
     Anything else (empty, text, negative, pasted decimal) settles at zero
     rather than rejecting the reader's input with a complaint. */
  function quantityOf(input) {
    var n = parseInt(input.value, 10);
    if (isNaN(n) || n < 0) return 0;
    return Math.min(n, 99);
  }

  function titleOf(input) {
    return input.getAttribute('name') || '';
  }

  function selected() {
    return qtyInputs
      .map(function (input) { return { title: titleOf(input), qty: quantityOf(input) }; })
      .filter(function (row) { return row.qty > 0; });
  }

  function formatMoney(amount) {
    return CURRENCY + amount.toLocaleString('en-AU');
  }

  /* One line a person can read in an email: "2 x FREE 2B ME, 1 x Built With You". */
  function describe(rows) {
    return rows.map(function (row) { return row.qty + ' x ' + row.title; }).join(', ');
  }

  function update() {
    var rows  = selected();
    var books = rows.reduce(function (sum, row) { return sum + row.qty; }, 0);
    var total = books * PRICE;

    if (countEl) {
      countEl.textContent = books === 0
        ? 'No books selected yet'
        : (books === 1 ? '1 book reserved' : books + ' books reserved');
    }
    if (totalEl) totalEl.textContent = formatMoney(total);

    /* Carried into the submission so the notification email is readable on its own. */
    if (selectionEl)  selectionEl.value  = describe(rows);
    if (totalBooksEl) totalBooksEl.value = String(books);
    if (totalAudEl)   totalAudEl.value   = String(total);

    /* Mark chosen rows so the selection is visible, not only countable. */
    qtyInputs.forEach(function (input) {
      var item = input.closest('.po-item');
      if (item) item.classList.toggle('is-chosen', quantityOf(input) > 0);
    });

    if (books > 0) clearError();
    return books;
  }

  function showError(message, focusTarget) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
    if (focusTarget && focusTarget.focus) focusTarget.focus({ preventScroll: false });
  }

  function clearError() {
    if (errorEl && !errorEl.hidden) { errorEl.hidden = true; errorEl.textContent = ''; }
  }

  qtyInputs.forEach(function (input) {
    input.addEventListener('input', update);
    input.addEventListener('change', function () {
      /* Normalise on the way out so the field never shows something it will not send. */
      input.value = String(quantityOf(input));
      update();
    });
  });

  [nameEl, emailEl].forEach(function (el) {
    el && el.addEventListener('input', clearError);
  });
  consentEl && consentEl.addEventListener('change', clearError);

  /* The form is novalidate so these messages read in our own voice rather than
     the browser's, and so the first unmet requirement is the one the reader is
     sent to - not whichever the browser happens to reach first. */
  form.addEventListener('submit', function (event) {
    var books = update();

    if (nameEl && !nameEl.value.trim()) {
      event.preventDefault();
      return showError('Please add your name so I know who the books are for.', nameEl);
    }
    if (emailEl && !emailEl.value.trim()) {
      event.preventDefault();
      return showError('Please add an email address so I can reach you when a book launches.', emailEl);
    }
    if (emailEl && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
      event.preventDefault();
      return showError('That email address looks incomplete. Please check it and try again.', emailEl);
    }
    if (books === 0) {
      event.preventDefault();
      var books_field = document.getElementById('po-books');
      return showError('Please choose at least one book, by setting its quantity to 1 or more.',
                       books_field && books_field.querySelector('.po-input'));
    }
    if (consentEl && !consentEl.checked) {
      event.preventDefault();
      return showError('Please confirm you understand this is a reservation and not a purchase.', consentEl);
    }

    clearError();
  });

  update();
})();
