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
	var programRow = $(this).parents('.program-row');
    var infoRow = programRow.next('.additional-info-row');
    var track = $(this).attr('class') + '-info';
    var info = infoRow.children('.additional-info-cell').children('.' + track);
    var longSessions = $(this).nextAll('td').filter(function() {
		return $(this).attr("rowspan") > 2;
	});
	
	if (infoRow.length == 0 || info.length == 0) {
		// Try the next row to enable longer sessions
		infoRow = infoRow.nextAll('.additional-info-row').first();
		info = infoRow.children('.additional-info-cell').children('.' + track);
	}
	
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.additional-info-row').hide();
        $('.additional-info-cell').children().hide();
        $('.indicator').remove();
		
		longSessions.attr('rowspan', function(i, rs) { return rs - 1; })
    } else if (infoRow.length > 0 && info.length > 0) {
        $('.program-row > td').removeClass('active');
        $(this).addClass('active');
        $('.indicator').remove();
        $(this).append('<span class="indicator"></span>');
        $('.additional-info-row').hide();
        infoRow.show();
        infoRow.children('.additional-info-cell').children().hide();
        info.show();
		
		longSessions.attr('rowspan', function(i, rs) { return rs + 1; })
    }

  });

});
