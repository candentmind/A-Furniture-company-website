jQuery(document).ready(function($){
	var slidesWrapper = $('.cd-hero-slider');
  var sliderNav = $('.nav-list'),
			//navigationMarker = $('.cd-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,
      activePosition = slidesWrapper.find('li.selected').index(),
      selectedPosition,
      selectedItem = $('li.selected');
	
			console.log('HELLO FROM WITHIN HERO SLIDER');
			console.log('The slider nav or nav list is ', sliderNav);



	//check if a .cd-hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		//var primaryNav = $('.cd-primary-nav'),
			

		//upload videos (if not on mobile devices)
		//uploadVideo(slidesWrapper);

		//autoplay slider
		//setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

		//on mobile - open/close primary navigation clicking/tapping the menu icon
		//primaryNav.on('click', function(event){
			//if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
		//});
		
		//change visible slide
		sliderNav.on('click', 'li', function(event){
			//event.preventDefault();
			selectedItem = $(this);
      
      //if(selectedItem.hasClass('selected')){
        //selectedItem.children().attr('href', 'javascript:void(0)');
      //}
      
      //if( selectedItem.children().data('no') === 1 ){
        //location.href = location.href.slice(0, -1);
        //console.log('LOCATION HASH IN CLICK');
      //}
      
      
			if(!selectedItem.hasClass('selected')) {
				// if it's not already selected
        selectedPosition = selectedItem.index();
        activePosition = slidesWrapper.find('li.selected').index();
        console.log('the active position is: ', activePosition);
        let $navList = $('li', sliderNav);
        console.log('the current target is: ', event.currentTarget);
        console.log('the target is: ', event.target);
        
        
        
        /*
        console.log('selected position is ', selectedPosition);
        console.log('active position is ', activePosition);
        */
        
        if( activePosition < selectedPosition) {
        nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        } else {
        prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        }

				//this is used for the autoplay
				//visibleSlidePosition = selectedPosition;

				updateSliderNavigation(sliderNav, selectedPosition);
				
				
				//updateNavigationMarker(navigationMarker, selectedPosition+1);
				//reset autoplay
				//setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
			}
		});
	}

	function nextSlide(visibleSlide, container, pagination, n){
    console.log('tada!');
		//visibleSlide.removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			//visibleSlide.removeClass('is-moving');
      //container.children('li').eq(n).css('display', 'block');
		//});

    visibleSlide.removeClass('selected');
		container.children('li').eq(n).addClass('selected').prevAll().addClass('move-left');
		//checkVideo(visibleSlide, container, n);
    
	}

	function prevSlide(visibleSlide, container, pagination, n){
		//visibleSlide.removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			//visibleSlide.removeClass('is-moving');
		//});
    
    visibleSlide.removeClass('selected')
		container.children('li').eq(n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
		//checkVideo(visibleSlide, container, n);
	}

  
	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.selected');
		navigationDot.removeClass('selected');
		pagination.find('li').eq(n).addClass('selected');
	}
  

  /*
	function setAutoplay(wrapper, length, delay) {
		if(wrapper.hasClass('autoplay')) {
			clearInterval(autoPlayId);
			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
		}
	}
  */

  /*
	function autoplaySlider(length) {
		if( visibleSlidePosition < length - 1) {
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
			visibleSlidePosition +=1;
		} else {
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
			visibleSlidePosition = 0;
		}
		//updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
		//updateSliderNavigation(sliderNav, visibleSlidePosition);
	}
  */

  /*
	function uploadVideo(container) {
		var i = 0;
		container.find('.cd-bg-video-wrapper').each(function(){
			var videoWrapper = $(this);
			if( videoWrapper.is(':visible') ) {
				// if visible - we are not on a mobile device 
				var	videoUrl = videoWrapper.data('video'),
					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /></video>');
				
				if(i == 0) {
					video = $('<video autoplay loop><source src="'+videoUrl+'.mp4" type="video/mp4" /></video>');
				}

				video.appendTo(videoWrapper);

				// play video if first slide
				if(videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();

				i++;
			}
		});
	}
  */

  /*
	function checkVideo(hiddenSlide, container, n) {
		//check if a video outside the viewport is playing - if yes, pause it
		var hiddenVideo = hiddenSlide.find('video');
		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();

		//check if the select slide contains a video element - if yes, play the video
		var visibleVideo = container.children('li').eq(n).find('video');
		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
	}
  */

	//function updateNavigationMarker(marker, n) {
		//marker.removeClassPrefix('item').addClass('item-'+n);
	//}

  /*
	$.fn.removeClassPrefix = function(prefix) {
		//remove all classes starting with 'prefix'
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
  */
  
  window.addEventListener('hashchange', function(e){
    console.log('The selected link data number is ', selectedItem.children().data('no'));
    
    /* 
      When the page loads by default the first navigation list item will have
      the class of selected and it's href attribute has a value of #, so if/when
      a user hits/clicks this list item, hashchange event will be triggered by
      the child link element and a new history entry will be pushed to the history stack.
      Thus if the default home page is index.html, after clicking this list-item, the 
      href will contain index.html#. Thus when the back-button of the browser is clicked, 
      the user is taken to the same home page of index.html as index.html and index.html#
      are different entries on the browser's History stack.
      TO PREVENT seeing the same page after a user clicks the browser back button, 
    */
    if(selectedItem.hasClass('selected') && !location.href.includes('#')){
       //selectedItem.children().attr('href', '#0');
       //console.log( 'HREF: ', selectedItem.children().attr('href') );
       //location.reload();
    }
    
    if(selectedItem.children().data('no') > 1 && !location.href.includes('#')){
      //alert('user pressed back button');
      location.reload();
    }
  });
  
  window.addEventListener('DOMContentLoaded', function(){
    //window.location.hash = "";
  });
  
  window.addEventListener('popstate', function(e){
    //e.preventDefault();
    //console.log(e);
    //console.log('selected is ', selectedItem);
    
    //setTimeout(()=>{
      //console.log('Hello');
    //}, 500);
    //selectedPosition--;
    console.log('popstate');
    //if(!location.href.includes('#'))
      //location.reload();
  });
});