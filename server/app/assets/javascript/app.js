let AppView = Backbone.View.extend({
	el: $('#app'),
	initialize: function () {
		let template = Handlebars.templates['navbar'];
		console.log(template)

		let context = {
			welcome: "Home page"
		}

		let templateData = template(context);
		this.render(templateData);
	},
	render: function (templateData) {
			this.$el.html(templateData);
	}
});
export const appView = new AppView;
