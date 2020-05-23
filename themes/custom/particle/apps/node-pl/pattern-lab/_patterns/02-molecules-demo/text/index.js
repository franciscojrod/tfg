/**
 * Demo of text. Pulls in text assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'molecules/text';

// Import demo assets
import twig from './texts.twig';
import yaml from './texts.yml';

export default {
  twig,
  yaml,
};
