
function getColumnWidth($input_id, $column_id){
	var $inputId = $input_id[0];
	if ($column_id.hasClass('plus12px'))
		$inputId.value = $column_id.width() - 12;
	else 
		if($column_id.hasClass('delete_column'))
			$inputId.value = 0;
		else
			$inputId.value = $column_id.width();
};

function getAllColumnWidth(){
step = 'step1';
var this_i = 0;
var i = 0;
	for(column_id in settings[step]['left_right']){	
		i = 0;
		for(input_id in settings[step]['right_left']){
			if(i == this_i) 
				getColumnWidth($(settings[step]['right_left'][input_id]), $(settings[step]['left_right'][column_id]));
			i++;
		} 
			
		this_i++;
	}
}

function getWidgetHeight($inputId, $column){
	$inputId[0].value = $column.height();
};

function getWidgetMargin($column){
	$(settings.step2.left)[0].value = parseInt($column.css('marginLeft'));
	$(settings.step2.bottom)[0].value = parseInt($column.css('marginBottom'));
	$(settings.step2.top)[0].value = parseInt($column.css('marginTop'));
}

function resizeColumn($column){
	var speed = 500;
	if($column.attr('id') in settings.step1.long_column){//Удаляется НЕ центральная область
		$column.css({'height' : '1px', 'border' : '0px solid'});
		return;
	}
	width = $column.width() + 4 + parseInt($column.css('marginTop')); // marginTop = marginRight
	marginLeft = parseInt($column.css('marginLeft'));
	
	$column.addClass("delete_column").css({'width': '0px', 'height' : '0px', 'border' : '0px solid', 
	'marginTop': '0px'});
	
	$remaining_columns = $('#central_columns').find('.column').not(".delete_column"); // Выберим оставшиеся, кроме удаленных
	count = $remaining_columns.size(); //Кол-во оставшихся
	width = width/count;
	
	if(count == 1){
		width = parseInt($(settings.step1.left_right.site).width());
		$remaining_columns.animate({width: width}, speed).css({'marginLeft' : 0}).addClass('plus12px');
	}
	else{
		$remaining_columns.each(function(i){ // Назначяем оставшимся областям новые свойства.
			if($column.hasClass('margin_left') && i == 0)
				$(this).css('marginLeft', marginLeft).addClass('margin_left');
			if($column.hasClass('margin_right') && i == count - 1)
				$(this).css('marginRight', 0).addClass('margin_right');
			$(this).animate({width:$(this).width() + width}, speed);
		});
	}
	$(settings.step1.right_left[$column.attr('id')]).attr('disabled', true).removeClass('normal_field').addClass('disabled_field') //Делаем область неактивной 
	
	setTimeout(function(){
		getAllColumnWidth();
	},speed + 50); // Обновляем данные в полях
}
function max(a,b){
	if(a>b) return a;
	else return b;
}
function getMainHeight (){
	var headHeight=parseInt($("#column_head").height());
	var leftHeight=parseInt($("#column_left").height());
	var centerHeight=parseInt($("#column_center").height());
	var rightHeight=parseInt($("#column_right").height());
	var maxCentralHeight=0;
	maxCentralHeight=max(leftHeight,centerHeight);
	maxCentralHeight=max(maxCentralHeight,rightHeight);
	var footerHeight=parseInt($("#column_footer").height());
	var maxMainHeight=headHeight+maxCentralHeight+footerHeight + 2*parseInt($("#column_footer").css('marginTop')) + parseInt($("#column_head").css("marginTop")) + 5;
	return maxMainHeight;
}
