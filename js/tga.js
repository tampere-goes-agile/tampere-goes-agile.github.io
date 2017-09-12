$(document).ready(function() {

  // Polyfill
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

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
    var track = $(this).attr('class') + '-info';
    var results = findNextMatchingInfoRow(programRow, track)
    var infoRow = results[0]
    var info = results[1]

  	var clickedColumn = $(this);
  	var longSessionColumns = findLongSessionsAbove(programRow, clickedColumn)

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.additional-info-row').hide();
        $('.additional-info-cell').children().hide();
        $('.indicator').remove();
        restoreRowSpans();
    } else if (infoRow.length > 0 && info.length > 0) {
        $('.program-row > td').removeClass('active');
        restoreRowSpans();

        $(this).addClass('active');
        $('.indicator').remove();
        $(this).append('<span class="indicator"></span>');
        $('.additional-info-row').hide();
        infoRow.show();
        infoRow.children('.additional-info-cell').children().hide();
        info.show();

  	longSessionColumns.each(function() {
  		var column = $(this);
  		column.data("originalRowSpan", column.prop("rowspan"));
  		column.prop('rowspan', function(i, rs) { return rs + 1; })
  	});
    }

  });

});

function restoreRowSpans() {
	$('.program-row > td').each(function() {
		var column = $(this);
		column.prop('rowspan', column.data("originalRowSpan"));
	});
}

function findNextMatchingInfoRow(programRow, track) {
  var infoRows = programRow.nextAll('.additional-info-row');
  var infos = infoRows.find('.' + track);
  var info = infos.first()
  return [info.parent().parent(), info]
}

function findLongSessionsAbove(programRow, clickedColumn) {
  var currentRowspan = clickedColumn.prop("rowspan");
  if (currentRowspan == 1 || currentRowspan == undefined) {

    var allProgramRows = $('.program-row')
    var clickedRowIndex = allProgramRows.index(programRow)

    var longSessionColumns = allProgramRows.map(function() {
      var index = allProgramRows.index($(this))
      var distance = clickedRowIndex - index

      if (distance >= 0) {
        return $(this).children('td').filter(function() {
          return $(this).prop('class').startsWith('track')
            && $(this).prop("rowspan") > (distance + 1) && !($(this).is(clickedColumn));
        });
      } else return $([]);
    })

    return longSessionColumns
  } else {
    return $([])
  }

}
