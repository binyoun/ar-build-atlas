/* Search and filter over AR_OPTIONS (data.js). Powers two surfaces:
   1. A mini keyword search in the header, present on every page.
   2. A fuller finder (keyword plus filter dropdowns) on the homepage.
   Both link results to <category page>#opt-<id>; landing on that page
   scrolls to and briefly highlights the matching row. */

/* Tier synonyms so a keyword like "offline" or "free" matches every row of
   that tier, even when the cell's own wording never repeats the word (a
   "Yes, if self-hosted" cell does not literally contain "offline"). */
var AR_TIER_SYNONYMS = {
  costTier: {
    free: "free open source no cost",
    freemium: "freemium free tier",
    subscription: "subscription paid",
    "paid-hardware": "paid hardware cost"
  },
  distTier: {
    url: "url browser link no install web-based",
    "app-store": "app store",
    "platform-locked": "platform locked",
    enterprise: "enterprise",
    varies: ""
  },
  offlineTier: {
    yes: "offline offline-capable works offline no internet needed",
    partial: "partially offline",
    no: "online only requires a live connection needs internet",
    varies: ""
  },
  fitTier: {
    high: "vibecodable agent-friendly high vibecoding fit",
    med: "medium vibecoding fit",
    low: "low vibecoding fit manual editor required"
  }
};

function arSearchText(opt) {
  return [
    opt.name, opt.what, opt.cost, opt.learning, opt.distribution,
    opt.offline, opt.fit, opt.usedIn, AR_CATEGORIES[opt.category].label,
    AR_TIER_SYNONYMS.costTier[opt.costTier],
    AR_TIER_SYNONYMS.distTier[opt.distTier],
    AR_TIER_SYNONYMS.offlineTier[opt.offlineTier],
    AR_TIER_SYNONYMS.fitTier[opt.fitTier]
  ].join(' ').toLowerCase();
}

function arMatchesFilters(opt, filters) {
  if (filters.cost && opt.costTier !== filters.cost) return false;
  if (filters.dist && opt.distTier !== filters.dist) return false;
  if (filters.offline && opt.offlineTier !== filters.offline) return false;
  if (filters.fit && opt.fitTier !== filters.fit) return false;
  return true;
}

function arSearch(query, filters) {
  var q = (query || '').trim().toLowerCase();
  filters = filters || {};
  return AR_OPTIONS.filter(function (opt) {
    if (!arMatchesFilters(opt, filters)) return false;
    if (!q) return true;
    return arSearchText(opt).indexOf(q) !== -1;
  });
}

function arSnippet(opt) {
  if (opt.usedIn) return 'Used in: ' + opt.usedIn;
  var text = opt.what.replace(/<[^>]+>/g, '');
  return text.length > 100 ? text.slice(0, 100).trim() + '...' : text;
}

function arResultHref(opt) {
  return AR_CATEGORIES[opt.category].page + '#opt-' + opt.id;
}

function arRenderResultItem(opt) {
  var label = AR_CATEGORIES[opt.category].label;
  return (
    '<li><a href="' + arResultHref(opt) + '">' +
      '<span class="badge">' + label + '</span>' +
      '<span class="result-name">' + opt.name + '</span>' +
      '<span class="result-snippet">' + arSnippet(opt) + '</span>' +
    '</a></li>'
  );
}

document.addEventListener('DOMContentLoaded', function () {
  arSetupHeaderSearch();
  arSetupFinder();
  arHighlightFromHash();
});

/* Header mini search: text-only, top 8 matches, dropdown under the input. */
function arSetupHeaderSearch() {
  var input = document.querySelector('[data-search-input]');
  var panel = document.querySelector('[data-search-results]');
  if (!input || !panel) return;

  function close() {
    panel.innerHTML = '';
    panel.classList.remove('open');
  }

  function run() {
    var q = input.value.trim();
    if (q.length < 2) { close(); return; }
    var results = arSearch(q, {}).slice(0, 8);
    if (!results.length) {
      panel.innerHTML = '<p class="search-empty">No matches.</p>';
    } else {
      panel.innerHTML = '<ul>' + results.map(arRenderResultItem).join('') + '</ul>';
    }
    panel.classList.add('open');
  }

  input.addEventListener('input', run);
  input.addEventListener('focus', function () { if (input.value.trim().length >= 2) run(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); input.blur(); }
    if (e.key === 'Enter') {
      var first = panel.querySelector('a');
      if (first) { window.location.href = first.getAttribute('href'); }
    }
  });
  document.addEventListener('click', function (e) {
    if (!panel.contains(e.target) && e.target !== input) close();
  });
}

/* Homepage finder: keyword plus four filter selects, live results list. */
function arSetupFinder() {
  var input = document.querySelector('[data-finder-input]');
  var results = document.querySelector('[data-finder-results]');
  var count = document.querySelector('[data-finder-count]');
  if (!input || !results) return;
  var selects = document.querySelectorAll('[data-finder-filter]');

  function run() {
    var filters = {};
    selects.forEach(function (sel) {
      var key = sel.getAttribute('data-finder-filter');
      if (sel.value) filters[key] = sel.value;
    });
    var matches = arSearch(input.value, filters);
    if (count) {
      count.textContent = matches.length + (matches.length === 1 ? ' match' : ' matches') +
        ' across all five categories';
    }
    results.innerHTML = matches.length
      ? '<ul>' + matches.map(arRenderResultItem).join('') + '</ul>'
      : '<p class="search-empty">Nothing matches that combination. Try clearing a filter.</p>';
  }

  input.addEventListener('input', run);
  selects.forEach(function (sel) { sel.addEventListener('change', run); });
  run();
}

/* Landing on a category page via a search result: scroll to and flash the row. */
function arHighlightFromHash() {
  if (!location.hash || location.hash.indexOf('#opt-') !== 0) return;
  var row = document.getElementById(location.hash.slice(1));
  if (!row) return;
  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  row.classList.add('row-highlight');
  setTimeout(function () { row.classList.remove('row-highlight'); }, 2200);
}
