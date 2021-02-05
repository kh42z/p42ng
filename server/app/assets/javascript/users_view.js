var UsersView = Backbone.View.extend({
		el: $('#app'),
		initialize: function () {
			console.log("UsersView created");
			//this.render();
		},
		render: function () {
				this.$el.html("Users! page");
		}
});
export const usersView = new UsersView;
