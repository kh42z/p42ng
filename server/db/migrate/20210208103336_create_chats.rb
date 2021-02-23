class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.string :privacy, default: 'public'
      t.string :password_digest
      t.timestamps
    end
  end
end
