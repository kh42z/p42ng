(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['matchHistory'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<li><a href=\"#guild/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"guild_id") || (depth0 != null ? lookupProperty(depth0,"guild_id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"guild_id","hash":{},"data":data,"loc":{"start":{"line":7,"column":24},"end":{"line":7,"column":36}}}) : helper)))
    + "/\">Guild</a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<li><a href=\"#profile/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":9,"column":26},"end":{"line":9,"column":32}}}) : helper)))
    + "/no_guild\">Guild</a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<li>\n			<span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"result") || (depth0 != null ? lookupProperty(depth0,"result") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"result","hash":{},"data":data,"loc":{"start":{"line":20,"column":9},"end":{"line":20,"column":19}}}) : helper)))
    + ": </span>\n			<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_left_id") || (depth0 != null ? lookupProperty(depth0,"player_left_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_left_id","hash":{},"data":data,"loc":{"start":{"line":21,"column":21},"end":{"line":21,"column":39}}}) : helper)))
    + "/match_history\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_left_nickname") || (depth0 != null ? lookupProperty(depth0,"player_left_nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_left_nickname","hash":{},"data":data,"loc":{"start":{"line":21,"column":55},"end":{"line":21,"column":79}}}) : helper)))
    + "</a>\n			<span> "
    + alias4(((helper = (helper = lookupProperty(helpers,"game_type") || (depth0 != null ? lookupProperty(depth0,"game_type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"game_type","hash":{},"data":data,"loc":{"start":{"line":22,"column":10},"end":{"line":22,"column":23}}}) : helper)))
    + " </span>\n			<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_right_id") || (depth0 != null ? lookupProperty(depth0,"player_right_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_right_id","hash":{},"data":data,"loc":{"start":{"line":23,"column":21},"end":{"line":23,"column":40}}}) : helper)))
    + "/match_history\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"player_right_nickname") || (depth0 != null ? lookupProperty(depth0,"player_right_nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player_right_nickname","hash":{},"data":data,"loc":{"start":{"line":23,"column":56},"end":{"line":23,"column":81}}}) : helper)))
    + "</a>\n			<span>date:   "
    + alias4(((helper = (helper = lookupProperty(helpers,"created_at") || (depth0 != null ? lookupProperty(depth0,"created_at") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data,"loc":{"start":{"line":24,"column":17},"end":{"line":24,"column":31}}}) : helper)))
    + " </span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\n	<div class=\"subTopNav\">\n		<ul>\n			<li><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":25},"end":{"line":4,"column":31}}}) : helper)))
    + "/match_history\">Matches</a></li>\n			<li><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":25},"end":{"line":5,"column":31}}}) : helper)))
    + "/achivements\">Achivements</a></li>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"guild_id") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":10,"column":10}}})) != null ? stack1 : "")
    + "			<li><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":11,"column":25},"end":{"line":11,"column":31}}}) : helper)))
    + "/friends\">friends</a></li>\n		</ul>\n	</div>\n	<p>Match History</p>\n	<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":15,"column":19},"end":{"line":15,"column":25}}}) : helper)))
    + "/match_history\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"player") || (depth0 != null ? lookupProperty(depth0,"player") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player","hash":{},"data":data,"loc":{"start":{"line":15,"column":42},"end":{"line":15,"column":52}}}) : helper)))
    + " </a>\n	<a href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"guildId") || (depth0 != null ? lookupProperty(depth0,"guildId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"guildId","hash":{},"data":data,"loc":{"start":{"line":16,"column":17},"end":{"line":16,"column":28}}}) : helper)))
    + "/members\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"guild") || (depth0 != null ? lookupProperty(depth0,"guild") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"guild","hash":{},"data":data,"loc":{"start":{"line":16,"column":39},"end":{"line":16,"column":48}}}) : helper)))
    + " </a>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"matchs") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":2},"end":{"line":25,"column":12}}})) != null ? stack1 : "")
    + "	</ul>\n</div>\n";
},"useData":true});
})();