# frozen_string_literal: true

class CreateWarTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :war_times do |t|
      t.datetime :start
      t.datetime :end
      t.references :war, foreign_key: true
      t.timestamps
    end
  end
end
