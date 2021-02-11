(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['topnav'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"topnav\">\n  <a class=\"btn logo\" href=\"#home\"></a>\n  <a class=\"btn tournaments\" href=\"#tournaments\">Tournaments</a>\n  <a class=\"btn\" href=\"#leaderboard\">Leaderboard</a>\n  <a class=\"btn guilds\" href=\"#guilds\">Guilds</a>\n  <a class=\"span\"></a>\n  <a class=\"chat\" href=\"#chat\"></a>\n  <a href=\"#user_page\">\n    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"profile_pic") || (depth0 != null ? lookupProperty(depth0,"profile_pic") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_pic","hash":{},"data":data,"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":28}}}) : helper)))
    + " class=\"profile_pic\"></img>\n    <a class=\"btn user\" href=\"#user_page\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"user") || (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data,"loc":{"start":{"line":10,"column":42},"end":{"line":10,"column":50}}}) : helper)))
    + "</a>\n  </a>\n  <a class=\"exit\" href=\"#exit\"></a>\n</div>\n";
},"useData":true});
})();