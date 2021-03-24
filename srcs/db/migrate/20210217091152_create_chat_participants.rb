# frozen_string_literal: true

class CreateChatParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :chat_participants do |t|
      t.references :user, foreign_key: true
      t.references :chat, foreign_key: true
      t.integer :role, default: 0
      t.index %i[user_id chat_id], unique: true
      t.timestamps
    end
  end
end
