class CreateElements < ActiveRecord::Migration[6.1]
  def change
    create_table :elements do |t|
      t.string :uuid
      t.string :type
      t.references :section, null: false, foreign_key: true
      t.text :properties, default: "{}"
      t.integer :position

      t.timestamps
    end
  end
end
