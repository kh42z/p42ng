/* eslint-disable eqeqeq */
import { CurrentWarView } from './currentWarView.js'
import { LastWarsView } from './lastWarsView.js'
import { MembersView } from './membersView.js'

export class GuildController {
  loadView (id, page, wrapper) {
    let view
    if (page === 'current_war' || page == null || page == '/' || page == '') {
      view = new CurrentWarView({ model: wrapper, id: id })
      // view.render()
    } else if (page === 'last_wars') {
      view = new LastWarsView({ model: wrapper, id: id })
      // view.render()
    } else if (page === 'members' || page == null || page == '/' || page == '') {
      view = new MembersView({ model: wrapper, id: id })
    } else { // error, page invalid
    }
  }
};
