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
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":74},"end":{"line":16,"column":80}}}) : helper)))
    + "\" id=\"channel"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":93},"end":{"line":16,"column":99}}}) : helper)))
    + "\">\n                        <p class=\"channelName\">#"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":20,"column":48},"end":{"line":20,"column":56}}}) : helper)))
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"admin") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":24},"end":{"line":25,"column":31}}})) != null ? stack1 : "")
    + "                        <div class=\"close\">\n                            <img src='./icons/close.svg' class=\"close-icon\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":27,"column":80},"end":{"line":27,"column":86}}}) : helper)))
    + "></img>\n                        </div>\n                    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"admin_panel_settings\">\n                            <img src='./icons/admin_panel_settings.svg' class=\"admin_panel_settings-icon\"></img>\n                        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"clickable-discussions\" id=\"discussions"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":39,"column":70},"end":{"line":39,"column":76}}}) : helper)))
    + "\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":41,"column":37},"end":{"line":41,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":43,"column":52},"end":{"line":43,"column":64}}}) : helper)))
    + "</p>\n                        <div class=\"close\">\n                            <img src='./icons/close.svg' class=\"close-icon\" for="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":45,"column":80},"end":{"line":45,"column":86}}}) : helper)))
    + "></img>\n                        </div>\n                    </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"play-button\">\n                    <img src=\"./icons/videogame.svg\" height=\"24\">\n                </button>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"message\">\n                    <div class=\"info\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":86,"column":37},"end":{"line":86,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":88,"column":45},"end":{"line":88,"column":56}}}) : helper)))
    + "</div>\n                        <div class=\"nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":89,"column":46},"end":{"line":89,"column":58}}}) : helper)))
    + "</div>\n                        <div class=\"time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":90,"column":42},"end":{"line":90,"column":50}}}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"output\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":92,"column":40},"end":{"line":92,"column":51}}}) : helper)))
    + "</div>\n                </div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"right-side\">\n        <div class=\"privacy\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"privacy") || (depth0 != null ? lookupProperty(depth0,"privacy") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"privacy","hash":{},"data":data,"loc":{"start":{"line":103,"column":29},"end":{"line":103,"column":40}}}) : helper)))
    + " channel</div>\n        <div class=\"title online\">\n            <div class=\"pastille\"></div>\n            <div class=\"status ONLINE\">ONLINE-"
    + alias4(((helper = (helper = lookupProperty(helpers,"nbOnline") || (depth0 != null ? lookupProperty(depth0,"nbOnline") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nbOnline","hash":{},"data":data,"loc":{"start":{"line":106,"column":46},"end":{"line":106,"column":58}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"users usersOnline\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"usersOnline") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":109,"column":12},"end":{"line":124,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"title inGame\">\n            <div class=\"pastille\"></div>\n            <div class=\"status IN_GAME\">IN GAME-"
    + alias4(((helper = (helper = lookupProperty(helpers,"nbInGame") || (depth0 != null ? lookupProperty(depth0,"nbInGame") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nbInGame","hash":{},"data":data,"loc":{"start":{"line":128,"column":48},"end":{"line":128,"column":60}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"users usersInGame\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"usersInGame") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":131,"column":12},"end":{"line":144,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"title offline\">\n            <div class=\"pastille\"></div>\n            <div class=\"status OFFLINE\">OFFLINE-"
    + alias4(((helper = (helper = lookupProperty(helpers,"nbOffline") || (depth0 != null ? lookupProperty(depth0,"nbOffline") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nbOffline","hash":{},"data":data,"loc":{"start":{"line":148,"column":48},"end":{"line":148,"column":61}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"users usersOffline\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"usersOffline") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":151,"column":12},"end":{"line":161,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user\">\n                    <div class=\"name\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":113,"column":37},"end":{"line":113,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"name anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":115,"column":50},"end":{"line":115,"column":61}}}) : helper)))
    + "</div>\n                        <div class=\"name nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":116,"column":51},"end":{"line":116,"column":63}}}) : helper)))
    + "</div>\n                    </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"others") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":118,"column":20},"end":{"line":122,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"play-button-container\">\n                        <button class=\"play-button\">Play</button>         \n                    </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user\">\n                    <div class=\"name\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":135,"column":37},"end":{"line":135,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"name anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":137,"column":50},"end":{"line":137,"column":61}}}) : helper)))
    + "</div>\n                        <div class=\"name nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":138,"column":51},"end":{"line":138,"column":63}}}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"slide-show-container\">\n                        <img src=\"./icons/slideshow-ingame.svg\" class=\"slide-show-ingame\"></img>\n                    </div>\n                </div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user\">\n                    <div class=\"name\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":155,"column":37},"end":{"line":155,"column":50}}}) : helper)))
    + " class=\"image_url\"></img>\n                        </div>\n                        <div class=\"name anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":157,"column":50},"end":{"line":157,"column":61}}}) : helper)))
    + "</div>\n                        <div class=\"name nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":158,"column":51},"end":{"line":158,"column":63}}}) : helper)))
    + "</div>\n                    </div>\n                </div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachFriendModalCreateChannel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":178,"column":74},"end":{"line":178,"column":80}}}) : helper)))
    + "\">\n                    <div class=\"left\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":181,"column":37},"end":{"line":181,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":183,"column":52},"end":{"line":183,"column":63}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":183,"column":64},"end":{"line":183,"column":76}}}) : helper)))
    + "</p>\n                    </div>\n                    <div class=\"right\">\n                        <label class=\"checkboxlabel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"checkboxId") || (depth0 != null ? lookupProperty(depth0,"checkboxId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"checkboxId","hash":{},"data":data,"loc":{"start":{"line":186,"column":58},"end":{"line":186,"column":72}}}) : helper)))
    + "\"></label>\n                        <input type=\"checkbox\" class=\"checkbox\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":187,"column":68},"end":{"line":187,"column":74}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":187,"column":83},"end":{"line":187,"column":89}}}) : helper)))
    + "\"></input>\n                    </div>\n                </div>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachFriendModalCreateDirectMessages\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":207,"column":81},"end":{"line":207,"column":87}}}) : helper)))
    + "\">\n                    <div class=\"left\">\n                        <div class=\"image-container\">\n                            <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":210,"column":37},"end":{"line":210,"column":50}}}) : helper)))
    + " id=\"image_url\" class=\"image_url\"></img>\n                        </div>\n                        <p class=\"anagram_nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":212,"column":52},"end":{"line":212,"column":63}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":212,"column":64},"end":{"line":212,"column":76}}}) : helper)))
    + "</p>\n                    </div>\n                </div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"eachFriend eachChannel\" for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":229,"column":57},"end":{"line":229,"column":63}}}) : helper)))
    + "\">\n                        <p class=\"channel anagram_nickname\">#"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":234,"column":61},"end":{"line":234,"column":69}}}) : helper)))
    + "</p>\n                </div>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"admin\">\n                            <div class=\"image-container\">\n                                <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":291,"column":41},"end":{"line":291,"column":54}}}) : helper)))
    + " class=\"image_url\"></img>\n                            </div>\n                            <div class=\"anagram\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":294,"column":48},"end":{"line":294,"column":59}}}) : helper)))
    + "</p>\n                            </div>\n                            <div class=\"nickname\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":297,"column":48},"end":{"line":297,"column":60}}}) : helper)))
    + "</p>\n                            </div>\n                        </div>\n";
},"26":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"admin\">\n                            <div class=\"image-container\">\n                                <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":307,"column":41},"end":{"line":307,"column":54}}}) : helper)))
    + " class=\"image_url\"></img>\n                            </div>\n                            <div class=\"anagram\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":310,"column":48},"end":{"line":310,"column":59}}}) : helper)))
    + "</p>\n                            </div>\n                            <div class=\"nickname\">\n                                <p class=\"text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":313,"column":48},"end":{"line":313,"column":60}}}) : helper)))
    + "</p>\n                            </div>\n                            <div class=\"dots-container\">\n                                <img src='./icons/dots.svg' class=\"dots\"></img>\n                            </div>\n                            <div class=\"params\">\n                                <div class=\"appoint-as-admin\" id=\"appointAsAdministrator\">Appoint as administrator</div>\n                                <div class=\"mute\" id=\"mute\">Mute</div>\n                                <div class=\"ban\" id=\"ban\">Ban</div>\n                            </div>\n                        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"chat\">\n    <div class=\"discussions\">\n        <div class=\"title\">\n            <h2 class=\"h2-discussions\">Discussions</h2>\n        </div>\n        <div class=\"discussions-container\">\n            <div class=\"channels\">\n                <div class=\"first-line\">\n                    <div class=\"sub-title\">CHANNELS</div>\n                    <div class=\"icons\">\n                        <img src=\"./icons/search-chat.svg\" class=\"search_channel\"></img>\n                        <img src=\"./icons/add_box.svg\" class=\"add_box add_channel\"></img>\n                    </div>\n                </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"myChannels") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":16},"end":{"line":30,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"direct-messages\">\n                <div class=\"first-line\">\n                    <div class=\"sub-title\">DIRECT MESSAGES</div>\n                    <img src=\"./icons/add_box.svg\" class=\"add_box add_direct_messages\"></img>\n                </div>\n                <div class=\"DM\" id=\"DM\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"DM") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":16},"end":{"line":48,"column":25}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"center\">\n        <div class=\"header\">\n            <div class=\"left-header\">\n                <div class=\"image-container\">\n                    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":57,"column":29},"end":{"line":57,"column":42}}}) : helper)))
    + " class=\"image_url\"></img>\n                </div>\n                <div class=\"info\">\n                    <p class=\"anagram\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anagram") || (depth0 != null ? lookupProperty(depth0,"anagram") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anagram","hash":{},"data":data,"loc":{"start":{"line":60,"column":39},"end":{"line":60,"column":50}}}) : helper)))
    + "</p>\n                    <p class=\"nickname\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":61,"column":40},"end":{"line":61,"column":52}}}) : helper)))
    + "</p>\n                    <div class=\"pastille\"></div>\n                    <p class=\"status\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":63,"column":38},"end":{"line":63,"column":48}}}) : helper)))
    + "</p>\n                    <div class=\"slide-show-container\">\n                        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"slide_show") || (depth0 != null ? lookupProperty(depth0,"slide_show") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slide_show","hash":{},"data":data,"loc":{"start":{"line":65,"column":34},"end":{"line":65,"column":48}}}) : helper)))
    + "\" class=\"slide-show\"></img>\n                    </div>\n                </div>\n            </div>\n            <div class=\"right-header\">\n                <div class=\"group_add-container\">\n                    <img src=\"./icons/group_add.svg\" class=\"group_add\"></img>\n                </div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":73,"column":16},"end":{"line":77,"column":27}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n        <div class=\"messages\">\n            <div class=\"scrollable\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":82,"column":16},"end":{"line":94,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        <div class=\"input-container\">\n            <input class=\"textInput input\" type=\"text\">\n        </div>\n        </div>\n    </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":101,"column":4},"end":{"line":164,"column":11}}})) != null ? stack1 : "")
    + "    <div class=\"modal modalCreateChannel\" id=\"modalCreateChannel\">\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelChannelName\" for=\"channelName\">Channel name</label>\n            <input class=\"textInput channelName\" type=\"text\" id=\"channelName\" placeholder=\"New channel\"></input>\n            <p class=\"error-message\" id=\"error-message\"></p>\n            <label class=\"label labelSelectFriends\" for=\"search\">Select friends</label>\n            <input class=\"textInput search modalSearchChannels\" type=\"text\" id=\"modalSearchChannels\" placeholder=\"Research\"></input>\n            <div class=\"friends modalSearchChannels\" id=\"friendsmodalSearchChannels\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"friends") : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":177,"column":16},"end":{"line":190,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"button-container\">\n                <button class=\"createChannel\">Create channel</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal modalCreateDirectMessages\" id=\"modalCreateDirectMessages\">\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelSelectFriends\" for=\"search\">Select friends</label>\n            <input class=\"textInput search modalSearchDirectMessages\" type=\"text\" id=\"modalSearchDirectMessages\" placeholder=\"Research\"></input>\n            <div class=\"friends friendsmodalSearchDirectMessages\" id=\"friendsmodalSearchDirectMessages\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"friends") : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":206,"column":16},"end":{"line":215,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    <div class=\"modal modalSearchChannel\" id=\"modalSearchAllChannels\">\n        <div class=\"background\"></div>\n        <div class=\"modalOpen\">\n            <div class=\"close\">\n                <img src=\"./icons/close.svg\" id=\"close\"></img>\n            </div>\n            <label class=\"label labelSelectChannel\" for=\"search\">Channels</label>\n            <input class=\"textInput inputModalSearchAllChannels\" type=\"text\" id=\"inputModalSearchAllChannels\" placeholder=\"Research\"></input>\n            <div class=\"friends searchAllChannel\" id=\"searchAllChannel\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"channels") : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":228,"column":16},"end":{"line":241,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    <div class=\"parameters\">\n        <div class=\"left-menu\">\n            <div class=\"menu\">\n                <div class=\"overview-menu\" id=\"overview-menu\">Overview</div>\n                <div class=\"permissions-menu\"  id=\"permissions-menu\">Permissions</div>\n                <div class=\"members-menu\" id=\"members-menu\">Members</div>\n            </div>\n            <div class=\"delete\">Delete channel</div>\n        </div>\n        <div class=\"right-menu\">\n            <div class=\"close\">\n                <img src=\"./icons/esc.svg\" class=\"close\">\n            </div>\n            <div class=\"overview\">\n                <div class=\"title\">OVERVIEW</div>\n                <div class=\"sub-title\">CHANNEL NAME</div>\n                <input type=\"text\" class=\"name\" disabled>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":261,"column":57},"end":{"line":261,"column":72}}}) : helper)))
    + "</input>\n            </div>\n            <div class=\"permissions\">\n                <div class=\"title\">PERMISSIONS</div>\n                <div class=\"sub-title\">CONFIDENTIALITY</div>\n                <div class=\"radio-button\">\n                    <input type=\"radio\" id=\"private\" name=\"privacy\" value=\"private\" checked>\n                    <label for=\"private\">Private</label> \n                </div>\n                <div class=\"radio-button\">\n                    <input type=\"radio\" id=\"public\" name=\"privacy\" value=\"public\">\n                    <label for=\"public\">Public</label> \n                </div>\n                <div class=\"radio-button\">\n                    <input type=\"radio\" id=\"protected\" name=\"privacy\" value=\"protected\">\n                    <label for=\"protected\">Protected</label> \n                </div>\n                <div class=\"password\">\n                    <label for=\"password\">Password:</label>\n                    <input type=\"password\" id=\"password\" name=\"password\">\n                    <button class=\"save\">Save</button>\n                </div>\n            </div>\n            <div class=\"members\">\n                <div class=\"title\">MEMBERS</div>\n                <div class=\"sub-title\">ADMINISTRATORS</div>\n                <div class=\"admins\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"admins") : depth0),{"name":"each","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":288,"column":20},"end":{"line":300,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"sub-title\">OTHER MEMBERS</div>\n                <div class=\"admins\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"admins") : depth0),{"name":"each","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":304,"column":20},"end":{"line":324,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();