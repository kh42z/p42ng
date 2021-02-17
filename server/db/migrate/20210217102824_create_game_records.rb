class CreateGameRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :game_records do |t|
      t.references :winner, foreign_key: { to_table: :users }
      t.references :looser, foreign_key: { to_table: :users }
      t.integer :type_id, default: 0
      t.timestamps
    end
  end
end
