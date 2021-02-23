(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chat'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"chat\">\n    <div class=\"discussions\">\n        <a><img src=\"./icons/add_box.svg\"></img></a>\n            <a><span>\n                <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":6,"column":25},"end":{"line":6,"column":38}}}) : helper)))
    + " class=\"image_url\"></img>\n                <label>"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":7,"column":23},"end":{"line":7,"column":35}}}) : helper)))
    + "</label>\n            </span></a>\n    </div>\n    <div class=\"header\">\n        <a><span>\n            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":13,"column":21},"end":{"line":13,"column":34}}}) : helper)))
    + " class=\"image_url\"></img>\n            <label>"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":14,"column":19},"end":{"line":14,"column":31}}}) : helper)))
    + "</label>\n            <label>"
    + alias4(((helper = (helper = lookupProperty(helpers,"state") || (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data,"loc":{"start":{"line":15,"column":19},"end":{"line":15,"column":28}}}) : helper)))
    + "</label>\n            <img src=\"./icons/group_add.svg\"></img>\n            <button>Play</button>\n        </span></a>\n    </div>\n    <div class=\"messages\">\n        <input class=\"input\" type=\"text\">\n    </div>\n</div>";
},"useData":true});
})();