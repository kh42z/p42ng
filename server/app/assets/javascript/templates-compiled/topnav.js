(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['topnav'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<div class=\"topnav\">\n  <a class=\"topnav-btn topnav-btn-home logo\" href=\"#home\"></a>\n  <a class=\"topnav-btn\" href=\"#tournaments\">Tournaments</a>\n  <a class=\"topnav-btn\" href=\"#leaderboard\">Leaderboard</a>\n  <a class=\"topnav-btn\" href=\"#guilds\">Guilds</a>\n  <a class=\"topnav-btn\" href=\"#user_page\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"user") || (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data,"loc":{"start":{"line":14,"column":42},"end":{"line":14,"column":50}}}) : helper)))
    + "</a>\n</div>\n\n<div class=\"hello\">\n  <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"welcome") || (depth0 != null ? lookupProperty(depth0,"welcome") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"welcome","hash":{},"data":data,"loc":{"start":{"line":18,"column":5},"end":{"line":18,"column":16}}}) : helper)))
    + "</p>\n</div>";
},"useData":true});
})();