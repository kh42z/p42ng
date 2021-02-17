(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['firstConnexion'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div>\n  <label for=\"nickname\">nickname</label>\n  <input type=\"text\" id=\"nickname\" name=\"nickname\">\n</div>\n\n<form enctype=\"multipart/form-data\">\n<p><input type=\"file\"  accept=\"image/*\" name=\"image\" id=\"file\"  style=\"display: none;\"></p>\n<p><label for=\"file\" style=\"cursor: pointer;\">Upload Image</label></p>\n<p><img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"image","hash":{},"data":data,"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":22}}}) : helper)))
    + "\" id=\"output\" width=\"200\" /></p>\n</form>\n<a class=\"validate\">Validate</a>";
},"useData":true});
})();