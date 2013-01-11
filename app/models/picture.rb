class Picture < ActiveRecord::Base
	attr_accessible :image
	mount_uploader :image, ImageUploader
	
	default_scope :order => 'pictures.created_at DESC'

	
	validates :image,   :presence => true
	validates :user_id, :presence => true
end
