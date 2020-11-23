jQuery(document).ready(function($){
	var slidesWrapper = $('.cd-hero-slider');
  var sliderNav = $('.nav-list'),
      activePosition = slidesWrapper.find('li.selected').index(),
      selectedItem = $('li.selected');
	
	let $selectedScroller, $selectedScrollerIndex, $pageScrollers = $('.page-scroll');

	//check if a .cd-hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		$pageScrollers.on('click', function(){
			$selectedScroller = $(this);
			$selectedScrollerIndex = $selectedScroller.data('index');
			
			if(!$selectedScroller.hasClass('active')){
				// if it's not already selected
				console.log( 'my function, the active page scroller index is', $pageScrollers.filter('.active').data('index') );
				activePosition = slidesWrapper.find('li.selected').index();
				if($selectedScrollerIndex > activePosition){
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, $selectedScrollerIndex);
				}else{
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, $selectedScrollerIndex);
				}
	
				//updateSliderNavigation(sliderNav, $selectedScrollerIndex);
			}
		});

		//++++++++++++++++++++++++++++++++++++++++++
		//                TODO
		//++++++++++++++++++++++++++++++++++++++++++
		//If nav-list is currently open, ensure it gets closed after sliding to another page-section 
	}
	
	function nextSlide(visibleSlide, container, pagination, n){
		$(window).scrollTop(0);   //Ensure page-section scrolls to the top
    visibleSlide.removeClass('selected');
		container.children('li').eq(n).addClass('selected').prevAll().addClass('move-left');
	}

	function prevSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected')
		container.children('li').eq(n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
	}
	
	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.active');
		navigationDot.removeClass('active');
		pagination.find('li').eq(n).addClass('active');
	}
  
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