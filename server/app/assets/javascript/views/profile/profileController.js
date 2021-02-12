import { AchivementsView } from './achivementsView.js'
import { EditProfileView } from './editProfileView.js'
import { MatchHistoryView } from './matchHistoryView.js'
import { FriendsView } from './friendsView.js'
import { ProfileOverviewView } from './overviewView.js'

export class ProfileController {
  loadView (id, page, model) {
    let view

    if (page === 'achivements') {
      view = new AchivementsView()
      view.render()
    } else if (page === 'edit_profile') {
      view = new EditProfileView()
      view.render()
    } else if (page === 'match_history') {
      view = new MatchHistoryView()
      // veiw.render(user_collection, id)
      view.render()
    } else if (page === 'friends') {
      view = new FriendsView()
      view.render()
    } else // error, page invalid
    {}
    // id should be check valid here
    // maybe we should send the model directly
    // view.render(model, id) ??
  }
};
