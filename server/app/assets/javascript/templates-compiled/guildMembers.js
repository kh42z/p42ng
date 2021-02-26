(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['guildMembers'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<li>\n			<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":20,"column":21},"end":{"line":20,"column":27}}}) : helper)))
    + "/\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":20,"column":30},"end":{"line":20,"column":42}}}) : helper)))
    + "</a>\n		</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\n<div class=\"subTopNav\">\n	<ul>\n		<li><a href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":22},"end":{"line":4,"column":28}}}) : helper)))
    + "/current_war\">War</a></li>\n		<li><a href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":22},"end":{"line":5,"column":28}}}) : helper)))
    + "/last_wars\">Last wars</a></li>\n		<li><a href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":22},"end":{"line":6,"column":28}}}) : helper)))
    + "/members\">Members</a></li>\n	</ul>\n</div>\n<div>\n	<span> "
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "   |"
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,"anagram") : depth0), depth0))
    + "| </span>\n	<ul>\n	<p> OWNER: </p>\n	<ul>\n		<li><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"owner_id") || (depth0 != null ? lookupProperty(depth0,"owner_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner_id","hash":{},"data":data,"loc":{"start":{"line":14,"column":24},"end":{"line":14,"column":36}}}) : helper)))
    + "/\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"owner_nickname") || (depth0 != null ? lookupProperty(depth0,"owner_nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner_nickname","hash":{},"data":data,"loc":{"start":{"line":14,"column":39},"end":{"line":14,"column":57}}}) : helper)))
    + "</a></li>\n	</ul>\n	<p> OFFICERS: </p>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"officers") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":1},"end":{"line":22,"column":10}}})) != null ? stack1 : "")
    + "	</ul>\n	<p> MEMBERS: </p>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"members") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":1},"end":{"line":30,"column":10}}})) != null ? stack1 : "")
    + "	</ul>\n</div>\n</div>\n";
},"useData":true});
})();