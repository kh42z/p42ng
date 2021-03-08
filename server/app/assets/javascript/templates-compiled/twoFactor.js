(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twoFactor'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"two_factor\">\n    <p id=\"two_factor_error\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"message","hash":{},"data":data,"loc":{"start":{"line":2,"column":29},"end":{"line":2,"column":42}}}) : helper)))
    + "</p>\n    <p id=\"two_factor_message\">Enter your code:</p>\n    <input class=\"input\" type=\"text\" id=\"code\" name=\"code\" minlength=\"6\" maxlength=\"6\">\n    <button class=\"validate\">validate</button>\n</div>\n";
},"useData":true});
})();