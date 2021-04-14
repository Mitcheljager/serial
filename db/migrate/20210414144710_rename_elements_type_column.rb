class RenameElementsTypeColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :elements, :type, :content_type
  end
end
