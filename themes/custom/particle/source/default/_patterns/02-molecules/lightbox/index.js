/**
 * lightbox
 */

import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import 'ekko-lightbox';
import 'ekko-lightbox/dist/ekko-lightbox.css';

// Module dependencies
import 'protons';

// Module template
import './_lightbox.twig';

// Module styles
import './_lightbox.scss';

export const name = 'lightbox';

export const defaults = {
  dummyClass: 'js-lightbox-exists',
};

/**
 * Components may need to run clean-up tasks if they are removed from DOM.
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Pertinent settings
 */
// eslint-disable-next-line no-unused-vars
export function disable($context, settings) {}

/**
 * Each component has a chance to run when its enable function is called. It is
 * given a piece of DOM ($context) and a settings object. We destructure our
 * component key off the settings object and provide an empty object fallback.
 * Incoming settings override default settings via Object.assign().
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Settings object
 */
export function enable($context, { lightbox = {} }) {
  // Find our component within the DOM
  const $lightbox = $('.lightbox', $context);
  // Bail if component does not exist
  if (!$lightbox.length) {
    return;
  }

  $lightbox.each(function eachLightbox() {
    $(document).on('click', '[data-toggle="lightbox"]', function initLightbox(
      event
    ) {
      event.preventDefault();
      $(this).ekkoLightbox({
        leftArrow:
          '<i class="icon lightbox__prev js-icon-exists">chevron_left</i>',
        rightArrow:
          '<i class="icon lightbox__next js-icon-exists">chevron_right</i>',
      });
    });
  });

  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, lightbox);
  // An example of what could be done with this component
  $lightbox.addClass(settings.dummyClass);
}

export default enable;
