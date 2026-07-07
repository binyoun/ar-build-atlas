/* Renders each category page's table body from AR_OPTIONS (data.js), so the
   displayed tables and the search index can never drift apart. Each tbody
   opts in via data-options-category (and optionally data-options-group for
   pages with more than one table, like nocode.html). */

document.addEventListener('DOMContentLoaded', function () {
  var bodies = document.querySelectorAll('tbody[data-options-category]');
  bodies.forEach(function (tbody) {
    var category = tbody.getAttribute('data-options-category');
    var group = tbody.getAttribute('data-options-group');
    var rows = AR_OPTIONS.filter(function (opt) {
      return opt.category === category && (!group || opt.group === group);
    });
    tbody.innerHTML = rows.map(renderRow).join('');
  });
});

function renderRow(opt) {
  var usedInClass = opt.usedIn ? 'used-in' : 'used-in none';
  var usedInText = opt.usedIn || 'Not yet used';
  return (
    '<tr id="opt-' + opt.id + '">' +
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
