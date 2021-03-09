import { Router } from './router/router.js'
import { Wrapper } from './models/wrapper.js'
import { SuperWrapper } from './collections/superWrapper.js'

import { Guilds } from './collections/guilds_collection.js'
import { Users } from './collections/users_collection.js'
import { Ladders } from './collections/laddersCollection.js'

$(document).ready(function () {
  const mainRouter = new Router()
  // = new Router({model: new SuperWrapper([new Wrapper({collection: new Guilds()}),
  // new Wrapper({collection: new Users()})])})
  Backbone.history.start()
  // Backbone.history.start({ pushState: true })
})
