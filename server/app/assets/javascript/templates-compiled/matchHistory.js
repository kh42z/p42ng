(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['matchHistory'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<li>\n			<span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"result") || (depth0 != null ? lookupProperty(depth0,"result") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"result","hash":{},"data":data,"loc":{"start":{"line":7,"column":9},"end":{"line":7,"column":19}}}) : helper)))
    + ": </span>\n			<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_left_id") || (depth0 != null ? lookupProperty(depth0,"player_left_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_left_id","hash":{},"data":data,"loc":{"start":{"line":8,"column":21},"end":{"line":8,"column":39}}}) : helper)))
    + "/match_history\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_left_nickname") || (depth0 != null ? lookupProperty(depth0,"player_left_nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_left_nickname","hash":{},"data":data,"loc":{"start":{"line":8,"column":55},"end":{"line":8,"column":79}}}) : helper)))
    + "</a>\n			<span> "
    + alias4(((helper = (helper = lookupProperty(helpers,"game_type") || (depth0 != null ? lookupProperty(depth0,"game_type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"game_type","hash":{},"data":data,"loc":{"start":{"line":9,"column":10},"end":{"line":9,"column":23}}}) : helper)))
    + " </span>\n			<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_right_id") || (depth0 != null ? lookupProperty(depth0,"player_right_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_right_id","hash":{},"data":data,"loc":{"start":{"line":10,"column":21},"end":{"line":10,"column":40}}}) : helper)))
    + "/match_history\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_right_nickname") || (depth0 != null ? lookupProperty(depth0,"player_right_nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_right_nickname","hash":{},"data":data,"loc":{"start":{"line":10,"column":56},"end":{"line":10,"column":81}}}) : helper)))
    + "</a>\n			<span>date:   "
    + alias4(((helper = (helper = lookupProperty(helpers,"created_at") || (depth0 != null ? lookupProperty(depth0,"created_at") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":31}}}) : helper)))
    + " </span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\n	<div id=\"profilePannel\"></div>\n	<div id=\"profileSubNavBar\"></div>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"matchs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":12,"column":12}}})) != null ? stack1 : "")
    + "	</ul>\n</div>\n";
},"useData":true});
})();