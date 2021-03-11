(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['guildSubNavBar'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"subNavBar\">\n		<li id=\"currentWar\" ><span class=\"subNavBarEl\">War</span></li>\n		<li id=\"lastWars\"><span class=\"subNavBarEl\">Last wars</span></li>\n		<li id=\"members\"> <span class=\"subNavBarEl\">Members</span></li>\n</ul>\n";
},"useData":true});
})();