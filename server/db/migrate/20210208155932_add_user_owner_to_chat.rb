class AddUserOwnerToChat < ActiveRecord::Migration[6.0]
  def change
    add_reference :chats, :owner, foreign_key: { to_table: :users }
  end
end
