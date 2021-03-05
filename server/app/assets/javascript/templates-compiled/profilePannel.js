(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profilePannel'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pannel\">\n	<p>\n		je Suis l'user pannel de "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"nickname") : depth0), depth0))
    + "\n	<p>\n</div>\n";
},"useData":true});
})();