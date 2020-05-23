<?php

/**
 * @file
 * Functions to support theming miscellaneous things the Particle theme.
 */

use Drupal\particle\Tools\ParticleTools;

/**
 * Implements hook_preprocess().
 */
function particle_preprocess(&$variables) {
  // Set the paths.assets variable globally, so that drupal can
  // find webpack-compiled assets.
  $variables['paths']['assets'] = ParticleTools::getAssetsPath();

  // Set unique cahcebuster for sprites based on datetime
  $variables['spritemap_date'] = @filemtime(drupal_get_path('theme', 'particle') . '/assets/images/spritemap.svg');
}

/**
 * Implements hook_preprocess_user().
 */
function particle_preprocess_user(&$variables) {
  unset($variables['content']['member_for']);
}
