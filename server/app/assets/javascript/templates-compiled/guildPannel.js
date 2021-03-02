(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['guildPannel'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p>\n	Grou grou je suis la pannel de "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n</p>\n";
},"useData":true});
})();