class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :properties, default: "{}"

      t.timestamps
    end
  end
end
