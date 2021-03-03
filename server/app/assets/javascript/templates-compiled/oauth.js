(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['oauth'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"oauth\">\n    <h1 class=\"logo\"></h1>\n    <button class=\"signIn\"\n    onclick=\"window.location.href='/auth/marvin?auth_origin_url=http://p42ng.herokuapp.com/#connexion'\"></button>\n</div>";
},"useData":true});
})();