# frozen_string_literal: true

class Init < ActiveRecord::Migration[6.1]
  def change
    create_table :ladders do |t|
      t.string :name, null: false
      t.text :desc
      t.integer :mmr_threshold
      t.timestamps
    end
    create_table :guilds do |t|
      t.string :name, unique: true
      t.string :anagram, limit: 5, null: false
      t.integer :score
      t.timestamps
    end
    create_table :users do |t|
      t.string :nickname, null: false
      t.string :avatar, default: 'default_avatar.png', null: false
      t.integer :status, default: 0
      t.boolean :two_factor, default: false
      t.integer :mmr, default: 200
      t.references :guild, foreign_key: true
      t.references :ladder, foreign_key: true
      t.timestamps
    end
  end
end
