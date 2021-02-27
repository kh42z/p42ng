class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.string :name, default: "Discussion"
      t.string :privacy, default: 'public'
      t.string :password_digest
      t.references :owner, foreign_key: {to_table: :users }
      t.timestamps
    end
  end
end
