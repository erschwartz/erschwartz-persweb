(function ($) {
	$(document).ready(function(){

	// hide .navbar first

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

	$(".navbar").hide();
	
	// fade in .navbar
	$(function () {
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
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
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$body = $('body');
	
    //FadeIn all sections   
    $body.imagesLoaded( function() {
    	setTimeout(function() {

		      // Resize sections
		      adjustWindow();
		      
		      // Fade in sections
		      $body.removeClass('loading').addClass('loaded');

		  }, 800);
    });

    function adjustWindow(){

		// Init Skrollr
		
		
		// Get window size
		winH = $window.height();

	    // Keep minimum height 550
	    if(winH <= 550) {
	    	winH = 550;
	    } 
	    
	    // Resize our slides
	    $slide.height(winH);
	    
	    // Refresh Skrollr after resizing our sections
	    
	    
	}



} )( jQuery );