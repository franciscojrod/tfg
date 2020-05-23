<?php

/**
 * @file
 * Functions to support theming page layout in the Particle theme.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function particle_preprocess_page(&$variables) {
  // This might be obsolete since we've removed the has_components_module conditional from page.html.twig
  $moduleHandler = \Drupal::service('module_handler');
  if ($moduleHandler->moduleExists('components')) {
    $variables['has_components_module'] = TRUE;
  }
}
