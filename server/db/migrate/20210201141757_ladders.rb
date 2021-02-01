class Ladders < ActiveRecord::Migration[6.1]
  def change
    create_table :ladders do |t|
      t.string :name, null: false
      t.text :desc
      t.integer :mmr_threshold
      t.timestamps
    end
  end
end
