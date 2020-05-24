(function ($, Drupal) {

  Drupal.behaviors.paragraphSlideshow = {
    attach: function (context, settings) {
      $(context)
        .find('.slideshow .slideshow__slides')
        .once()
        .slick({
          arrows: true,
          dots: true,
          adaptiveHeight: true,
          speed: 1000
      });
    }
  };

  /**
   * Slick slider for gallery paragraph.
   */
  Drupal.behaviors.paragraphGallery = {
    attach: function attach(context) {
      $(context)
        .find('.m-media-gallery')
        .once().each(function() {
          $(this).find('.m-media-gallery__slider .c-field--name-field-media').slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            autoplay: false,
            asNavFor: '.m-media-gallery__navigation .c-field--name-field-media'
          });
          $(this).find('.m-media-gallery__navigation .c-field--name-field-media').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.m-media-gallery__slider .c-field--name-field-media',
            centerMode: true,
            focusOnSelect: true,
            arrows: false
          });
      });
    }
  };

})(jQuery, window.Drupal);
