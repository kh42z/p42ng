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
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":15,"column":21},"end":{"line":15,"column":27}}}) : helper)))
    + "/\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":15,"column":30},"end":{"line":15,"column":42}}}) : helper)))
    + "</a>\n		</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\n	<div id=\"guildPannel\"></div>\n	<div id=\"guildSubNavBar\"></div>\n<div>\n	<span> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "   |"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"anagram") : depth0), depth0))
    + "| </span>\n	<ul>\n	<p> OWNER: </p>\n	<ul>\n		<li><a href=\"#profile/"
    + alias2(((helper = (helper = lookupProperty(helpers,"owner_id") || (depth0 != null ? lookupProperty(depth0,"owner_id") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"owner_id","hash":{},"data":data,"loc":{"start":{"line":9,"column":24},"end":{"line":9,"column":36}}}) : helper)))
    + "/\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"owner_nickname") || (depth0 != null ? lookupProperty(depth0,"owner_nickname") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"owner_nickname","hash":{},"data":data,"loc":{"start":{"line":9,"column":39},"end":{"line":9,"column":57}}}) : helper)))
    + "</a></li>\n	</ul>\n	<p> OFFICERS: </p>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"officers") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":1},"end":{"line":17,"column":10}}})) != null ? stack1 : "")
    + "	</ul>\n	<p> MEMBERS: </p>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"members") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":1},"end":{"line":25,"column":10}}})) != null ? stack1 : "")
    + "	</ul>\n</div>\n</div>\n";
},"useData":true});
})();