class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.text :email_ciphertext
      t.string :email_bidx

      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :email_bidx, unique: true
  end
end
