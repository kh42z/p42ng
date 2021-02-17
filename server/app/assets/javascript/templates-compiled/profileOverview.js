(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profileOverview'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profileOverview\">\n<span class=\"nickname\">name: "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":2,"column":29},"end":{"line":2,"column":41}}}) : helper)))
    + "</span>\n<a class=\"Guild\" href=\"#guild/"
    + alias4(((helper = (helper = lookupProperty(helpers,"user_guild_id") || (depth0 != null ? lookupProperty(depth0,"user_guild_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_guild_id","hash":{},"data":data,"loc":{"start":{"line":3,"column":30},"end":{"line":3,"column":47}}}) : helper)))
    + "/members_view\">Guild: "
    + alias4(((helper = (helper = lookupProperty(helpers,"user_guild") || (depth0 != null ? lookupProperty(depth0,"user_guild") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_guild","hash":{},"data":data,"loc":{"start":{"line":3,"column":69},"end":{"line":3,"column":83}}}) : helper)))
    + "</a>\n<span class=\"mmr\">mmr: "
    + alias4(((helper = (helper = lookupProperty(helpers,"user_mmr") || (depth0 != null ? lookupProperty(depth0,"user_mmr") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_mmr","hash":{},"data":data,"loc":{"start":{"line":4,"column":23},"end":{"line":4,"column":35}}}) : helper)))
    + "</span>\n<span class=\"ladder\">Ladder: "
    + alias4(((helper = (helper = lookupProperty(helpers,"user_ladder") || (depth0 != null ? lookupProperty(depth0,"user_ladder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_ladder","hash":{},"data":data,"loc":{"start":{"line":5,"column":29},"end":{"line":5,"column":44}}}) : helper)))
    + "</span>\n</div>\n";
},"useData":true});
})();