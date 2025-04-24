$(document).ready(function() {
	// preload images
	$("#image_list a").each(function() {
		var swappedImage = new Image();
		swappedImage.src = $(this).attr("href");
	});
	
	// set up event handlers for links    
	$("#image_list a").click(function(evt) {
		var imageURL = $(this).attr("href");
		var caption = $(this).attr("title");

		// fade out current image and caption, then swap and fade in
		$("#image").fadeOut(1000, function() {
			$(this).attr("src", imageURL).fadeIn(1000);
		});
		$("#caption").fadeOut(1000, function() {
			$(this).text(caption).fadeIn(1000);
		});

	    evt.preventDefault(); // cancel the default action
	});

	$("li:first-child a").focus(); // move focus to first thumbnail
});
