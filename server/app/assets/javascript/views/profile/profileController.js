import { AchivementsView } from './achivementsView.js'
import { EditProfileView } from './editProfileView.js'
import { MatchHistoryView } from './matchHistoryView.js'
import { FriendsView } from './friendsView.js'
import { ProfileOverviewView } from './overviewView.js'

export class ProfileController {
  loadView (id, page, wrapper) {
    let view

    if (page === 'achivements') {
      view = new AchivementsView({ model: wrapper, id: id })
    } else if (page === 'edit_profile') {
      view = new EditProfileView({ model: wrapper, id: id })
    } else if (page === 'match_history' || page == null || page == '' || page == '/') {
      view = new MatchHistoryView({ model: wrapper, id: id })
    } else if (page === 'friends') {
      view = new FriendsView({ model: wrapper, id: id })
    } else {}
    // id should be check valid here
    // maybe we should send the model directly
    // view.render(model, id) ??
  }
};
