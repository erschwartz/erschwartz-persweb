
(function ($) {
	$(document).ready(function(){

		$.fn.scrollView = function () {
			return this.each(function () {
				$('html, body').animate({
					scrollTop: $(this).offset().top
				}, 1000);
			});
		}

		$("#homeLink").click( function() {
			$('#homeScreen').scrollView();
		});
		$("#aboutLink").click(function() {
			$('#aboutScreen').scrollView();
		});
		$("#portfolioLink").click( function() {
			$('#portfolioScreen').scrollView();
		});
		$("#contactLink").click( function() {
			$('#contactScreen').scrollView();
		});
		$("#scrollDown").click(function() {
			$('#aboutScreen').scrollView();
		});

		$(".navbar").hide();

	$(function () {
		$(window).scroll(function () {
            if ($(this).scrollTop() > $(window).height() - 50) {
            	$('.navbar').fadeIn();
            } else {
            	$('.navbar').fadeOut();
            }
        });
	});
});
}(jQuery));

( function( $ ) {
	
	$window = $(window);
	$slide = $('.homeSlide');
	$body = $('body');
  
    $body.imagesLoaded( function() {
    	setTimeout(function() {
		      adjustWindow();
		      $body.removeClass('loading').addClass('loaded');
		  }, 800);
    });

    function adjustWindow(){

		winH = $window.height();
	    if(winH <= 550) {
	    	winH = 550;
	    } 
	    $slide.height(winH);
	    
	}



} )( jQuery );