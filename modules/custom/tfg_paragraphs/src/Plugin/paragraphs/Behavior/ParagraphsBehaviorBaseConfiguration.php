<?php

namespace Drupal\xi_paragraphs\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\paragraphs\ParagraphsBehaviorBase;

abstract class ParagraphsBehaviorBaseConfiguration extends ParagraphsBehaviorBase {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['excluded_fields'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Excluded fields'),
      '#default_value' => $this->configuration['excluded_fields'],
      '#description' => $this->t('With each excluded field on a new line.'),
      '#weight' => 100
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'excluded_fields' => []
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['excluded_fields'] = $form_state->getValue('excluded_fields');
  }

  /**
   * @param array $form
   *
   * @return bool
   */
  public function isBehaviorExcluded(array $form) {
    $exclude_fields = $this->configuration['excluded_fields'];
    if (!empty($exclude_fields)) {
      // Exclude behavior setting changes in case it is found on excluded fields.
      $exclude_fields = preg_split('/\r\n|[\r\n]/', $exclude_fields);
      foreach ($exclude_fields as $exclude_field) {
        if (strpos($form['#group'], $exclude_field) !== FALSE) {
          return TRUE;
        }
      }
    }
    return FALSE;
  }
}
