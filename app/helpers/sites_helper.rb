module SitesHelper
	def create_css(site)
    open("app/assets/stylesheets/sites_css/#{site.id}.css.scss", 'w') { 
	|f| f<<"@import 'bourbon'; .shadow{@include box-shadow(0 0 2px 2px hsla(0, 0%, 0%, 0.65))};.glow{@include box-shadow(0px 0px 4px 4px #fffbc7)};";
	    f<<"@import 'app/assets/custom-theme/yellow/jquery-ui-1.8.19.custom.css';"<<@site.css;
	}
	end

end