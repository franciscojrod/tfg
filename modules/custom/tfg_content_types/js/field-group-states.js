(function ($, Drupal) {

  var initialized;

  function init() {
    if (!initialized) {
      initialized = true;
      toggleSidebar();
    }
  }

  /**
   * Hides the vertical 'sidebar' tab in case no sidebar selection has been choosen.
   * 
   * @see https://www.drupal.org/project/drupal/issues/1148950
   */
  Drupal.behaviors.fieldGroupStates = {
    attach: function (context, settings) {
      init();
      // Add listener on field_show_sidebar select field.
      $('select[name=field_show_sidebar]').once().change(function() {
        toggleSidebar();
      });
    }
  };

  /**
   * Toggles visibility of the vertical sidebar tab.
   */
  function toggleSidebar() {
    let hide = true;
    // Check the value of the sidebar select.
    if ($('select[name=field_show_sidebar] option:selected').val() === 'none') {
      hide = true;
    } else {
      hide = false;
    }
    // Hide the horizontal tab based on the value.
    $(".horizontal-tabs-list li a").each(function(index) {
      if ($(this).attr('href') === '#edit-group-sidebar') {
        let selector = $(this).attr('href');
        hide ? $(this).closest('li').hide() : $(this).closest('li').show();
        hide ? $(selector).hide() : $(selector).show();
      }
    });
  }

})(jQuery, window.Drupal);

