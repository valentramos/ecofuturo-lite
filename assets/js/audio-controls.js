const stopAudio = () => {
	/*********** Utility ***********/
	$.fn.extend({
		stopAudio: function() {
		$(this).trigger('pause');
		try {
			if ($(this).prop('currentTime') !== 0) {
			$(this).prop('currentTime', 0);
			}
		} catch (e) {
			alert($(this).prop('currentTime') + '///' + $(this)[0].readyState + e.message);
		}
		}
	});
  	/*********** /Utility ***********/  
  
	// $('#stop-audio-btn').click(function() {
	// 	$('audio').stopAudio();
	// });
	$('#slide1modal').click(function() {
		$('audio').stopAudio();
    });
    $('#slide2modal').click(function() {
		$('audio').stopAudio();
    });
    $('#slide3modal').click(function() {
		$('audio').stopAudio();
    });
    $('#slide4modal').click(function() {
		$('audio').stopAudio();
    });
    $('#slide5modal').click(function() {
		$('audio').stopAudio();
    });
    $('#slide6modal').click(function() {
		$('audio').stopAudio();
    });
    $('#slide7modal').click(function() {
		$('audio').stopAudio();
	});
}

stopAudio();