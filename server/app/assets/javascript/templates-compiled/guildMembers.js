(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['guildMembers'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr class=\"membersListEl\">\n				<td>Gold</td>\n				<td>1</td>\n				<td>profilePic</td>\n				<td><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":34,"column":26},"end":{"line":34,"column":32}}}) : helper)))
    + "/\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":34,"column":35},"end":{"line":34,"column":47}}}) : helper)))
    + "</a></td>\n				<td>2</td>\n				<td>3500</td>\n				<td>12</td>\n				<td>50</td>\n				<td>offline</td>\n				<td>Officer</td>\n		</tr>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr class=\"membersListEl\">\n				<td>Gold</td>\n				<td>1</td>\n				<td>profilePic</td>\n				<td><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":49,"column":26},"end":{"line":49,"column":32}}}) : helper)))
    + "/\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nickname") || (depth0 != null ? lookupProperty(depth0,"nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data,"loc":{"start":{"line":49,"column":35},"end":{"line":49,"column":47}}}) : helper)))
    + "</a></td>\n				<td>2</td>\n				<td>4</td>\n				<td>1</td>\n				<td>2</td>\n				<td>offline</td>\n				<td>Member</td>\n		</tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"guildBlock\" class=\"lastWarsBlock\">\n	<table id=\"membersList\">\n	<tr id=\"guildMembersIndex\">\n		<th>12?? gamers</th>\n		<th></th>\n		<th></th>\n		<th>Pseudo</th>\n		<th>league Rank</th>\n		<th>General Rank</th>\n		<th>Victories</th>\n		<th>Total Games</th>\n		<th>Status</th>\n		<th>Status</th>\n	</tr>\n\n	<tr class=\"membersListEl\">\n		<td>Gold</td>\n		<td>1</td>\n		<td>profilePic</td>\n		<td><a href=\"#profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"owner_id") || (depth0 != null ? lookupProperty(depth0,"owner_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner_id","hash":{},"data":data,"loc":{"start":{"line":20,"column":24},"end":{"line":20,"column":36}}}) : helper)))
    + "/\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"owner_nickname") || (depth0 != null ? lookupProperty(depth0,"owner_nickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner_nickname","hash":{},"data":data,"loc":{"start":{"line":20,"column":39},"end":{"line":20,"column":57}}}) : helper)))
    + "</a></td>\n		<td>1</td>\n		<td>1000</td>\n		<td>42</td>\n		<td>1001</td>\n		<td>online</td>\n		<td>Owner</td>\n	</tr>\n\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"officers") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":2},"end":{"line":42,"column":11}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"members") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":2},"end":{"line":57,"column":11}}})) != null ? stack1 : "")
    + "	</table>\n</section>\n";
},"useData":true});
})();