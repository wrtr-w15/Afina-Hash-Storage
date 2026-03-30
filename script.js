(function () {
  'use strict';

  var input  = document.getElementById('hash-input');
  var btn    = document.getElementById('search-btn');
  var result = document.getElementById('search-result');

  function verify() {
    var query = input.value.trim().toLowerCase();

    result.className = 'search-result';
    result.textContent = '';

    if (!query) return;

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(query)) {
      result.className = 'search-result search-result--error';
      result.textContent =
        'Invalid format. The key must follow the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.';
      return;
    }

    var cards = document.querySelectorAll('.script-card');
    for (var i = 0; i < cards.length; i++) {
      var card   = cards[i];
      var hashEl = card.querySelector('.hash-value');
      var nameEl = card.querySelector('.card-name');
      var verEl  = card.querySelector('.card-version');

      if (hashEl && hashEl.textContent.trim().toLowerCase() === query) {
        result.className = 'search-result search-result--match';
        result.textContent =
          '\u2713 Match found: ' +
          nameEl.textContent.trim() +
          '  \u2014  ' +
          verEl.textContent.trim();
        return;
      }
    }

    result.className = 'search-result search-result--nomatch';
    result.textContent =
      '\u2717 No match found. This hash does not correspond to any known Afina script.';
  }

  btn.addEventListener('click', verify);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') verify();
  });
}());
