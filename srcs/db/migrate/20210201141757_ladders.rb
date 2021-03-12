# frozen_string_literal: true

class Ladders < ActiveRecord::Migration[6.0]
  def change
    create_table :ladders do |t|
      t.string :name, null: false
      t.text :desc
      t.timestamps
    end
  end
end
