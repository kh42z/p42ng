class Users < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :nickname, null: false
      t.string :avatar, default: 'default_avatar.png', null: false
      t.integer :status, default: 0
      t.integer :two_factor, default: 0
      t.integer :mmr, default: 200
      t.references :ladder, foreign_key: true
      t.timestamps
    end
  end
end
