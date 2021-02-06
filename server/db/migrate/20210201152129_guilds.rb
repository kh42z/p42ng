# frozen_string_literal: true

class Guilds < ActiveRecord::Migration[6.0]
  def change
    create_table :guilds do |t|
      t.string :name, unique: true
      t.string :anagram, limit: 5, null: false
      t.integer :score
      t.timestamps
    end
  end
end
