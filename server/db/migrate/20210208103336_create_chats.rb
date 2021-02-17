class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.integer :privacy, default: 0
      t.string :password_digest, :default => ""
      t.timestamps
    end
  end
end
