let UsersView = Backbone.View.extend({
		el: $('#app'),
		initialize: function () {
			let template = Handlebars.templates['navbar'];
			
			let context = {
				welcome: "Users! page"
			}

			let templateData = template(context);
			this.render(templateData);
		},
		render: function (templateData) {
				this.$el.html(templateData);
		}
});
export const usersView = new UsersView;
