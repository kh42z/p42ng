import { CurrentWarView } from "./currentWarView.js"
import { LastWarView } from "./lastWarView.js"
import { MembersView } from "./membersView.js"
import { GuildOverviewView } from "./overviewView.js"

export class GuildController
{
	loadView(id, page, model)
	{
		let view;

		if (page == "current_war")
		{
			view = new CurrentWarView()
		}
		else if (page == "last_war")
		{
			view = new LastWarView()
		}
		else if (page == "members")
		{
			view = new MembersView()
			//veiw.render(user_collection, id)
		}
		else if (page == null || page == "overview" || page == "/")
		{
			view = new GuildOverviewView()
		}
		else // error, page invalid
			return ;
		//
		// maybe we should send the model directly to the view
		// view.render(model, id) ??
	}
};
