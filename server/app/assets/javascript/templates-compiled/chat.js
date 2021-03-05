(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chat'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"clickable-discussions clikable-discussions"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":74},"end":{"line":17,"column":80}}}) : helper)))
    + "\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":86},"end":{"line":17,"column":92}}}) : helper)))
    + " id=\"channel"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":104},"end":{"line":17,"column":110}}}) : helper)))
    + "\">\n                        <p class=\"channelName\">#"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":21,"column":48},"end":{"line":21,"column":56}}}) : helper)))
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"admin") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":24},"end":{"line":26,"column":31}}})) != null ? stack1 : "")
    + "                        <div class=\"close delete\">\n                            <img src='./icons/close.svg' class=\"close-icon\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":28,"column":80},"end":{"line":28,"column":86}}}) : helper)))
    + "></img>\n                        </div>\n                    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"admin_panel_settings\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":23,"column":63},"end":{"line":23,"column":69}}}) : helper)))
    + "\">\n                            <img src='./icons/admin_panel_settings.svg' class=\"admin_panel_settings-icon\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":24,"column":110},"end":{"line":24,"column":116}}}) : helper)))
    + "></img>\n                        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"clickable-discussions\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":41,"column":59},"end":{"line":41,"column":65}}}) : helper)))
    + " id=\"DM"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":41,"column":72},"end":{"line":41,"column":78}}}) : helper)))
    + "\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":43,"column":37},"end":{"line":43,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":45,"column":52},"end":{"line":45,"column":64}}}) : helper)))
    + "</p>\n                        <div class=\"close\">\n                            <img src='./icons/close.svg' class=\"close-icon\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":47,"column":80},"end":{"line":47,"column":86}}}) : helper)))
    + "></img>\n                        </div>\n                    </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"image-container\">\n                    <img src="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":60,"column":29},"end":{"line":60,"column":42}}}) : helper)))
    + " class=\"image_url\"></img>\n                </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <p class=\"anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":65,"column":39},"end":{"line":65,"column":50}}}) : helper)))
    + "</p>\n                    <p class=\"nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":66,"column":40},"end":{"line":66,"column":52}}}) : helper)))
    + "</p>\n                    <div class=\"pastille\" id=\"pastille\"></div>\n                    <p class=\"status\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":68,"column":38},"end":{"line":68,"column":48}}}) : helper)))
    + "</p>\n                    <div class=\"slide-show-container\">\n                        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"slide_show") || (depth0 != null ? lookupProperty(depth0,"slide_show") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slide_show","hash":{},"data":data,"loc":{"start":{"line":70,"column":34},"end":{"line":70,"column":48}}}) : helper)))
    + "\" class=\"slide-show\"></img>\n                    </div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <p class=\"name\">#"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":74,"column":37},"end":{"line":74,"column":45}}}) : helper)))
    + "</p>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"owner") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":16},"end":{"line":84,"column":23}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"group_add-container\">\n                    <img src=\"./icons/group_add.svg\" class=\"group_add\"></img>\n                </div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"play-button\">\n                    <img src=\"./icons/videogame.svg\" height=\"24\">\n                </button>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"message\">\n                    <div class=\"info\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":99,"column":37},"end":{"line":99,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":101,"column":45},"end":{"line":101,"column":56}}}) : helper)))
    + "</div>\n                        <div class=\"nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":102,"column":46},"end":{"line":102,"column":58}}}) : helper)))
    + "</div>\n                        <div class=\"time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":103,"column":42},"end":{"line":103,"column":50}}}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"output\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":105,"column":40},"end":{"line":105,"column":51}}}) : helper)))
    + "</div>\n                </div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user\">\n                    <div class=\"name\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":125,"column":37},"end":{"line":125,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"name anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":127,"column":50},"end":{"line":127,"column":61}}}) : helper)))
    + "</div>\n                        <div class=\"name nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":128,"column":51},"end":{"line":128,"column":63}}}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"play-button-container\">\n                        <button class=\"play-button\">Play</button>         \n                    </div>\n                </div>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user\">\n                    <div class=\"name\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":147,"column":37},"end":{"line":147,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"name anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":149,"column":50},"end":{"line":149,"column":61}}}) : helper)))
    + "</div>\n                        <div class=\"name nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":150,"column":51},"end":{"line":150,"column":63}}}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"slide-show-container\">\n                        <img src=\"./icons/slideshow-ingame.svg\" class=\"slide-show-ingame\"></img>\n                    </div>\n                </div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user\">\n                    <div class=\"name\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":167,"column":37},"end":{"line":167,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"name anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":169,"column":50},"end":{"line":169,"column":61}}}) : helper)))
    + "</div>\n                        <div class=\"name nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":170,"column":51},"end":{"line":170,"column":63}}}) : helper)))
    + "</div>\n                    </div>\n                </div>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachFriendModalCreateChannel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":189,"column":74},"end":{"line":189,"column":80}}}) : helper)))
    + "\">\n                    <div class=\"left\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":192,"column":37},"end":{"line":192,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":194,"column":52},"end":{"line":194,"column":63}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":194,"column":64},"end":{"line":194,"column":76}}}) : helper)))
    + "</p>\n                    </div>\n                    <div class=\"right\">\n                        <label class=\"checkboxlabel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"checkboxId") || (depth0 != null ? lookupProperty(depth0,"checkboxId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"checkboxId","hash":{},"data":data,"loc":{"start":{"line":197,"column":58},"end":{"line":197,"column":72}}}) : helper)))
    + "\"></label>\n                        <input type=\"checkbox\" class=\"checkbox\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":198,"column":68},"end":{"line":198,"column":74}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":198,"column":83},"end":{"line":198,"column":89}}}) : helper)))
    + "\"></input>\n                    </div>\n                </div>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachFriendModalCreateDirectMessages\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":218,"column":81},"end":{"line":218,"column":87}}}) : helper)))
    + "\">\n                    <div class=\"left\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":221,"column":37},"end":{"line":221,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":223,"column":52},"end":{"line":223,"column":63}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":223,"column":64},"end":{"line":223,"column":76}}}) : helper)))
    + "</p>\n                    </div>\n                </div>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachChannel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":240,"column":57},"end":{"line":240,"column":63}}}) : helper)))
    + "\">\n                        <p class=\"channel anagram_nickname\">#"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":245,"column":61},"end":{"line":245,"column":69}}}) : helper)))
    + "</p>\n                </div>\n";
},"31":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachFriendModalCreateChannel\" for=\"addfriends"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":281,"column":84},"end":{"line":281,"column":90}}}) : helper)))
    + "\">\n                    <div class=\"left\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":284,"column":37},"end":{"line":284,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":286,"column":52},"end":{"line":286,"column":63}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":286,"column":64},"end":{"line":286,"column":76}}}) : helper)))
    + "</p>\n                    </div>\n                    <div class=\"right\">\n                        <label class=\"checkboxlabel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"checkboxId") || (depth0 != null ? lookupProperty(depth0,"checkboxId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"checkboxId","hash":{},"data":data,"loc":{"start":{"line":289,"column":58},"end":{"line":289,"column":72}}}) : helper)))
    + "\"></label>\n                        <input type=\"checkbox\" class=\"checkbox\" id=\"addfriends"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":290,"column":78},"end":{"line":290,"column":84}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":290,"column":93},"end":{"line":290,"column":99}}}) : helper)))
    + "\"></input>\n                    </div>\n                </div>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"self owner\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":347,"column":37},"end":{"line":347,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"anagram\">\n                            <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":350,"column":44},"end":{"line":350,"column":55}}}) : helper)))
    + "</p>\n                        </div>\n                        <div class=\"nickname\">\n                            <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":353,"column":44},"end":{"line":353,"column":56}}}) : helper)))
    + "</p>\n                        </div>\n                    </div>\n";
},"35":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"self admin\">\n                            <div class=\"image-container\">\n                                <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":363,"column":41},"end":{"line":363,"column":54}}}) : helper)))
    + " class=\"image_url\"></img>\n                            </div>\n                            <div class=\"anagram\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":366,"column":48},"end":{"line":366,"column":59}}}) : helper)))
    + "</p>\n                            </div>\n                            <div class=\"nickname\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":369,"column":48},"end":{"line":369,"column":60}}}) : helper)))
    + "</p>\n                            </div>\n                        </div>\n";
},"37":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"self member\">\n                            <div class=\"image-container\">\n                                <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":379,"column":41},"end":{"line":379,"column":54}}}) : helper)))
    + " class=\"image_url\"></img>\n                            </div>\n                            <div class=\"anagram\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":382,"column":48},"end":{"line":382,"column":59}}}) : helper)))
    + "</p>\n                            </div>\n                            <div class=\"nickname\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":385,"column":48},"end":{"line":385,"column":60}}}) : helper)))
    + "</p>\n                            </div>\n                            <div class=\"dots-container\">\n                                <img src='./icons/dots.svg' class=\"dots\"></img>\n                            </div>\n                            <div class=\"params\" style=\"display: none;\">\n                                <div class=\"appoint-as-admin\" id=\"appointAsAdministrator\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":391,"column":95},"end":{"line":391,"column":101}}}) : helper)))
    + "\">Appoint as administrator</div>\n                                <div class=\"mute\" id=\"mute\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":392,"column":65},"end":{"line":392,"column":71}}}) : helper)))
    + "\">Mute</div>\n                                <div class=\"ban\" id=\"ban\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":393,"column":63},"end":{"line":393,"column":69}}}) : helper)))
    + "\">Ban</div>\n                            </div>\n                        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"chat\" id=\"chat\">\n    <div class=\"discussions\" id=\"discussions\">\n        <div class=\"title\">\n            <h2 class=\"h2-discussions\">Discussions</h2>\n        </div>\n        <div class=\"discussions-container\">\n            <div class=\"channels\">\n                <div class=\"first-line\">\n                    <div class=\"sub-title\">CHANNELS</div>\n                    <div class=\"icons\">\n                        <img src=\"./icons/search-chat.svg\" class=\"search_channel\"></img>\n                        <img src=\"./icons/add_box.svg\" class=\"add_box add_channel\"></img>\n                    </div>\n                </div>\n                <div class=\"myChannels\" id=\"myChannels\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"myChannels") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":16},"end":{"line":31,"column":25}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n            <div class=\"direct-messages\">\n                <div class=\"first-line\">\n                    <div class=\"sub-title\">DIRECT MESSAGES</div>\n                    <img src=\"./icons/add_box.svg\" class=\"add_box add_direct_messages\"></img>\n                </div>\n                <div class=\"DM\" id=\"DM\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"DM") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":16},"end":{"line":50,"column":25}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"center\" id=\"center\">\n        <div class=\"header\">\n            <div class=\"left-header\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":16},"end":{"line":62,"column":27}}})) != null ? stack1 : "")
    + "                <div class=\"info\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":20},"end":{"line":72,"column":31}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":73,"column":20},"end":{"line":75,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n            <div class=\"right-header\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":79,"column":16},"end":{"line":85,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"unless","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":86,"column":16},"end":{"line":90,"column":27}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n        <div class=\"messages\">\n            <div class=\"scrollable\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":95,"column":16},"end":{"line":107,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        <div class=\"input-container\">\n            <input class=\"textInput input\" type=\"text\">\n        </div>\n        </div>\n    </div>\n    <div class=\"right-side\" id=\"right-side\">\n        <div class=\"privacy\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"privacy") || (depth0 != null ? lookupProperty(depth0,"privacy") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"privacy","hash":{},"data":data,"loc":{"start":{"line":115,"column":29},"end":{"line":115,"column":40}}}) : helper)))
    + " channel</div>\n        <div class=\"title online\">\n            <div class=\"pastille\"></div>\n            <div class=\"status ONLINE\">ONLINE-"
    + alias4(((helper = (helper = lookupProperty(helpers,"nbOnline") || (depth0 != null ? lookupProperty(depth0,"nbOnline") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nbOnline","hash":{},"data":data,"loc":{"start":{"line":118,"column":46},"end":{"line":118,"column":58}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"users usersOnline\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"usersOnline") : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":121,"column":12},"end":{"line":136,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"title inGame\">\n            <div class=\"pastille\"></div>\n            <div class=\"status IN_GAME\">IN GAME-"
    + alias4(((helper = (helper = lookupProperty(helpers,"nbInGame") || (depth0 != null ? lookupProperty(depth0,"nbInGame") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nbInGame","hash":{},"data":data,"loc":{"start":{"line":140,"column":48},"end":{"line":140,"column":60}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"users usersInGame\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"usersInGame") : depth0),{"name":"each","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":143,"column":12},"end":{"line":156,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"title offline\">\n            <div class=\"pastille\"></div>\n            <div class=\"status OFFLINE\">OFFLINE-"
    + alias4(((helper = (helper = lookupProperty(helpers,"nbOffline") || (depth0 != null ? lookupProperty(depth0,"nbOffline") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nbOffline","hash":{},"data":data,"loc":{"start":{"line":160,"column":48},"end":{"line":160,"column":61}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"users usersOffline\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"usersOffline") : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":163,"column":12},"end":{"line":173,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"modal modalCreateChannel\" id=\"modalCreateChannel\" >\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close closeModal\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelChannelName\" for=\"channelName\">Channel name</label>\n            <input class=\"textInput channelName\" type=\"text\" id=\"channelName\" placeholder=\"New channel\"></input>\n            <p class=\"error-message\" id=\"error-message\"></p>\n            <label class=\"label labelSelectFriends\" for=\"search\">Select friends</label>\n            <input class=\"textInput search modalSearchChannels\" type=\"text\" id=\"modalSearchChannels\" placeholder=\"Research\"></input>\n            <div class=\"friends modalSearchChannels\" id=\"friendsmodalSearchChannels\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"friends") : depth0),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":188,"column":16},"end":{"line":201,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"button-container\">\n                <button class=\"createChannel\">Create channel</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal modalCreateDirectMessages\" id=\"modalCreateDirectMessages\">\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close closeModal\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelSelectFriends\" for=\"search\">Select friends</label>\n            <input class=\"textInput search modalSearchDirectMessages\" type=\"text\" id=\"modalSearchDirectMessages\" placeholder=\"Research\"></input>\n            <div class=\"friends friendsmodalSearchDirectMessages\" id=\"friendsmodalSearchDirectMessages\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"friends") : depth0),{"name":"each","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":217,"column":16},"end":{"line":226,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    <div class=\"modal modalSearchChannel\" id=\"modalSearchAllChannels\">\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close closeModal\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelSelectChannel\" for=\"search\">Channels</label>\n            <input class=\"textInput inputModalSearchAllChannels\" type=\"text\" id=\"inputModalSearchAllChannels\" placeholder=\"Research\"></input>\n            <div class=\"friends searchAllChannel\" id=\"searchAllChannel\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"channels") : depth0),{"name":"each","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":239,"column":16},"end":{"line":252,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    <div class=\"modal validationModal\" id=\"modalValidationDeleteChannel\">\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <p class=\"sure\">Are you sure to want to leave this channel?</p>\n            <p class=\"adminRights\">You will lose your administrator rights</p>\n            <div class=\"buttons\">\n                <div class=\"validation-buttons button-container-yes\">\n                    <button class=\"button yes\">Yes</button>\n                </div>\n                <div class=\"validation-buttons button-container-no\">\n                    <button class=\"button no\">No</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal modalAddFriendsToChannel\" id=\"modalAddFriendsToChannel\" >\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close closeModal\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelSelectFriends\" for=\"search\">Select friends</label>\n            <input class=\"textInput search modalSearchChannels\" type=\"text\" id=\"modalSearchAddFriendsToChannel\" placeholder=\"Research\"></input>\n            <div class=\"friends modalSearchAddFriendsToChannel\" id=\"friendsmodalSearchAddFriendsToChannel\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"friends") : depth0),{"name":"each","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":280,"column":16},"end":{"line":293,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"button-container buttons\">\n                <button class=\"validation-buttons button validate-add-friends\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"chatId") || (depth0 != null ? lookupProperty(depth0,"chatId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"chatId","hash":{},"data":data,"loc":{"start":{"line":296,"column":84},"end":{"line":296,"column":94}}}) : helper)))
    + "\">Validate</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"parameters\" id=\"params\">\n        <div class=\"left-menu\">\n            <div class=\"menu\">\n                <div class=\"sub-menu overview-menu\" id=\"overview-menu\"><p class=\"p\">Overview</p></div>\n                <div class=\"sub-menu permissions-menu\"  id=\"permissions-menu\"><p class=\"p\">Permissions</p></div>\n                <div class=\"sub-menu members-menu\" id=\"members-menu\"><p class=\"p\">Members</p></div>\n                <div class=\"delete\">Delete channel</div>\n            </div>\n        </div>\n        <div class=\"right-menu\">\n            <div class=\"close closeParams\">\n                <img src=\"./icons/esc.svg\" class=\"close\">\n            </div>\n            <div class=\"page overview\" id=\"params-overview\">\n                <div class=\"title\">OVERVIEW</div>\n                <div class=\"sub-title\">CHANNEL NAME</div>\n                <input type=\"text\" class=\"name\" disabled value="
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":316,"column":63},"end":{"line":316,"column":71}}}) : helper)))
    + "></input>\n            </div>\n            <div class=\"page permissions\" id=\"params-permissions\">\n                <div class=\"title\">PERMISSIONS</div>\n                <div class=\"sub-title\">CONFIDENTIALITY</div>\n                <div class=\"radio-button\">\n                    <input type=\"radio\" id=\"private\" name=\"privacy\" value=\"private\" checked>\n                    <label for=\"private\">Private</label> \n                </div>\n                <div class=\"radio-button\">\n                    <input type=\"radio\" id=\"public\" name=\"privacy\" value=\"public\">\n                    <label for=\"public\">Public</label> \n                </div>\n                <div class=\"radio-button\">\n                    <input type=\"radio\" id=\"protected\" name=\"privacy\" value=\"protected\"></input>\n                    <label for=\"protected\">Protected</label> \n                </div>\n                <div class=\"password\">\n                    <label for=\"password\">Password</label>\n                    <input type=\"password\" id=\"password\" name=\"password\"></input>\n                    <div class=\"visibility\"></div>\n                    <button class=\"save\">Save</button>\n                </div>\n            </div>\n            <div class=\"page members\" id=\"params-members\">\n                <div class=\"title\">MEMBERS</div>\n                <div class=\"sub-title\">OWNER</div>\n                <div class=\"list owner\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"owner") : depth0),{"name":"each","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":344,"column":20},"end":{"line":356,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"sub-title\">ADMINISTRATORS</div>\n                <div class=\"list admins\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"admins") : depth0),{"name":"each","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":360,"column":20},"end":{"line":372,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"sub-title\">OTHER MEMBERS</div>\n                <div class=\"list participants\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"members") : depth0),{"name":"each","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":376,"column":20},"end":{"line":396,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();