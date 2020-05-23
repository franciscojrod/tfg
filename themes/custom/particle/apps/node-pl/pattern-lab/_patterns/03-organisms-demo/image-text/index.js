/**
 * Demo of image-text. Pulls in image-text assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'organisms/image-text';

// Import demo assets
import twig from './image-texts.twig';
import yaml from './image-texts.yml';

export default {
  twig,
  yaml,
};
