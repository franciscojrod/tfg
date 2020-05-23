/**
 * Accordion
 */

import 'bootstrap/js/dist/collapse';

// Module dependencies
import 'protons';
import 'atoms/button';
import 'atoms/icon';
import 'molecules/card';

// Module template
import './_accordion.twig';

// Module styles
import './_accordion.scss';

export const name = 'accordion';

export function disable() {}

export function enable() {}

export default enable;
