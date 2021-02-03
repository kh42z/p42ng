
//console.log("la dans app");
var AppView = Backbone.View.extend({
		el: $('#app'),
		initialize: function () {
				//this.render();
				console.log("yo");
		},
		render: function () {
				this.$el.html("Home page");
		}
});
export const appView = new AppView;
//var appView	= new AppView();
//appView.render();
//export const appView = new AppView;

//});
