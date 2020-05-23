<?php

/**
 * @file
 * Functions to support paragraphs in the Particle theme.
 */

/**
* Implements hook_preprocess_paragraph().
* @param $variables
*/
function particle_preprocess_paragraph(&$variables) {
  // Set variable apply_width to determine if e.g. paragraph widths should be applied.
  if (($node = \Drupal::routeMatch()->getParameter('node')) && $node instanceof \Drupal\node\NodeInterface) {
    if ($node->field_show_sidebar->value == 'none') {
      $variables['apply_width'] = true;
    } else {
      $variables['apply_width'] = false;
    }
  }

  // Change classes that start 'paragraph-' to 'section--'.
  if (isset($variables['attributes']['class']) && !empty($variables['attributes']['class'])) {
    $variables['attributes']['class'] = str_replace('paragraph-', 'section--', $variables['attributes']['class']);
  }
  
}
