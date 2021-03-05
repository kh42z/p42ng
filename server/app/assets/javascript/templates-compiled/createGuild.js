(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['createGuild'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"content\">\n	<style>\n		.errorMessage\n		{\n			color: red;\n		}\n	</style>\n	<p>It seems you don't belong in any guild, do you wish to create one?</p>\n	<label for=\"guildName\">Guild name:\n		<input id=\"guildName\" type=\"text\"></input>\n	</label>\n	<div id=\"nameError\" class=\"errorMessage\"></div>\n	<label for=\"guildAnagram\">Guild name:\n		<input id=\"guildAnagram\" type=\"text\"></input>\n	</label>\n	<div id=\"anagramError\" class=\"errorMessage\"></div>\n	<div id=\"errorField\" class=\"errorMessage\"></div>\n	<button class=\"createGuild\">Create guild</button>\n</div>\n";
},"useData":true});
})();