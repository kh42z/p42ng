import { AchivementsView } from './achivementsView.js'
import { EditProfileView } from './editProfileView.js'
import { MatchHistoryView } from './matchHistoryView.js'
import { FriendsView } from './friendsView.js'
import { ProfileOverviewView } from "./overviewView.js"

import { User } from "../../models/user_model.js"

import { UserHandler } from "../../utils/userHandler.js"

export class ProfileController
{
	loadView(id, page)
	{
		let view;

		if (page == "achivements")
		{
			view = new AchivementsView()
		}
		else if (page == "edit_profile")
		{
			view = new EditProfileView()
		}
		else if (page == "match_history")
		{
			view = new MatchHistoryView()
			//veiw.render(user_collection, id)
		}
		else if (page == "friends")
		{
			view = new FriendsView()
		}
		else if (page == null || page == "overview" || page == "/")
		{
			//let userHandler = new UserHandler(id)
			let user = new User("/api/users/" + id)
			//console.log(userH.get("nickname"))
			view = new ProfileOverviewView({ model: user })
		}
		else // error, page invalid
			return ;
		// id should be check valid here
		// maybe we should send the model directly
		// view.render(model, id) ??
	}
};
