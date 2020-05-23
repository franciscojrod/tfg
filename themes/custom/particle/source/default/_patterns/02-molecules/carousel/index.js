/**
 * Carousel
 */

import $ from 'jquery';
import 'slick-carousel';

// Module dependencies
import 'protons';
import 'atoms/image';

// Module template
import './_carousel.twig';
import './_carousel-slide.twig';

// Module styles
import './_carousel.scss';

export const name = 'carousel';

/**
 * Components may need to run clean-up tasks if they are removed from DOM.
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Pertinent settings
 */
// eslint-disable-next-line no-unused-vars
export function disable($context) {}

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
  // Find carousel elements on the page
  const $carousel = $('.carousel', $context);

  $carousel.each(function eachCarousel() {
    const $thisCarousel = $(this);
    // Initialize the carousel with (potentially) overridden settings
    $thisCarousel.find('.carousel__slides').slick({
      dots: true,
      arrows: true,
      appendDots: $thisCarousel.find('.carousel__dots'),
      prevArrow: $thisCarousel.find('.carousel__prev'),
      nextArrow: $thisCarousel.find('.carousel__next'),
    });
  });
}

export default enable;
