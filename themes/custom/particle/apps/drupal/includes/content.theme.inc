<?php

/**
 * @file
 * Functions to support theming content layout in the Particle theme.
 */

function particle_preprocess_node(&$variables) {
  $variables['is_front'] = \Drupal::service('path.matcher')->isFrontPage();
}
