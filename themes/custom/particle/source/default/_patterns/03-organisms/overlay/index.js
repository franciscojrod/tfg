/**
 * overlay
 */

import 'bootstrap/js/dist/collapse';
import $ from 'jquery';

// Module dependencies
import 'protons';

// Module styles
import './_overlay.scss';

// Module template
import './_overlay.twig';

export const name = 'overlay';

export const defaults = {
  dummyClass: 'js-overlay-exists',
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
export function enable($context, { overlay = {} }) {
  // Toggle behavior of overlay
  const $overlayOpen = $('.js-overlay-open', $context);
  const $overlayClose = $('.js-overlay-close', $context);
  const $overlay = $('.overlay', $context);
  const $pageContentContainer = $('.layout-container', $context);
  const $formInput = $('#searchbox-downshift-input', $context); // id for elastic searchbox

  $overlayOpen.click(() => {
    $overlay.fadeIn();
    $formInput.focus();
  });
  $overlayClose.click(() => {
    $overlay.fadeOut();
  });
  $pageContentContainer.click(() => {
    $overlay.fadeOut();
  });
  $(document).on('keyup', e => {
    if (e.key === 'Escape') {
      $overlay.fadeOut();
    }
  });

  // Bail if component does not exist
  if (!$overlay.length) {
    return;
  }
  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, overlay);
  // An example of what could be done with this component
  $overlay.addClass(settings.dummyClass);
}

export default enable;
