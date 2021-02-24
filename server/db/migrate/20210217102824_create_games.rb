class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :winner, foreign_key: {to_table: :users, null: true}
      t.references :player_left, foreign_key: {to_table: :users}
      t.references :player_right, foreign_key: {to_table: :users}
      t.boolean :started, default: false
      t.string :game_type
      t.timestamps
    end
  end
end
