class CreatePages < ActiveRecord::Migration[6.1]
  def change
    create_table :pages do |t|
      t.string :uuid
      t.string :title
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
