/* Renders each category page from AR_OPTIONS (data.js), so the displayed
   options and the search index can never drift apart. Each tbody opts in via
   data-options-category (and optionally data-options-group for pages with
   more than one table, like nocode.html). Every table gets a card grid
   rendered just before it; a toggle switches the page between the two. */

var AR_TIER_LABELS = {
  costTier:    { free: "Free", freemium: "Free tier", subscription: "Subscription", "paid-hardware": "Paid hardware" },
  distTier:    { url: "Runs at a URL", "app-store": "App store", "platform-locked": "Platform-locked", enterprise: "Enterprise", varies: "Distribution varies" },
  offlineTier: { yes: "Works offline", partial: "Partly offline", no: "Needs a connection", varies: "Offline varies" },
  fitTier:     { high: "Vibecoding: high", med: "Vibecoding: medium", low: "Vibecoding: low" }
};
var AR_GOOD = { free: 1, url: 1, yes: 1, high: 1 };

document.addEventListener('DOMContentLoaded', function () {
  var bodies = document.querySelectorAll('tbody[data-options-category]');
  bodies.forEach(function (tbody) {
    var category = tbody.getAttribute('data-options-category');
    var group = tbody.getAttribute('data-options-group');
    var rows = AR_OPTIONS.filter(function (opt) {
      return opt.category === category && (!group || opt.group === group);
    });
    tbody.innerHTML = rows.map(renderRow).join('');
    var wrap = tbody.closest('.table-wrap');
    if (wrap) {
      var grid = document.createElement('div');
      grid.className = 'opt-cards';
      grid.innerHTML = rows.map(renderCard).join('');
      wrap.parentNode.insertBefore(grid, wrap);
    }
  });
  if (bodies.length) setupViewToggle();
  renderStats();
});

function renderRow(opt) {
  var usedInClass = opt.usedIn ? 'used-in' : 'used-in none';
  var usedInText = opt.usedIn || 'Not yet used';
  return (
    '<tr data-opt="' + opt.id + '">' +
      '<td class="name">' + opt.name + '</td>' +
      '<td>' + opt.what + '</td>' +
      '<td>' + opt.cost + '</td>' +
      '<td>' + opt.learning + '</td>' +
      '<td>' + opt.distribution + '</td>' +
      '<td>' + opt.offline + '</td>' +
      '<td class="fit-' + opt.fitTier + '">' + opt.fit + '</td>' +
      '<td class="' + usedInClass + '">' + usedInText + '</td>' +
    '</tr>'
  );
}

function chip(key, tier) {
  var label = AR_TIER_LABELS[key][tier];
  if (!label) return '';
  var tone = AR_GOOD[tier] ? ' good' : (tier === 'low' || tier === 'no') ? ' dim' : '';
  return '<li class="chip' + tone + '">' + label + '</li>';
}

function renderCard(opt) {
  return (
    '<article class="opt-card' + (opt.usedIn ? ' is-used' : '') + '" id="opt-' + opt.id + '">' +
      '<div class="opt-head"><h3>' + opt.name + '</h3>' +
        (opt.usedIn ? '<span class="in-use">In use</span>' : '') + '</div>' +
      '<p class="opt-what">' + opt.what + '</p>' +
      '<ul class="chips">' + chip('costTier', opt.costTier) + chip('distTier', opt.distTier) +
        chip('offlineTier', opt.offlineTier) + chip('fitTier', opt.fitTier) + '</ul>' +
      '<details><summary>Cost, learning curve and details</summary><dl>' +
        '<dt>Cost</dt><dd>' + opt.cost + '</dd>' +
        '<dt>Learning</dt><dd>' + opt.learning + '</dd>' +
        '<dt>Distribution</dt><dd>' + opt.distribution + '</dd>' +
        '<dt>Offline</dt><dd>' + opt.offline + '</dd>' +
        '<dt>Vibecoding</dt><dd>' + opt.fit + '</dd>' +
      '</dl></details>' +
      '<p class="opt-used' + (opt.usedIn ? '' : ' none') + '"><span>Used in</span>' +
        (opt.usedIn || 'Not yet used') + '</p>' +
    '</article>'
  );
}

/* Cards by default; the compare table on demand. The choice is remembered. */
function setupViewToggle() {
  var first = document.querySelector('.opt-cards');
  if (!first) return;
  var bar = document.createElement('div');
  bar.className = 'view-toggle';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'View');
  bar.innerHTML = '<button type="button" data-view="cards">Cards</button>' +
                  '<button type="button" data-view="table">Compare table</button>';
  first.parentNode.insertBefore(bar, first);

  function set(view) {
    document.body.classList.toggle('view-table', view === 'table');
    bar.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-view') === view ? 'true' : 'false');
    });
    try { localStorage.setItem('atlas-view', view); } catch (e) {}
  }
  var saved = 'cards';
  try { saved = localStorage.getItem('atlas-view') || 'cards'; } catch (e) {}
  set(saved);
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) set(b.getAttribute('data-view'));
  });
}

/* Hero stats and the category tile counts on the overview page. */
function renderStats() {
  document.querySelectorAll('[data-stats]').forEach(function (el) {
    var cat = el.getAttribute('data-stats');
    var opts = AR_OPTIONS.filter(function (o) { return cat === 'all' || o.category === cat; });
    var used = opts.filter(function (o) { return o.usedIn; }).length;
    var free = opts.filter(function (o) { return o.costTier === 'free'; }).length;
    var parts = ['<li><b>' + opts.length + '</b>options</li>'];
    if (cat === 'all') parts.push('<li><b>5</b>categories</li>');
    parts.push('<li><b>' + used + '</b>used in real work</li>');
    parts.push('<li><b>' + free + '</b>free</li>');
    el.innerHTML = parts.join('');
  });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var cat = el.getAttribute('data-count');
    var opts = AR_OPTIONS.filter(function (o) { return o.category === cat; });
    var used = opts.filter(function (o) { return o.usedIn; }).length;
    el.textContent = opts.length + ' options · ' + used + ' in use';
  });
}
