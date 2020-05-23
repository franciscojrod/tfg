/**
 * Nav
 */

import $ from 'jquery';

// Custom
import 'protons';
import 'bootstrap/js/dist/dropdown';
import 'atoms/dropdown';

// Module template
import './_nav.twig';
import './_nav-item.twig';

// Import custom sass, includes Bootstrap sass
import './_nav.scss';

export const name = 'nav';

export function disable() {}

/**
 * Each component has a chance to run when its enable function is called. It is
 * given a piece of DOM ($context) and a settings object. We destructure our
 * component key off the settings object and provide an empty object fallback.
 * Incoming settings override default settings via Object.assign().
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Settings object
 */
export function enable($context) {
  // ------------------------------------------------------- //
  // Multi Level dropdowns
  // ------------------------------------------------------ //

  const $dropdown = $("ul.dropdown-menu [data-toggle='dropdown']", $context);

  $dropdown.each(function eachDropdown() {
    const $thisDropdown = $(this);

    $thisDropdown.on('click', function clickDropdown(event) {
      event.preventDefault();
      event.stopPropagation();

      $(this)
        .siblings()
        .toggleClass('show');

      if (
        !$(this)
          .next()
          .hasClass('show')
      ) {
        $(this)
          .parents('.dropdown-menu')
          .first()
          .find('.show')
          .removeClass('show');
      }

      $(this)
        .parents('li.nav-item.dropdown.show')
        .on('hidden.bs.dropdown', function hideDropdown() {
          $('.dropdown-submenu .show').removeClass('show');
        });
    });
  });
}

export default enable;
