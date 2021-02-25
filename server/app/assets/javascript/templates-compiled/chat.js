(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chat'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"clickable-discussions\">\n                <div class=\"image-container\">\n                    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":42}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                </div>\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":13,"column":19},"end":{"line":13,"column":30}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":13,"column":31},"end":{"line":13,"column":43}}}) : helper)))
    + "</p>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"message\">\n                    <div class=\"info\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":49,"column":37},"end":{"line":49,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":51,"column":45},"end":{"line":51,"column":56}}}) : helper)))
    + "</div>\n                        <div class=\"nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":52,"column":46},"end":{"line":52,"column":58}}}) : helper)))
    + "</div>\n                        <div class=\"time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":53,"column":42},"end":{"line":53,"column":50}}}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"output\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":55,"column":40},"end":{"line":55,"column":51}}}) : helper)))
    + "</div>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"chat\">\n    <div class=\"discussions\">\n        <div class=\"title\">\n            <h2 class=\"h2-discussions\">Discussions</h2>\n            <img src=\"./icons/add_box.svg\" class=\"add_box\"></img>\n        </div>\n        <div class=\"discussions-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"discussions") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":15,"column":17}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"right-side\">\n        <div class=\"header\">\n            <div class=\"left-header\">\n                <div class=\"image-container\">\n                    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":22,"column":29},"end":{"line":22,"column":42}}}) : helper)))
    + " class=\"image_url\"></img>\n                </div>\n                <div class=\"info\">\n                    <p class=\"anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":25,"column":39},"end":{"line":25,"column":50}}}) : helper)))
    + "</p>\n                    <p class=\"nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":26,"column":40},"end":{"line":26,"column":52}}}) : helper)))
    + "</p>\n                    <div class=\"pastille\"></div>\n                    <p class=\"status\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":28,"column":38},"end":{"line":28,"column":48}}}) : helper)))
    + "</p>\n                    <div class=\"slide-show-container\">\n                        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"slide_show") || (depth0 != null ? lookupProperty(depth0,"slide_show") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slide_show","hash":{},"data":data,"loc":{"start":{"line":30,"column":34},"end":{"line":30,"column":48}}}) : helper)))
    + "\" class=\"slide-show\"></img>\n                    </div>\n                </div>\n            </div>\n            <div class=\"right-header\">\n                <div class=\"group_add-container\">\n                    <img src=\"./icons/group_add.svg\" class=\"group_add\"></img>\n                </div>\n                <button class=\"play-button\">\n                    <img src=\"./icons/videogame.svg\" height=\"24\">\n                </button>\n            </div>\n        </div>\n        <div class=\"messages\">\n            <div class=\"scrollable\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":16},"end":{"line":57,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        <div class=\"input-container\">\n            <input class=\"input\" type=\"text\">\n        </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();