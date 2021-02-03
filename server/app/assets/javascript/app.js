
//console.log("la dans app");
let AppView = Backbone.View.extend({
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
//let appView	= new AppView();
//appView.render();
//export const appView = new AppView;

//});
