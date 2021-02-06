class AddUserOwnerToGuild < ActiveRecord::Migration[6.0]
  def change
    add_reference :guilds, :owner, foreign_key: { to_table: :users }
  end
end
