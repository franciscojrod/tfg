(function ($, Drupal) {

  Drupal.behaviors.galleryZoom = {
    attach: function (context, settings) {
      $(context).find('.paragraph--gallery--zoom').once('zoom-processed').each(function() {
        const pswpElement = document.querySelectorAll('.pswp')[0];

        // Build items array
        let items = [];
        $(this).find('.m-media-gallery__slider .slick-track > .c-field--item:not(.slick-cloned)').once().each(function() {
          const imgSource = $(this).find('picture source[media="all and (min-width: 768px)"]').attr('srcset').split('1x,')[0];
          const itemObject = {
            src: imgSource,
            w: 1024,
            h: 768
          };
          items.push(itemObject);
        });

        // Initializes and opens PhotoSwipe
        $(this).find('.m-media-gallery__slider .slick-track > .c-field--item img').click(function(){
          // Get image index to start with the clicked image
          const clickedImageSrc = $(this).parents('picture').find('source[media="all and (min-width: 768px)"]').attr('srcset').split('1x,')[0];
          let imageIndex = 0;
          for (var i = 0; i < items.length; i++) { 
            if(clickedImageSrc == items[i].src) {
              imageIndex = i;
            }
          };
          const options = {
            index: imageIndex
          };
          const gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
          gallery.init();
        });
      });
    }
  };
})(jQuery, window.Drupal);