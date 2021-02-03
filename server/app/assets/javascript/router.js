import { appView } from "./app.js"
import { usersView } from "./users_view"
import { PongView } from "./pong.js"
//		console.log("la dans router");

export var Router = Backbone.Router.extend(
	{
		initialize: function() {
			this.appView = appView;
			this.usersView = usersView;
			this.pongView = new PongView;
			console.log("In router initialize");
		},

		routes:
		{
			//"/l": "home_view",
			"users": "users_view",
			"home": "home_view",
			"pong": "pong_view",
			'': "home_view"
		},

		home_view: function(url)
		{
			console.log("in home route");
			this.appView.render()
		},

		users_view: function(url)
		{
			console.log("in users_view route");
			this.usersView.render();
		},

		pong_view: function(url)
		{
			console.log("in pong view");
			this.pongView.render();
		}
	});

//$(document).ready();
//$(document).ready(function() {
// all this should be in a main.js i think
/*new Router();
Backbone.history.start();

console.log("Router created");*/
//	export const router = new Router;
//});
