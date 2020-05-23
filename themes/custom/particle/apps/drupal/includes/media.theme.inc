<?php

/**
 * @file
 * Functions to support theming media entities in the Particle theme.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function particle_theme_suggestions_image_alter(array &$suggestions, array $variables) {
  $node = \Drupal::request()->attributes->get('node');
  if (!empty($node)) {
    $suggestions[] = 'image__' . $node->getType();
  }
}

/**
 * Implements hook_preprocess_media().
 */
function particle_preprocess_media(array &$variables) {
  $variables['attributes']['class'][] = 'media';
  // Add variant classes to media items
  $variables['attributes']['class'][] = 'media--' . $variables['view_mode'];
}
