class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
	  t.integer :user_id
      t.string :css
	  t.string :theme
      t.string :title
      t.string :header_html
      t.string :footer_html
      t.string :left_column_html
      t.string :right_column_html
      t.string :central_column_html

      t.timestamps
    end
	
	add_index :sites, :user_id
    add_index :sites, :created_at
  end
end
