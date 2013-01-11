class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :image
      t.integer :user_id

      t.timestamps
    end
	add_index :pictures, :user_id
  end
end
