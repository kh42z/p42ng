import { Router } from "./router.js"

$(document).ready(function() {
	let mainRouter = new Router;
	Backbone.history.start();

	console.log("Router created");
});