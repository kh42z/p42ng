(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['firstConnexion'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div>\n  <label for=\"nickname\">nickname</label>\n  <input type=\"text\" id=\"nickname\" name=\"nickname\" minlength=\"2\" maxlength=\"26\" value="
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":3,"column":86},"end":{"line":3,"column":98}}}) : helper)))
    + ">\n  <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":16}}}) : helper)))
    + "</p>\n</div>\n\n<form enctype=\"multipart/form-data\">\n<p><input type=\"file\"  accept=\"image/*\" name=\"image\" id=\"file\"  style=\"display: none;\"></p>\n<p><label for=\"file\" style=\"cursor: pointer;\">Upload Image</label></p>\n<p><img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":26}}}) : helper)))
    + "\" id=\"output\" width=\"200\" /></p>\n</form>\n<button class=\"validate\">Validate</button>";
},"useData":true});
})();