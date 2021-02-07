(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['topnav'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"topnav\">\n  <div class=\"left-menu\">\n    <a class=\"topnav-btn logo\" href=\"#home\"></a>\n    <a class=\"topnav-btn\" href=\"#tournaments\">Tournaments</a>\n    <a class=\"topnav-btn\" href=\"#leaderboard\">Leaderboard</a>\n    <a class=\"topnav-btn\" href=\"#guilds\">Guilds</a>\n  </div>\n  <div class=\"right-menu\">\n    <a class=\"topnav-btn chat\" href=\"#chat\"></a>\n    <a class=\"user-page\">\n      <a class=\"topnav-btn profile_pic\" href=\"#user_page\"></a>\n      <a class=\"topnav-btn user\" href=\"#user_page\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"user") || (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"user","hash":{},"data":data,"loc":{"start":{"line":12,"column":51},"end":{"line":12,"column":59}}}) : helper)))
    + "</a>\n    </a>\n    <a class=\"topnav-btn exit\" href=\"#exit\"></a>\n  </div>\n</div>\n";
},"useData":true});
})();