class Site < ActiveRecord::Base
	attr_accessible :css, :theme, :title, :header_html, :footer_html, :left_column_html, 
	                :right_column_html, :central_column_html
	belongs_to :user
	default_scope :order => 'sites.created_at DESC'
	

end
