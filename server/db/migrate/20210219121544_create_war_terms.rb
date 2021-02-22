class CreateWarTerms < ActiveRecord::Migration[6.0]
  def change
    create_table :war_terms do |t|
      t.datetime :start
      t.datetime :end
      t.boolean :ladder, default: false
      t.boolean :agreed, default: false
      t.references :war
      t.timestamps
    end
  end
end
