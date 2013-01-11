function hideShow(el){
$(el).toggleClass('show').siblings('div.hideCont').slideToggle('normal');return false;
};
function setPosition(check, div, p1, p2, p3, p4) {
	if(check==='#box1')
		{
			$(div).scrollTo(p1, 800);
		}
	else if(check==='#box2')
		{
			$(div).scrollTo(p2, 800);
		}
	else if(check==='#box3')
		{
			$(div).scrollTo(p3, 800);
		}
	else
		{
			$(div).scrollTo(p4, 800);
		}
};

$(document).ready(function() {

$("ul#menu li:first-child > a").addClass('selected');


$('a.link').click(function () {  /* 1 -2 -3 -4 steps */
	if($(this).hasClass('link_disabled')) return false;
	//	if($("#main").find('.widget-head').size() != 0){ alert("error"); return false;}

	$('.link_disabled').removeClass('link_disabled');
	$(this).addClass('link_disabled');
	$("#step1").addClass('link_disabled');

	$('#wrapper').scrollTo($(this).attr('href'), 800);
	//setPosition($(this).attr('href'), '#cloud1', '0px', '400px', '800px', '1200px')
	setPosition($(this).attr('href'), '#cloud2', '0px', '800px', '1600px', '2400px')
	$('a.link').removeClass('selected');
	$(this).addClass('selected');
	return false;
});
/*
$("#columns .widget").click(function(){
	if($(this).hasClass('selected_widget')) return;
	$(".selected_widget").removeClass('selected_widget').addClass('normal_widget');
	$(this).removeClass('normal_widget').addClass('selected_widget');
});
*/

$(".step3_settings").click(function(){
	if($(this).hasClass('step3_settings_selected')) return;
	$(".step3_settings_selected").removeClass('step3_settings_selected');
	$(this).addClass('step3_settings_selected');
});

$(".pattern").click(function(){
	$(".pattern_selected").removeClass('pattern_selected');
	$(this).addClass('pattern_selected');
});

hideShow($(".hideBtn")); // Svernyt'\Razveryt'
$(".hideBtn").click(function(){hideShow($(this));return false;});


$(".content").draggable(); /* Drag-and-drop settings block */
$(".content").draggable( "option", "containment", "parent" );
$(".content").draggable( "option", "cursor", "pointer" );
$(".panelka_content").draggable(); /* Drag-and-drop settings block */
$(".panelka_content").draggable( "option", "containment", "parent" );
$(".panelka_content").draggable( "option", "cursor", "pointer" );


  $('#demo').hide(); // Настройка колорр пиккера
    var f = $.farbtastic('#picker');
    var p = $('#picker').css('opacity', 0);
    p.hide();
    var selected;
    $('.colorwell')
      .each(function () { f.linkTo(this); $(this).css('opacity', 0.75); })
      .focus(function() {
        if (selected) {
          $(selected).css('opacity', 0.75).removeClass('colorwell-selected');
        }
        f.linkTo(this);
        p.animate({opacity:1},1000);
	  p.show();
        $(selected = this).css('opacity', 1).addClass('colorwell-selected');
      })
    .blur(function(){
	  p.animate({opacity:0},1000);
    });

   //window.onunload=function(){confirm('Delete oblast?')};

});
