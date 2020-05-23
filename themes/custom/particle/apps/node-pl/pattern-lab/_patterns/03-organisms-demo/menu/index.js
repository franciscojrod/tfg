/**
 * Demo of menu. Pulls in menu assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'organisms/menu';

// Import demo assets
import twig from './menus.twig';
import yaml from './menus.yml';

export default {
  twig,
  yaml,
};
