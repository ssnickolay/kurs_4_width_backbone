var border_radius = []; // Массив радиусов

var border = []; // Массив объектов (толщина, цвет)
var gradient = []; // Хранилище для объектов (цвет1, цвет2)
var pattern = []; // Массив объектов (картинка, цвет)





function addStyle(column_id, action){
	if(column_id == 'body') column_id = ".widget > div, .widget > img";
	switch(action){
		case ("ch_shadow"):{
			$(column_id).addShadow();
			break;
		}
		case ("ch_glow"):{
			$(column_id).addGlow();break;
		}
	}
};

function removeStyle(column_id, action){
	if(column_id == 'body') column_id = ".widget > div, .widget > img";
	switch(action){
		case ("ch_shadow"):{
			$(column_id).removeShadow();break;
		}
		case ("ch_glow"):{
			$(column_id).removeGlow();break;
		}
	}
};

function setBlockStyles(column_id, radius, border_px, border_color, grad_ot, grad_do, pattern_color, pattern_img, action){
	img_src = "assets/img/pattern/"+pattern_img+".png";
	
	
	$(column_id).addRadius(radius);
	$(column_id).addBorder(border_px, 'solid', border_color);
	
	if(column_id == '.widget > div, .widget > img') column_id = "body"; 
	if(action == 'grad_button'){
		if(!(column_id in gradient)){var obj = { s1:'',s2:''};gradient[column_id] = obj;}
		gradient[column_id].s1 = grad_ot;  gradient[column_id].s2 = grad_do;
		$(column_id).addGradient(grad_ot, grad_do);
	}
	else{
		if(!(column_id in pattern)){var obj2 = { s1:'',s2:''};pattern[column_id] = obj2;}
		pattern[column_id].s1 = pattern_img; pattern[column_id].s2 = pattern_color;
		$(column_id).addPattern(img_src , pattern_color);
	}
	
	if(!(column_id in border)){var obj = { s1:'',s2:''}; border[column_id] = obj;}
	border[column_id].s1 = border_px;  border[column_id].s2 = border_color; 
	
	border_radius[column_id] = radius;
}

function getCssStyles(column_id){
	
	if(column_id == '.widget > div, .widget > img') column_id = "body";
	
	if($(column_id).hasClass('shadow')) $("#ch_shadow").attr('checked', true);
	else $("#ch_shadow").attr('checked', false);
	
	if($(column_id).hasClass('glow')) $("#ch_glow").attr('checked', true);
	else $("#ch_glow").attr('checked', false);
	
	$("#grad_ot")[0].value = gradient[column_id].s1;
	$("#grad_do")[0].value = gradient[column_id].s2;
	
	$("#border_px")[0].value = border[column_id].s1;
	$("#border_color")[0].value = border[column_id].s2;
	
	$("#input_radius")[0].value = border_radius[column_id];
	
	$("#pattern_color")[0].value = pattern[column_id].s2;
	$(".pattern_selected").removeClass('pattern_selected');
	$("#"+pattern[column_id].s1).addClass('pattern_selected');
}

(function( $ ){

	$.fn.addGradient = function(color1, color2){
		if(color1 == "#fff" || color2 == "#fff") return $(this);
		$(this).css('background', '-moz-linear-gradient(top,' + color1+','+ color2+')');
		$(this).css('background', '-webkit-gradient(linear, left top, left bottom, color-stop(0%,' + color1+'), color-stop(100%,'+ color2+'))');
		$(this).css('background', '-webkit-linear-gradient(top,' + color1+','+ color2+')');
		$(this).css('background', '-o-linear-gradient(top,' + color1+','+ color2+')');
		$(this).css('background', '-ms-linear-gradient(top,' + color1+','+ color2+')');
		$(this).css('background', '-linear-gradient(top,' + color1+','+ color2+')');
		return $(this).addClass('add_gradient');
	}
	
	$.fn.addPattern = function(img_link, color){
		if(color == "#fff") return $(this);
		$(this).css('background','url("'+ img_link + '")');
		$(this).css('backgroundColor', color);
		
		return $(this).addClass('add_pattern');
	}
	
	$.fn.addRadius = function(radius){
		return $(this).css('border-radius',radius + 'px');
	}
	
	$.fn.addBorder = function(border, style, color){
		return $(this).css('border', border + 'px ' + style + " " + color);
	}
	
	
	$.fn.addShadow = function(){
		// $(this).css('-moz-box-shadow', '5px 5px 5px rgba(0,0,0,0.5)'); /* Для Firefox */
		// $(this).css('-webkit-box-shadow','5px 5px 5px rgba(0,0,0,0.5)'); /* Для Safari и Chrome */
		// $(this).css('box-shadow','5px 5px 5px rgba(0,0,0,0.5)'); /* Параметры тени */
		return $(this).addClass('shadow');
	}
	$.fn.addGlow = function(){
		$(this).addClass('glow');;
	}
	
	$.fn.removeShadow = function(){
		// $(this).css('-moz-box-shadow', ''); /* Для Firefox */
		// $(this).css('-webkit-box-shadow',''); /* Для Safari и Chrome */
		// $(this).css('box-shadow',''); /* Параметры тени */
		return $(this).removeClass('shadow');
	}
	$.fn.removeGlow = function(){
		$(this).removeClass('glow');
	}
	
	$("#styles_name").find('td').click(function(){	
		$tr = $("#styles_link").find("#"+$(this).attr('id'));
		$("#styles_link").append($tr);
	});
	
	/*
	$("#styles_name").find('td').click(function(){	
		$tr = $("#styles_link").find("#"+$(this).attr('id'));
		$("#styles_link").append($tr);
	});*/

})( jQuery );