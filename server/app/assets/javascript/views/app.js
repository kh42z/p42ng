let AppView = Backbone.View.extend({
	el: $('#app'),
	initialize: function () {
	},
	render: function () {
		let template = Handlebars.templates['navbar'];
		let context = {
			welcome: "Home page"
		}

		let templateData = template(context);
		this.$el.html(templateData);
	}
});
export const appView = new AppView;
