# -*- encoding : utf-8 -*
class PagesController < ApplicationController

	def	home
		@title = "Home"
		if signed_in?
			@feed_items = current_user.feed.paginate(:page => params[:page])
		end
	end
	
end
