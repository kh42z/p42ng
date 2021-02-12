import { CurrentWarView } from "./currentWarView.js"
import { LastWarView } from "./lastWarView.js"
import { MembersView } from "./membersView.js"

export class GuildController
{
	loadView(id, page, model)
	{
		let view;

		if (page == "current_war")
		{
			view = new CurrentWarView()
			view.render()
		}
		else if (page == "last_war")
		{
			view = new LastWarView()
			view.render()
		}
		else if (page == "members")
		{
			view = new MembersView()
			//veiw.render(user_collection, id)
			view.render()
		}
		else // error, page invalid
			return ;
		// id should be check valid here
		// maybe we should send the model directly
		// view.render(model, id) ??
	}
};
