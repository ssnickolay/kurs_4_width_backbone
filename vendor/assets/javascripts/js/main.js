function checkInputControl(flag, selector, remove_class, add_class){ //Enabled/Disabled left/right-margin input fileds
		$(selector).attr('disabled', flag).removeClass(remove_class).addClass(add_class);
	}
$(document).ready(function(){
$.getScript('assets/js_vender/jquery-1.7.2.min.js');
$.getScript('assets/js_vender/jquery-ui-1.8.19.custom.min.js');
$.getScript('assets/js_vender/jquery.scrollTo-1.4.2-min.js');
$.getScript('assets/js/set-methods.js');
$.getScript('assets/js/get-methods.js');
$.getScript('assets/js/ui-sv.js');
$.getScript('assets/js/jq-styles.js');
$.getScript('assets/js/parse.js');
$.getScript('assets/js/models/column.js');
settings = {
	step1: {
		left_right: {
		left : "#column_left",
		right : "#column_right",
		center : "#column_center",
		site : "#main"
		},
		right_left: {
			column_left : "#left",
			column_right : "#right",
			column_center : "#center",
			main : "#site"
		},
		long_column: {
			column_header : "#column_header",
			column_footer : "#column_footer"
		}
	},
	step2: {
		width : "#width-step2",
		height : "#height-step2",
		left : "#left-step2",
		top : "#top-step2",
		bottom : "#bottom-step2",
		selected: ".selected_widget",
		first_selected: "#column_head_1"
	},
	step3: {
		left_right: {
			setting_body: ".widget > div, .widget > img",
			setting_main: "#main",
			setting_header: "#column_head",
			setting_left: "#column_left",
			setting_center: "#column_center",
			setting_right: "#column_right",
			setting_footer: "#column_footer"
		},
		right_left: {
			body: "setting_body",
			main: "#setting_main",
			column_head: "#setting_header",
			column_left: "#setting_left",
			column_center: "#setting_center",
			column_right: "#setting_right",
			column_footer: "#setting_footer"
		},
		block_selected: ".step3_settings_selected"
	}
};



var step = 'step1';
var step2_click = 0;

//---------------------begin_kasu------------------------------


var ImposibleMargin;

function validateWidth(){
	summary_input_width = 0; // Cуммарная ширина центральных блоков
	for(input_id in settings[step]['right_left']){
		input_width = parseInt($(settings[step]['right_left'][input_id])[0].value);
		if(settings[step]['right_left'][input_id] != "#site") // Суммируем все кроме введеное ширины сайта
			summary_input_width += input_width;
		else max_width = input_width; // введеную ширину сайта запоминаем как максимальную
	}

	marg_width=parseInt(jQuery("#marg")[0].value);

	$remaining_columns = $('#central_columns').find('.column').not(".delete_column"); // Выберим оставшиеся, кроме удаленных
	count = $remaining_columns.size(); //Кол-во оставшихся
	ImposibleMargin = (max_width - summary_input_width)/(count-1); // Возможный маргин: ширина сайта - ширина блоков пополам. -6px ПАДДИНГОВ!
	if(ImposibleMargin < 0) ImposibleMargin = 0;
	if(count == 1){ ImposibleMargin = 1000; // Случай когда осталась 1 колонка
		if(ImposibleMargin < marg_width) return false;
		else return true;
	}
	summary_input_width += marg_width;

	if(summary_input_width > max_width || ImposibleMargin < marg_width) return false;
	else return true;

}

function validateWidth_2(){
	var input_width=parseInt($(settings.step2.width)[0].value);
	var max_width=parseInt($(settings.step2.selected).parent().width());
	var left_marg=parseInt($(settings.step2.left)[0].value);
	if(input_width+left_marg>max_width)
		return false;
	else return true;
}


	$("#box1 .inner :input").blur(function(){
		if(validateWidth()){ // Если не превышают введенные данные допустимых размеров
			$("#box1 .message").hide();
			$('.help_p').find("span").html(ImposibleMargin);
			return;
		}

		$('.help_p').find("span").html(ImposibleMargin);
		$("#box1 .message").show();

	});

	$("#box2 .inner :input").blur(function(){
		if(validateWidth_2()){
				$("#box2 .message").hide();
			}
		else {$("#box2 .message").show(); }
	});

	$("#add").click(function(){
		if(!validateWidth()){ // Если превышает, то Ошибка
			$(".message").show();
			$('.help_p').find("span").html(ImposibleMargin);
			return false;
		}

		$(".message").hide();
		setAllColumnWidth();
		setColumnMargin("#marg");
		return false;
	});

	$("#step1").click(function(){
		$("#panelka").hide();
	});

	$("#add_2").click(function(){
		if(validateWidth_2()){
				$("#box2 .message").hide();
				setColumnWidth($(settings.step2.width), $(settings.step2.selected));
				setWidgetHeight($(settings.step2.height));
				setWidgetMargin($(settings.step2.top), $(settings.step2.bottom), $(settings.step2.left));

				if ($("#ch_margin_auto").attr('checked'))
				{
					checkInputControl(true, '.disabled_enabled', 'normal_field', 'disabled_field');
					$(settings.step2.selected).addClass('margin_auto');
					setWidgetAutoMargin($(settings.step2.top), $(settings.step2.bottom));
				}
				else
				{
					checkInputControl(false, '.disabled_enabled', 'disabled_field', 'normal_field');
					$(settings.step2.selected).removeClass('margin_auto');
					setWidgetMargin($(settings.step2.top), $(settings.step2.bottom), $(settings.step2.left));
				}
			}
		else {$("#box2 .message").show(); }
		return false;
	});


	$("#add_3").click(function(){
		radius = $("#input_radius")[0].value;

		border_px = $("#border_px")[0].value;
		border_color = $("#border_color")[0].value;

		grad_ot = $("#grad_ot")[0].value;
		grad_do = $("#grad_do")[0].value;

		pattern_color = $("#pattern_color")[0].value;
		pattern_img = $(".pattern_selected").attr('id');

		selected_id = $(settings.step3.block_selected).attr('id');
		column_id = settings.step3.left_right[selected_id];

		action = $('.button_step2_selected').attr('id');

		setBlockStyles(column_id, radius, border_px, border_color, grad_ot, grad_do, pattern_color, pattern_img, action);
	});


	//----шаг 2--------------
	$("#step2").click(function(){ //step2 settings
		$("#panelka").show();

		if(step2_click == 0)
		{

			$(".widget").find('div').removeClass('widget-head-start');//delete drag-and-drop
			$("#main").css('width', $("#main").width()-12);

			$(".column").css("border", "none").css('paddingRight', 0)


		}
		step2_click++;
		$(settings.step2.first_selected).click();
	});



	$("#ch_margin_auto").click(function(){
		if ($(this).attr('checked'))
		{
			checkInputControl(true, '.disabled_enabled', 'normal_field', 'disabled_field');
			$(settings.step2.selected).addClass('margin_auto');
			setWidgetAutoMargin($(settings.step2.top), $(settings.step2.bottom));
		}
		else
		{
			checkInputControl(false, '.disabled_enabled', 'disabled_field', 'normal_field');
			$(settings.step2.selected).removeClass('margin_auto');
			setWidgetMargin($(settings.step2.top), $(settings.step2.bottom), $(settings.step2.left));
		}

	});

	$("#columns .widget").click(function(){
		if($(this).hasClass('selected_widget')) return;
		else{
			$(".selected_widget").removeClass('selected_widget').addClass('normal_widget');
			$(this).removeClass('normal_widget').addClass('selected_widget');

			getColumnWidth($(settings.step2.width), $(this));
			getWidgetHeight($(settings.step2.height), $(this));
			getWidgetMargin($(this));

			if($(this).hasClass('margin_auto'))
			{
				$("#ch_margin_auto").attr("checked",true);
				checkInputControl(true, '.disabled_enabled', 'normal_field', 'disabled_field');
			}
			else
			{
				$("#ch_margin_auto").attr("checked",false);
				checkInputControl(false, '.disabled_enabled', 'disabled_field', 'normal_field');
			}
		}
		return false;
	});
//----------------------STEP3-------------------------------

	$(".dop").css('opacity','0');
	$(".inner.inn2").width(200+"px");
	$(".content.cont2").width(240+"px");
	var flag_panel=false;

	$(".ch_step3").click(function(){
		selected_id = $(settings.step3.block_selected).attr('id');
		column_id = settings.step3.left_right[selected_id];//Узнаем к чему применять свойства

		action = $(this).attr('id');
		if ($(this).attr('checked')){
			addStyle(column_id, action);
		}
		else
		{
			removeStyle(column_id, action);
		}
	});

function disable_field(id){
	$(id).attr('disabled', true);
	$(id).addClass("disabled_field");
}
function enable_field(id){
	$(id).attr('disabled', false);
	$(id).removeClass("disabled_field");
	$(id).addClass("normal_field");
}

	$(".step3_settings").click(function(){

		if(this.id == "setting_body"){
			disable_field("#border_px");
			disable_field("#border_color");
		}
		else {
			enable_field("#border_px");
			enable_field("#border_color");
		}
		$(".step3_settings").removeClass("selected_bigger");
		$(this).addClass("selected_bigger");

		selected_id = $(this).attr('id');
		column_id = settings.step3.left_right[selected_id];//Узнаем к чему применять свойства

		if(flag_panel == true){
			if($(this).hasClass("step3_settings_selected")){
			$(".dop").animate({opacity:'0'},1000);
			$(".inner.inn2").animate({width: "200px"},1000);
			$(".content.cont2").animate({width: "240px"},1000);
			flag_panel=false;
			$(this).removeClass("selected_bigger");
			}
		}
		else{
			$(".inner.inn2").animate({width: "440px"},1000);
			$(".content.cont2").animate({width: "480px"},1000);
			$(".dop").animate({opacity:'1',height:'100%'},1000);
			flag_panel=true;

		}
		getCssStyles(column_id);



	});

	$("#step3").click(function(){ //step3 settings
	//	if($("#main").find('.widget-head').size() != 0){ alert("error"); return false;}
		$("#main").css('height',getMainHeight() + 'px');
		$("#panelka").hide();

	});


	$("#grad_button").click(function(){

			$("#hide_pattern").animate({opacity:'0'},1000);
			$("#hide_pattern").hide();
			if ($("#hide_grad").css('opacity')=='0') {
				$("#hide_grad").slideDown("slow",function(){$("#hide").css('height','165px')});
				$("#hide_grad").animate({opacity:'1'},1000);
			  } else {
				$("#hide_grad").slideUp("slow",function(){$("#hide").animate({height:'4px'},1000)});
				$("#hide_grad").animate({opacity:'0'},1000);
			  }
	});
	$("#pattern_button").click(function(){
		$("#hide_grad").animate({opacity:'0'},1000);
		$("#hide_grad").hide();
			if ($("#hide_pattern").css('opacity')=='0') {
				$("#hide_pattern").slideDown("slow",function(){$("#hide").css('height','165px')});
				$("#hide_pattern").animate({opacity:'1'},1000);
			  } else {
				$("#hide_pattern").slideUp("slow",function(){$("#hide").animate({height:'4px'},1000)});
				$("#hide_pattern").animate({opacity:'0'},1000);
			  }
	});

	$(".theme").click(function(){
		$(".theme").find("img").attr({class: "light"});
		$(this).find("img").attr({class: "theme_selected"});
	});

//-----------шаг4------------------
$("#step4").click(function(){
		$("#panelka").hide();
	});
//--------------START-----------------------


function start(){
	$('.help_p').find("span").html(parseInt(5));
	getAllColumnWidth();

	jQuery("#marg")[0].value=0;
	$(".message").hide();

	$(settings.step1.right_left.column_left).attr('disabled', false);
	$(settings.step1.right_left.column_right).attr('disabled', false);
	$(settings.step1.right_left.column_center).attr('disabled', false);

	for(column_id in settings.step3.left_right){
		column_id = settings.step3.left_right[column_id];
		if(column_id == '.widget > div, .widget > img') column_id = "body";

		var obj = { s1:'',s2:''};
		border[column_id] = obj;
		border[column_id].s1 = 0;
		border[column_id].s2 = "#fff";

		var obj2 = {s1:'', s2:''};
		pattern[column_id] = obj2;
		pattern[column_id].s1 = "";
		pattern[column_id].s2 = "#fff";

		var obj3 = {s1:'', s2:''};
		gradient[column_id] = obj3;
		gradient[column_id].s1 = "#fff";
		gradient[column_id].s2 = "#fff";

		border_radius[column_id] = 0;
	}
	live_click();

	$(".pictures").find('tr').each(function(){ // Залочить удаление
		$(this).find('td').eq(2).hide();
	});

	$(".link").not("#step2").addClass('link_disabled'); //Которые нельзя нажать
	$("#step1").removeClass("link_disabled");


	$("#hide_grad").hide();
	$("#hide_pattern").hide();

	$("#panelka").hide();

	$("#base").find("img").attr({class: "theme_selected"});


	var $tr = $("#styles_link").find("#base");
	$("#styles_link").append($tr);

};


	setTimeout(start,700);


	$("#loading").ajaxStart(function(){
		$(this).text("SSS");
	}).ajaxStop(function(){
		$(this).hide();
	});
	//------NEW_KASU

$("#step2_img_block").hide();
	$(".panel").find(".pod_menu-step2").hide();
	$(".button_step2").click(function(){

		if($(this).hasClass("slide_on")) {
			if($(this).hasClass('button_step2_selected')){//Если уже была нажата до этого - то просто сворачиваем
				$(this).parent().parent().parent().find('.pod_menu-step2').hide("fast");
				$(".panelka_content").animate({"width": "95px"}, "slow");
				return;
			}
			if($(this).attr('id') == "img_button"){  // Если не была нажата и является типа "картинка", то...
				$(".panel").css("float","left");
				$("#step2_img_block").show();
				$(this).parent().parent().parent().find('.pod_menu-step2').hide("slow");
				$(".panelka_inner").animate({"height": "350px"}, "slow");
				$(".panelka_content").animate({"width": "400px"}, "slow");
				$(this).parent().parent().find('td').eq(1).show("slow");
				$(".button_step2").removeClass("button_step2_selected");
				$(this).addClass("button_step2_selected");
				return;
				}
			$(".panel").css("float","");
			$("#step2_img_block").hide();
			$(this).parent().parent().parent().find('.pod_menu-step2').hide("slow");
			$(".panelka_inner").animate({"height": "350px"}, "slow");
			$(".panelka_content").animate({"width": "400px"}, "slow");
			$(this).parent().parent().find('td').eq(1).show("slow");
		}
		else{//Есди не имеет доп попций - то просто показываем
			$(this).parent().parent().parent().find('.pod_menu-step2').hide("slow");
			$(".panelka_content").animate({"width": "95px"}, "slow");
			addWidgetContent($(this).attr('id'), 0);
		}
		$(".button_step2").removeClass("button_step2_selected");
		$(this).addClass("button_step2_selected");

	});

	$(".button_step3").click(function(){
		selected_id = $(settings.step3.block_selected).attr('id');
		column_id = settings.step3.left_right[selected_id];
		if(column_id == '.widget > div, .widget > img') column_id = "body";

		if($(this).attr('id') == 'grad_button')
		{
			$("#grad_ot")[0].value = gradient[column_id].s1;
			$("#grad_do")[0].value = gradient[column_id].s2;
		}
		else{
			$("#pattern_color")[0].value = pattern[column_id].s2;
			$(".pattern_selected").removeClass('pattern_selected');
			$("#"+pattern[column_id].s1).addClass('pattern_selected');
		}
		$(".button_step3").removeClass("button_step2_selected");
		$(this).addClass("button_step2_selected");
	});

	$(".ok").click(function(){

		widget = $(this).attr('id')
		if(widget == "widget_button") count = $(this).parent().find('.step_field')[0].value;
		else count = parseInt($(this).parent().find('.step_field')[0].value);

		if(count == 0 || count == "") return false;

		addWidgetContent(widget,count);

	});

//---------------------STEP4------------------
function live_click(){
	$(".text, ui-tabs-nav").live("click", function(){
		$text_block = $(this);
		$("#text")[0].value = $text_block.text();

		$(".text_selected").removeClass("text_selected");
		$(this).addClass("text_selected");
		input_flag = false;
	});

	$(".ui-tabs-nav").live("click",function(){
		$(".text_selected").removeClass("text_selected");
		$text_block = $(this).find(".ui-tabs-selected").find("a").addClass("text_selected");;
		$("#text")[0].value = $text_block.text();

		input_flag = true;
	});
}
	$("#add_4").click(function(){
		$('.text_selected').text($("#text")[0].value);
		if($('.text_selected').parent().parent().attr('id') == "accordion")
			$('.text_selected').css('height','');
	});


$("#button").click(function(){
	$('body').css('color','#fff');
});
$("#button2").click(function(){
	$('body').css('color','#000');
});

	$('#text').val('');


$("#text").click(function(){
	$(this).css('height','300px').css('overflow-y','scroll');
});
$(".small_img").click(function(){
	addWidgetContent("widget_img",$(this).attr('id'));
});
});
