import { CurrentWarView } from './currentWarView.js'
import { LastWarsView } from './lastWarsView.js'
import { MembersView } from './membersView.js'

export class GuildController {
  loadView (id, page, wrapper) {
    let view
    console.log(page)
    if (page === 'current_war') {
      view = new CurrentWarView({ model: wrapper, id: id })
      // view.render()
    } else if (page === 'last_war') {
      view = new LastWarView({ model: wrapper, id: id })
      // view.render()
    } else if (page === 'members' || page == null || page == '/' || page == '') {
      view = new MembersView({ model: wrapper, id: id })
    } else // error, page invalid
    {}
  }
};
