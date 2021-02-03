//$(document).ready(function() {
//console.log("ici dans users");
let UsersView = Backbone.View.extend({
		el: $('#app'),
		initialize: function () {
				//this.render();
				console.log("UsersView created");
		},
		render: function () {
				this.$el.html("Users! page");
		}
});
export const usersView = new UsersView;

//console.log("mkldsqjdqs");
//});
