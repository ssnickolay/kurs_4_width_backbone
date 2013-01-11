function getProperty (property, $id){
	return "" + property +":" + $id.css(property) + ";";
};
		
	function getBodyProperty(){
		$body = $("body");
		var css = "body{";
		//css += getProperty("background-image",$body);
		css += getProperty("background-color",$body);
		css += getProperty("font-size",$body);
		css += getProperty("font-family",$body);
		css += getProperty("color",$body);
		return css += "};";
	};
		
		function getMainProperty(){
			$main = $("#main");
			var css = "#main{"			
			css += getProperty("background-color",$main);
			css += getProperty("width",$main);
			css += getProperty("height",$main);
			//css += getProperty("border",$main); 
			return css += "};";
		};
		
		function getColumsProperty(){
			var css = ".column{float:left;};";
			$column = $(".column");
			$column.each(function(i){
				$var_this = $(this);
				css += "#" + $var_this.attr('id')+"{";
				css += getProperty("width",$var_this);
				css += getProperty("margin-top",$var_this);	
				css += getProperty("margin-right",$var_this);
				css += getProperty("margin-bottom",$var_this);
				css += getProperty("margin-left",$var_this);
				css += "};";
			});
			return css;
		};
		
	function getWidgetProperty(){
			var css = "";
			
			$widget = $(".widget");
			$widget.each(function(i){
				$var_this = $(this);		
				css += "#" + $var_this.attr('id')+"{";
				css += getProperty("width",$var_this);
				if($(this).find('.ui-widget').size() == 0 || $(this).find('.text_widget').size() == 0)
					css += getProperty("height",$var_this); 
				css += getProperty("margin-top",$var_this);	
				css += getProperty("margin-bottom",$var_this);
				css += getProperty("margin-left",$var_this);
				css += "};";
			});
			return css;
	}
	function parseMemmory(){
	img_src = "/assets/img/pattern/";
	css = "";
		for(column_id in settings.step3.left_right){
			column_id = settings.step3.left_right[column_id];
			
			if(column_id == '.widget > div, .widget > img') column_id = "body";
			if(column_id == "body"){
				css += ".widget ui-widget{ @include border-radius("+border_radius[column_id]+"px);}"; // Массив радиусов
				css += ".widget img{ @include border-radius("+border_radius[column_id]+"px);}"; // Массив радиусоd
			}
			
			css += column_id + "{";
			
			if(column_id != "body") {
				css +=  "border:"+ border[column_id].s1 + "px solid "+border[column_id].s2+";" ; // Массив объектов (толщина, цвет)
				css +=  "@include border-radius("+border_radius[column_id]+"px);"; // Массив радиусов
			}
		    if($(column_id).hasClass('add_gradient') && gradient[column_id].s1!= "#fff" && gradient[column_id].s2!= "#fff") 
				css +=  "@include linear-gradient(top," + gradient[column_id].s1 +", "+gradient[column_id].s2+");"; // Хранилище для объектов (цвет1, цвет2)
		    else
				if($(column_id).hasClass('add_pattern') && pattern[column_id].s2 != "#fff"){
					css +=  "background: url('" + img_src+pattern[column_id].s1 +".png');"; // Массив объектов (картинка, цвет)
					css +=  "background-color:"+pattern[column_id].s2+";";
				}
				else 
					if (pattern[column_id].s2 != "#fff") css +=  "background-color:"+pattern[column_id].s2+";";// Если все не подходит и цвет не был применён
			css += "}";
		}
	return css;
	};
$(document).ready(function() { 		
		$("#button").click(function(){
			var css = ".margin_auto{margin:0 auto; }; button{height:100%; width:100%;}; .ui-datepicker{width:auto;};";
			css += "body,img,p,h1,h2,h3,h4,h5,h6,ul,ol {margin:0; padding:0; list-style:none; border:none; font-family:Arial, Helvetica, sans-serif;};"		
			css += getBodyProperty();
			css += getMainProperty();
			css += getColumsProperty();
			css += getWidgetProperty();
			css += parseMemmory();
			//$(".run_accordion").find('h3').removeClass('ui-state-active');
			
			var column_head = $("#column_head").html();
			var column_left = $("#column_left").html();
			var column_center = $("#column_center").html();
			var column_right = $("#column_right").html();
			var column_footer = $("#column_footer").html();
			
			style_id = $("#styles_link").find("tr:last").attr('id');
			
			jQuery("#site_title")[0].value = $("#text_memmory").text();
			jQuery("#site_css")[0].value = css;
			jQuery("#site_theme")[0].value = style_id; 
			jQuery("#site_header_html")[0].value = column_head; 
			jQuery("#site_left_column_html")[0].value = column_left;
			jQuery("#site_central_column_html")[0].value = column_center;
			jQuery("#site_right_column_html")[0].value = column_right;
			jQuery("#site_footer_html")[0].value = column_footer;
			
			setTimeout(function(){$("#create_site").click()},200);
		});
		
});