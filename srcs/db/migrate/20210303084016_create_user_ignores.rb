class CreateUserIgnores < ActiveRecord::Migration[6.0]
  def change
    create_table :user_ignores do |t|
      t.references :user, foreign_key: true
      t.references :ignored, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
