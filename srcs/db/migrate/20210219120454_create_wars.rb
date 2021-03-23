# frozen_string_literal: true

class CreateWars < ActiveRecord::Migration[6.0]
  def change
    create_table :wars do |t|
      t.integer :from
      t.integer :on
      t.datetime :war_start
      t.datetime :war_end
      t.integer :prize, unsigned: true
      t.integer :from_score, unsigned: true, default: 0
      t.integer :on_score, unsigned: true, default: 0
      t.integer :max_unanswered, unsigned: true
      t.boolean :negotiation, default: false
      t.boolean :ladder_effort, default: false
      t.boolean :tournament_effort, default: false
      t.boolean :from_agreement, default: false
      t.boolean :on_agreement, default: false
      t.boolean :terms_agreed, default: false
      t.boolean :opened, default: false
      t.boolean :closed, default: false
      t.references :guild, foreign_key: true
      t.timestamps
    end
  end
end
