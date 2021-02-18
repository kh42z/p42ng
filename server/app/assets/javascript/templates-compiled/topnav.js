(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['topnav'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"active") || (depth0 != null ? lookupProperty(depth0,"active") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"active","hash":{},"data":data,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":41}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"active") || (depth0 != null ? lookupProperty(depth0,"active") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"active","hash":{},"data":data,"loc":{"start":{"line":3,"column":47},"end":{"line":3,"column":57}}}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"active") || (depth0 != null ? lookupProperty(depth0,"active") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"active","hash":{},"data":data,"loc":{"start":{"line":5,"column":31},"end":{"line":5,"column":41}}}) : helper)))
    + " ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"topnav "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"home") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":19},"end":{"line":1,"column":48}}})) != null ? stack1 : "")
    + "\">\n  <a class=\"btn "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"home") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":16},"end":{"line":2,"column":45}}})) != null ? stack1 : "")
    + "logo\" href=\"#home\"></a>\n  <a class=\"btn tournaments"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tournaments") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":64}}})) != null ? stack1 : "")
    + "\" href=\"#tournaments\">Tournaments</a>\n  <a class=\"btn"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"leaderboard") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":15},"end":{"line":4,"column":52}}})) != null ? stack1 : "")
    + "\" href=\"#leaderboard\">Leaderboard</a>\n  <a class=\"btn "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"guilds") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":5,"column":49}}})) != null ? stack1 : "")
    + " guilds\" href=\"#guilds\">Guilds</a>\n  <a class=\"span\"></a>\n  <a class=\"btn "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"chat") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":47}}})) != null ? stack1 : "")
    + " chat\" href=\"#chat\"></a>\n  <a class=\"btn\" href=\"#user_page\">\n    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"profile_pic") || (depth0 != null ? lookupProperty(depth0,"profile_pic") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_pic","hash":{},"data":data,"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":28}}}) : helper)))
    + " class=\"profile_pic\"></img>\n    <a class=\"btn "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"user_page") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":18},"end":{"line":10,"column":54}}})) != null ? stack1 : "")
    + " user\" href=\"#user_page\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"user") || (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data,"loc":{"start":{"line":10,"column":79},"end":{"line":10,"column":87}}}) : helper)))
    + "</a>\n  </a>\n  <a class=\"exit\" href=\"#exit\"></a>\n</div>\n";
},"useData":true});
})();