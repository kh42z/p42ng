(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twoFactor'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"two_factor\">\n    <input class=\"input\" type=\"text\" id=\"code\" name=\"code\" minlength=\"6\" maxlength=\"6\">\n    <button class=\"validate\">validate</button>\n</div>\n";
},"useData":true});
})();