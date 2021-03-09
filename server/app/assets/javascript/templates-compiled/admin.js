(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['admin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <tr>\n                    <td>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + " </td>\n                    <td>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"nickname") : depth0), depth0))
    + "</td>\n                    <td>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"status") : depth0), depth0))
    + "</td>\n                    <td><input type=\"checkbox\" name=\"banned\" for="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + " class=\"banned\" "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"banned") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":92},"end":{"line":17,"column":127}}})) != null ? stack1 : "")
    + "</td>\n                </tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "checked>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"adminView\">\n    <table>\n        <thead>\n        <tr>\n            <th>ID</th>\n            <th>Username</th>\n            <th>Status</th>\n            <th>Banned</th>\n        </tr>\n        </thead>\n        <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"users") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":19,"column":21}}})) != null ? stack1 : "")
    + "        </tbody>\n    </table>\n</div>";
},"useData":true});
})();