$(document).ready(function() {
  
  $('nav a[href*=#]').bind('click', function(e) {
    e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump
         
    var target = $(this).attr("href"); //Get the target
        
    // perform animated scrolling by getting top-position of target-element and set it as scroll target
    $('html, body').stop().animate({ scrollTop: $(target).offset().top }, 400, function() {
         location.hash = target;  //attach the hash (#jumptarget) to the pageurl
    });
        
    return false;

  });

  $('.program-row > td').click(function(e) {
	e.preventDefault();
	var infoRow = $(this).parents('.program-row').next('.additional-info-row');
	var track = $(this).attr('class') + '-info';
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('.additional-info-row').hide();
		$('.additional-info-cell').children().hide();
		$('.indicator').remove();
	} else if (infoRow.length > 0) {
		$('.program-row > td').removeClass('active');
		$(this).addClass('active');
		$('.indicator').remove();
		$(this).append('<span class="indicator">');
		$('.additional-info-row').hide();
		infoRow.show();
		infoRow.children('.additional-info-cell').children().hide();
		infoRow.children('.additional-info-cell').children('.' + track).show();
	}
  });

});
