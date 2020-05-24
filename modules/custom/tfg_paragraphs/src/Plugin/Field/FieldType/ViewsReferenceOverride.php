<?php

namespace Drupal\xi_paragraphs\Plugin\Field\FieldType;


use Drupal\viewsreference\Plugin\Field\FieldType\ViewsReferenceItem;

/**
 * Class ViewsReferenceOverride
 *
 * Overrides the original ViewsReferenceItem to include some more
 * additional information in field value to store page limit,
 * view mode and multiple arguments.
 *
 * @package Drupal\xi_paragraphs\Plugin\Field\FieldType
 */
class ViewsReferenceOverride extends ViewsReferenceItem {

  /**
   * {@inheritdoc}
   */
  public function setValue($values, $notify = TRUE) {
    // Select widget has extra layer of items.
    $additional_settings = [];
    if (isset($values['page_limit'])) {
      $additional_settings['page_limit'] = $values['page_limit'];
    }
    if (isset($values['view_mode'])) {
      $additional_settings['view_mode'] = $values['view_mode'];
    }
    if (!empty($additional_settings)) {
      $values['data'] = serialize($additional_settings);
    }
    if (!empty($values['argument']) && is_array($values['argument'])) {
      $values['argument'] = implode('/', $values['argument']);
    }
    parent::setValue($values, FALSE);
  }

}
