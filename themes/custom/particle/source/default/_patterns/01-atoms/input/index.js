/**
 * input
 */

import $ from 'jquery';

// Module dependencies
import 'protons';
import 'molecules/form-group';

// Module styles
import './_input.scss';

// Module template
import './_input.twig';

export const name = 'input';

export const defaults = {
  dummyClass: 'js-input-exists',
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
/*
export function enable($context, { input = {} }) {
  // Find our component within the DOM
  const $input = $('.input', $context);
  // Bail if component does not exist
  if (!$input.length) {
    return;
  }
  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, input);
  // An example of what could be done with this component
  $input.addClass(settings.dummyClass);
}
*/

export function enable($context) {
  $('.input-password', $context).each(function eachFormGroupPassword() {
    const $this = $(this);
    const passwordVisibleClass = 'is-showing-password';
    const $input = $this.find('input');
    const $icon = $this.find('.input-password__icon');
    let showing = false;

    const togglePassword = show => {
      showing = show;
      $this.toggleClass(passwordVisibleClass, show);
      $input.attr('type', show ? 'text' : 'password');
    };

    $icon.click(() => togglePassword(!showing));
  });

  $('.form-file', $context).each(function eachFileValueEl() {
    const $this = $(this);
    const $label = $this.siblings('label');
    const defaultText = $label.text();
    const updateLabel = () => {
      const fileList = Array.from($this.get(0).files);
      $label.text(
        fileList.length === 0
          ? defaultText
          : fileList.map(file => file.name).join(', ')
      );
    };
    $this.on('change', updateLabel);
    updateLabel();
  });
}

export default enable;
