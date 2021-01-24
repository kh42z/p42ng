class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :ladders do |t|
      t.string :name
      t.text :desc
      t.timestamps
    end
    create_table :guilds do |t|
      t.string :name
      t.string :anagram, :limit => 5
      t.integer :score
      t.timestamps
    end
    create_table :users do |t|
      t.string :nickname, null: false
      t.string :avatar
      t.integer :status
      t.boolean :two_factor
      t.references :guild, foreign_key: true
      t.references :ladder, foreign_key: true
      t.timestamps
    end
  end
end
