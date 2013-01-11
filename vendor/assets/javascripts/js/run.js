//<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>;
//<script type="text/javascript" src="js/jquery-ui-1.8.19.custom.min.js"></script>;

$(document).ready(function() {  
// $.getScript('js_vender/jquery-1.7.2.min.js');
// $.getScript('js_vender/jquery-ui-1.8.19.custom.min.js');

	function reload(opts){window.open(opts)};
	
	$(".run_tabs").tabs().css('height','100%').parent().css('height','100%');
	$("#datepicker").datepicker({inline: true});//.find('.ui-widget').css('width','100%');
	$(".run_accordion").accordion({ header: "h3" });
	
	$(".button_widget").click(function(){
		reload($(this).attr('id'));
	});

});