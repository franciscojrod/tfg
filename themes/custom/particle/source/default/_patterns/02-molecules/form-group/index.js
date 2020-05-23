/**
 * formGroup
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module styles
import './_form-group.scss';

// Module template
import './_form-group.twig';

export const name = 'form-group';

export const defaults = {};

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
export function enable($context, { formGroup = {} }) {
  // Find our component within the DOM
  const $formGroup = $('.form-group', $context);
  // Bail if component does not exist
  if (!$formGroup.length) {
    return;
  }
  // Merge defaults with incoming settings
  // eslint-disable-next-line no-unused-vars
  const settings = Object.assign(defaults, formGroup);
}

export default enable;
