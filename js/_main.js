
(function ($) {
	$(document).ready(function() {

		$.fn.scrollView = function () {
			return this.each(function () {
				$('html, body').animate({
					scrollTop: $(this).offset().top - 75
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
		$("#scrollDown").hover( function() {
			$(this).toggleClass("animated");
			$(this).toggleClass("infinite");
			$(this).toggleClass("pulse");
		});
		$("#about-programming").hover( function() {
			$("#icon-programming").toggleClass("animated");
			$("#icon-programming").toggleClass("infinite");
			$("#icon-programming").toggleClass("pulse");
		});
		$("#about-design").hover( function() {
			$("#icon-design").toggleClass("animated");
			$("#icon-design").toggleClass("infinite");
			$("#icon-design").toggleClass("pulse");
		});
		$("#about-language").hover( function() {
			$("#icon-language").toggleClass("animated");
			$("#icon-language").toggleClass("infinite");
			$("#icon-language").toggleClass("pulse");
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

$(window).scroll(function() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});