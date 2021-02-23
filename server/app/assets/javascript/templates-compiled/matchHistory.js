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
    + alias4(((helper = (helper = lookupProperty(helpers,"result") || (depth0 != null ? lookupProperty(depth0,"result") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"result","hash":{},"data":data,"loc":{"start":{"line":8,"column":9},"end":{"line":8,"column":19}}}) : helper)))
    + "  against</span>\n			<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"opponentId") || (depth0 != null ? lookupProperty(depth0,"opponentId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"opponentId","hash":{},"data":data,"loc":{"start":{"line":9,"column":21},"end":{"line":9,"column":35}}}) : helper)))
    + "/match_history\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"opponentName") || (depth0 != null ? lookupProperty(depth0,"opponentName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"opponentName","hash":{},"data":data,"loc":{"start":{"line":9,"column":51},"end":{"line":9,"column":67}}}) : helper)))
    + "</a> <span>|<a href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"opponentGuildId") || (depth0 != null ? lookupProperty(depth0,"opponentGuildId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"opponentGuildId","hash":{},"data":data,"loc":{"start":{"line":9,"column":95},"end":{"line":9,"column":114}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"opponentGuild") || (depth0 != null ? lookupProperty(depth0,"opponentGuild") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"opponentGuild","hash":{},"data":data,"loc":{"start":{"line":9,"column":116},"end":{"line":9,"column":133}}}) : helper)))
    + "</a></span>|\n			<span>   "
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":10,"column":20}}}) : helper)))
    + " </span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\n	<p>Match History</p>\n	<a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":19},"end":{"line":3,"column":25}}}) : helper)))
    + "/match_history\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"player") || (depth0 != null ? lookupProperty(depth0,"player") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player","hash":{},"data":data,"loc":{"start":{"line":3,"column":42},"end":{"line":3,"column":52}}}) : helper)))
    + " </a>\n	<a href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"guildId") || (depth0 != null ? lookupProperty(depth0,"guildId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"guildId","hash":{},"data":data,"loc":{"start":{"line":4,"column":17},"end":{"line":4,"column":28}}}) : helper)))
    + "/members\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"guild") || (depth0 != null ? lookupProperty(depth0,"guild") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"guild","hash":{},"data":data,"loc":{"start":{"line":4,"column":39},"end":{"line":4,"column":48}}}) : helper)))
    + " </a>\n	<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"matchs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":11,"column":12}}})) != null ? stack1 : "")
    + "	</ul>\n</div>\n";
},"useData":true});
})();