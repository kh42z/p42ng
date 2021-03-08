(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['officerPannel'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Officers prerogatives</p>\n<label for=\"memberToInvite\" class=\"labelGuildField\">\n	<input class=\"nicknameSearch\" type=\"text\" id=\"nonMemberToInvite\"></input>\n</label>\n<button class=\"inviteMember\">Invite member</button>\n\n<div class=\"nicknameSearchResult\" id=\"inviteMemberResult\"></div>\n\n<label for=\"memberToKick\" class=\"labelGuildField\">\n	<input class=\"nicknameSearch\" type=\"text\" id=\"memberToKick\"></input>\n</label>\n<button class=\"kickMember\">Kick member</button>\n<div class=\"nicknameSearchResult\" id=\"kickMemberResult\"></div>\n";
},"useData":true});
})();