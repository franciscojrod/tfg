/**
 * Demo of grid. Pulls in grid assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'templates/grid';

// Import demo assets
import twig from './grids.twig';
import yaml from './grids.yml';

export default {
  twig,
  yaml,
};
