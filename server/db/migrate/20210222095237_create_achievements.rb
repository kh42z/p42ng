class CreateAchievements < ActiveRecord::Migration[6.0]
  def change
    create_table :achievements do |t|
      t.string :name
      t.string :description
      t.references :user_achievement, foreign_key: true
      t.timestamps
    end
  end
end
