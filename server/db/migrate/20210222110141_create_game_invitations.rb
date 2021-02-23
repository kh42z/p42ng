class CreateGameInvitations < ActiveRecord::Migration[6.0]
  def change
    create_table :game_invitations do |t|
      t.references :player1, foreign_key: {to_table: :users}
      t.references :player2, foreign_key: {to_table: :users}
      t.references :game_type, foreign_key: true
      t.string :from
      t.timestamps
    end
  end
end
