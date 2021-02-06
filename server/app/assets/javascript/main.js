import { Router } from './router/router.js'

// eslint-disable-next-line no-undef
$(document).ready(function () {
  // eslint-disable-next-line no-unused-vars
  const mainRouter = new Router()
  // eslint-disable-next-line no-undef
  Backbone.history.start()
})
