<?php

namespace Drupal\tfg_paragraphs\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\paragraphs\ParagraphsBehaviorBase;

/**
 * Provides a test feature plugin.
 *
 * @ParagraphsBehavior(
 *   id = "paragraph_width",
 *   label = @Translation("Paragraph width"),
 *   description = @Translation("Paragraph width behavior plugin"),
 *   weight = 1
 * )
 */
class ParagraphsWidthPlugin extends ParagraphsBehaviorBaseConfiguration {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $form['default_width'] = [
      '#type' => 'select',
      '#title' => $this->t('Default width'),
      '#options' => $this->configuration['options'],
      '#default_value' => $this->configuration['default_width'],
      '#description' => $this->t("Default width option for the paragraph."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_width'] = $form_state->getValue('default_width');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'default_width' => 'Wide',
      'options' => [
        'full' => $this->t('Full'),
        'wide' => $this->t('Wide'),
        'narrow' => $this->t('Narrow')
       ]
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildBehaviorForm(ParagraphInterface $paragraph, array &$form, FormStateInterface $form_state) {

    if ($this->isBehaviorExcluded($form)) {
      return [];
    }
    $form['width'] = [
      '#type' => 'select',
      '#title' => $this->t('Width'),
      '#weight' => 50,
      '#options' => $this->configuration['options'],
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'width', $this->configuration['default_width']),
      '#description' => $this->t("Width for the paragraph."),
    ];

    // Returning an empty array will make the behaviors show up in the paragraph content form.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function view(array &$build, Paragraph $paragraphs_entity, EntityViewDisplayInterface $display, $view_mode) {
    if ($width = $paragraphs_entity->getBehaviorSetting($this->getPluginId(), 'width')) {
      $build['#attributes']['class'][] = 'paragraph-' . $width;
      $build['#attributes']['data-width'] = $width;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $width = $paragraph->getBehaviorSetting($this->pluginId, 'width');
    if ($width) {
      return [$this->t('Width: @width', ['@width' => $this->configuration['options'][$width]])];
    } else {
      return [];
    }
  }
}
