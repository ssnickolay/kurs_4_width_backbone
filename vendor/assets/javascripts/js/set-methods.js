//----------STEP1-----------------
function setColumnWidth($input_id, $column_id){
	var $inputId = $input_id[0];
	var width = $inputId.value;
	$column_id.css('width', width);
};

function setAllColumnWidth(){
step = 'step1';
var this_i = 0;
var i = 0;
	for(column_id in settings[step]['left_right']){	
		i = 0;
		for(input_id in settings[step]['right_left']){
			if(i == this_i) 
				setColumnWidth($(settings[step]['right_left'][input_id]), $(settings[step]['left_right'][column_id]));
			i++;
		} 
			
		this_i++;
	}
}


function setColumnMargin(id_i){ // Otstypb| oblastyam
	var margin = jQuery(id_i)[0].value;

	$('.column').not("#column_head").not(".mal_block").css('margin-top', ""+ margin+"px"); // Все кроме хеад получат отступ вверх
	$('#central_columns').find('.column').not('.margin_right').css('margin-right', ""+margin+"px");// Все, кроме самой правой
	
	summary_input_width = 0; // Cуммарная ширина центральных блоков
	for(input_id in settings[step]['right_left']){
		input_width = parseInt($(settings[step]['right_left'][input_id])[0].value);
		if(settings[step]['right_left'][input_id] != "#site") // Суммируем все кроме введеное ширины сайта
			summary_input_width += input_width;
		else max_width = input_width; // введеную ширину сайта запоминаем как максимальную
	}
	
	$remaining_columns = $('#central_columns').find('.column').not(".delete_column"); // Выберим оставшиеся, кроме удаленных
	count = $remaining_columns.size(); //Кол-во оставшихся
	
	left_margin = (max_width - summary_input_width - (count-1)*margin)/2;

	$(".margin_left").css('margin-left', ""+ left_margin +"px"); // Блоку с левым маргинов добавить

};

function setPropertyInField(id_filed, value){
	jQuery("#"+id_filed)[0].value = value;
}


//-----------------STEP2----------------------
function setWidgetHeight($height){
	if($(settings.step2.selected).find('.ui-widget').size() != 0 ||  $(settings.step2.selected).find('.text_widget').size() != 0  )return; 
	$(settings.step2.selected).css('height', $height[0].value+"px");
};

function setWidgetAutoMargin($top, $bottom){
	$(settings.step2.selected).css('margin',$top[0].value+"px auto " + $bottom[0].value + "px auto" );
}

function setWidgetMargin($top, $bottom, $left){
	var css = ""+$top[0].value+"px 0 "+$bottom[0].value+"px "+$left[0].value+"px";
	$(settings.step2.selected).css('margin', css);
}




 function addWidgetContent(id, count){
	if(count == 0)
	switch(id){
		case ("widget_calendar"):{
			checkInputControl(false, settings.step2.height, 'disabled_field', 'normal_field');
			$(settings.step2.selected).addDatepicker();break;
		}
		case ("widget_text"):{
			checkInputControl(false, settings.step2.height, 'disabled_field', 'normal_field');
			$(settings.step2.selected).addTextBlock();break;
		}
	}
	else
	switch(id){
		case ("widget_accardion"):{
			checkInputControl(true, settings.step2.height, 'normal_field', 'disabled_field');
			$(settings.step2.selected).addAccordion(count);break;
		}
		case ("widget_tabs"):{
			checkInputControl(true, settings.step2.height, 'normal_field', 'disabled_field');
			$(settings.step2.selected).addTabs(count);break;
		}
		case("widget_button"):{ 
			checkInputControl(false, settings.step2.height, 'disabled_field', 'normal_field');
			$(settings.step2.selected).addButton(count);break;
		}
		case("widget_img"):{ 
			checkInputControl(false, settings.step2.height, 'disabled_field', 'normal_field');
			$(settings.step2.selected).addImages(count);break;
		}
	}
	$(settings.step2.selected).removeClass('color-blue').css('border','0px solid black');
};

(function( $ ){
//-----------------STEP2----------------------
$.fn.addTabs = function(count){ // Vkladki
	var i;
	html = 	'<div id="tabs" class = "run_tabs">';
	html+='		<ul>';
	for(i = 1; i <= count; i++)
		html+='			<li><a class = "text" href="#tabs-'+i+'">Text '+i+'</a></li>';
	html+='		</ul>';
	for(i = 1; i <= count; i++)
		html+='		<div id="tabs-'+i+'" class = "text">Tex number' + i +' .</div>';
	html+='	</div>';
  return this.empty().append(html).find("#tabs").tabs().css('height','100%');
};


$.fn.addDatepicker = function(){ // Kalendar'
  return this.css('height','100%').empty().append('<div id="datepicker" class = "run_datepicker"></div>').find("#datepicker").datepicker({inline: true}).end();

};

$.fn.addAccordion = function(count){ // Accardion
	var i;
	html = 	'<div id="accordion" class = "run_accordion">';
	for(i = 1; i <= count; i++)
	{
		html+= '<div>';
		html+= '<h3 ><a class = "text" href="#">Text'+i+'</a></h3>';
		html+= '<div class = "text">Text in accardion.</div>';
		html+= '</div>';
	}
	html+='	</div>';
  return this.css('height','').empty().append(html).find("#accordion").accordion({ header: "h3" });
};

$.fn.addTextBlock = function(){
	html = 	'<div class = "text_widget"><div class = "text" title="Кликните для изменения текста">Something text</div></div>';
	return this.empty().append(html).css('height','');
};

$.fn.addButton = function (link){
	html = 	'<button class = "text button_widget" id = '+link+' >Button</button>'; 
	return this.empty().append(html).find('.button_widget').css('width','100%').css('height','100%');
}

$.fn.addImages = function (img){
	html = "<img src ="+ img + "/>"
	return this.empty().append(html).css('width','100%').css('height','100%');
}
})( jQuery );