class CreateChatTimeouts < ActiveRecord::Migration[6.0]
  def change
    create_table :chat_timeouts do |t|
      t.references :user, foreign_key: true
      t.references :chat, foreign_key: true
      t.datetime :timeout
      t.timestamps
    end
  end
end
