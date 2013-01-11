module ApplicationHelper

	def title
		base_title = "Sv"
		if @title.nil?
			base_title
		else
			"#{base_title} | #{@title}"
		end
	end
	
	def logo
		image_tag("img/logo1.png", :alt => "Sample App", :class => "round")
	end
	
	def site_show? 
		@site_show
	end
	
	def site_new? 
		@site_new
	end
end
