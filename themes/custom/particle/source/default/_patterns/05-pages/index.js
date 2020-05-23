/**
 * Full Page Demos
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Ensure all assets required by demos are present.
import 'protons';
import 'templates/site-container.twig';
import 'templates/sidebar';

// Demo templates.
import './article.twig';
import './homepage.twig';
import './news.twig';
import './event.twig';

export const name = 'demoPages';

export function disable() {}

export function enable() {}

export default enable;
