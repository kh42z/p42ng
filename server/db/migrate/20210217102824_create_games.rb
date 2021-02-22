class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :winner, foreign_key: {to_table: :users, null: true}
      t.references :looser, foreign_key: {to_table: :users, null: true}
      t.references :game_type, foreign_key: true
      t.timestamps
    end
  end
end
