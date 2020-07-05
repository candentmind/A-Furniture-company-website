jQuery(document).ready(function($){
	var slidesWrapper = $('.cd-hero-slider');

	//check if a .cd-hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		
    var sliderNav = $('.cd-slider-nav'),
			slidesNumber = slidesWrapper.children('li').length;
    
    //upload videos (if not on mobile devices)
		uploadVideo(slidesWrapper);

		//autoplay slider
		//setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
		
		//change visible slide
		sliderNav.on('click', 'li', function(event){
      console.log('hello');
			
      //event.preventDefault();
			var selectedItem = $(this);
      console.log(selectedItem.index());
      
      //console.log(selectedItem);
      
			if(!selectedItem.hasClass('selected')) {
				// if it's not already selected
				var selectedPosition = selectedItem.index(),
					activePosition = slidesWrapper.find('li.selected').index();
          
          //console.log('selected position is ' + selectedPosition);
          //console.log('active position is ' + activePosition);
				
				if( activePosition < selectedPosition) {
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, selectedPosition);
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, selectedPosition);
				}

        
				//this is used for the autoplay
				//visibleSlidePosition = selectedPosition;

				updateSliderNavigation(sliderNav, selectedPosition);
				
        //reset autoplay
				//setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
       
			}
		});
	}

	function nextSlide(visibleSlide, container, n){
		visibleSlide.removeClass('selected').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected').prevAll().addClass('move-left');
		//checkVideo(visibleSlide, container, n);
	}

	function prevSlide(visibleSlide, container, n){
		visibleSlide.removeClass('selected').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
		//checkVideo(visibleSlide, container, n);
	}

	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.selected');
		navigationDot.removeClass('selected');
		pagination.find('li').eq(n).addClass('selected');
	}


});