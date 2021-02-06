import { Router } from "./router/router.js"

$(document).ready(function() {
	var mainRouter = new Router;
	Backbone.history.start();

	console.log("Router created");
});
