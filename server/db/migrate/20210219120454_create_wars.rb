class CreateWars < ActiveRecord::Migration[6.0]
  def change
    create_table :wars do |t|
      t.integer :versus
      t.datetime :war_start
      t.datetime :war_end
      t.integer :prize, unsigned: true
      t.integer :from_score, default: 0
      t.integer :on_score, default: 0
      t.integer :max_unanswered, unsigned: true
      t.references :guild, foreign_key: true
      t.timestamps
    end
  end
end
