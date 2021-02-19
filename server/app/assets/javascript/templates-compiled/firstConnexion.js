(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['firstConnexion'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"firstConnexion\">\n  <div class=\"nickname\">\n    <label class=\"status\" for=\"nickname\">Choose your nickname</label>\n    <input class=\"input\" type=\"text\" id=\"nickname\" name=\"nickname\" minlength=\"2\" maxlength=\"26\" value="
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":4,"column":102},"end":{"line":4,"column":114}}}) : helper)))
    + ">\n    <p class=\"error-message\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":5,"column":29},"end":{"line":5,"column":40}}}) : helper)))
    + "</p>\n  </div>\n\n  <div class=\"avatar\">\n    <label class=\"status\" >Choose your avatar</label>\n      <label>\n      <input type=\"file\"  accept=\"image/*\" name=\"image\" id=\"file\"  style=\"display: none;\">\n      <img class=\"image\" alt=\"avatar\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":12,"column":43},"end":{"line":12,"column":56}}}) : helper)))
    + "\" id=\"output\" width=\"200\" style=\"cursor: pointer;\" />\n    </label>\n  </div>\n  <button class=\"validate\">Validate</button>\n</div>\n";
},"useData":true});
})();