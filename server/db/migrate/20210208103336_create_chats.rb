class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.string :name
      t.string :mode, default: 'channel'
      t.string :privacy, default: 'private'
      t.string :password_digest
      t.references :owner, foreign_key: {to_table: :users }
      t.timestamps
    end
  end
end
