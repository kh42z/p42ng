let UsersView = Backbone.View.extend({
		el: $('#app'),
		initialize: function () {
			console.log("UsersView created");
	    	let templateInfo = document.getElementById("navbar-template").innerHTML;
			let template = Handlebars.compile(templateInfo);
			template = Handlebars.templates['navbar'];
			
			let context = {
				welcome: "Users! page"
			}

			var templateData = template(context);
			this.render(templateData);
		},
		render: function (templateData) {
				this.$el.html(templateData);
		}
});
export const usersView = new UsersView;
