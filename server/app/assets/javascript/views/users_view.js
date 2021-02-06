let UsersView = Backbone.View.extend({
	el: $('#app'),
	initialize: function () {
		// this.render(templateData);
	},
	render: function () {
		let template = Handlebars.templates['navbar'];
		
		let context = {
			welcome: "Users! page"
		}

		let templateData = template(context);
		this.$el.html(templateData);
	}
});
export const usersView = new UsersView;
