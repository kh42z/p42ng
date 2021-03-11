(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['achivements'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<section class=\"profileBlock\" id=\"achivementsBlock\">\n<p class=\"placeholder\"> I'm "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":28},"end":{"line":3,"column":36}}}) : helper)))
    + " and i'm in "
    + alias4(((helper = (helper = lookupProperty(helpers,"ladder_name") || (depth0 != null ? lookupProperty(depth0,"ladder_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ladder_name","hash":{},"data":data,"loc":{"start":{"line":3,"column":48},"end":{"line":3,"column":63}}}) : helper)))
    + " and this is just a test </p>\n</section>\n";
},"useData":true});
})();