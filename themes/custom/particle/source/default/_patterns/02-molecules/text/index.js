/**
 * text
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module styles
import './_text.scss';

// Module template
import './_text.twig';

export const name = 'text';

export const defaults = {
  dummyClass: 'js-text-exists',
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
export function enable($context, { text = {} }) {
  // Find our component within the DOM
  const $text = $('.text', $context);
  // Bail if component does not exist
  if (!$text.length) {
    return;
  }
  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, text);
  // An example of what could be done with this component
  $text.addClass(settings.dummyClass);
}

export default enable;
