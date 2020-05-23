/**
 * section
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module styles
import './_section.scss';

// Module template
import './_section.twig';

export const name = 'section';

export const defaults = {
  dummyClass: 'js-section-exists',
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
export function enable($context, { section = {} }) {
  // Find our component within the DOM
  const $section = $('.section', $context);
  // Bail if component does not exist
  if (!$section.length) {
    return;
  }
  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, section);
  // An example of what could be done with this component
  $section.addClass(settings.dummyClass);
}

export default enable;
