class CreateGameRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :game_records do |t|
      t.references :winner, foreign_key: { to_table: :users }
      t.references :looser, foreign_key: { to_table: :users }
      t.references :game_type, foreign_key: true
      t.timestamps
    end
  end
end
