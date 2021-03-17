# frozen_string_literal: true

class CreateAchievements < ActiveRecord::Migration[6.0]
  def change
    create_table :achievements do |t|
      t.string :name
      t.string :description
      t.timestamps
    end
  end
end
