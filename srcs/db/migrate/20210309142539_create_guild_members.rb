# frozen_string_literal: true

class CreateGuildMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :guild_members do |t|
      t.references :user, foreign_key: true
      t.references :guild, foreign_key: true
      t.integer :rank, default: 0
      t.timestamps
    end
  end
end
