# frozen_string_literal: true

class CreateChatMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :chat_messages do |t|
      t.references :sender, foreign_key: { to_table: :users }
      t.references :chat, foreign_key: true
      t.string :content
      t.timestamps
    end
  end
end
