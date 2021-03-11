/* eslint-disable eqeqeq */
import { GuildView } from './guildView.js'

export class GuildController {
  loadView (id, wrapper) {
    let view
    view = new GuildView({ model: wrapper, id: id })
  };
}
