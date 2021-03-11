(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['guildGlobalError'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"status") : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"statusText") : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"body") : depth0), depth0))
    + "</span>\n";
},"useData":true});
})();