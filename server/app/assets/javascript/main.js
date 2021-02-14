import { Router } from './router/router.js'

$(document).ready(function () {
  const mainRouter = new Router()
  Backbone.history.start()
  // Backbone.history.start({ pushState: true })
})
