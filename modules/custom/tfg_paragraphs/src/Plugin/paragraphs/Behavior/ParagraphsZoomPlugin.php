<?php

namespace Drupal\xi_paragraphs\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\paragraphs\ParagraphsBehaviorBase;

/**
 * Provides a test feature plugin.
 *
 * @ParagraphsBehavior(
 *   id = "paragraph_zoom",
 *   label = @Translation("Paragraph zoom"),
 *   description = @Translation("Paragraph zoom behavior plugin"),
 *   weight = 1
 * )
 */
class ParagraphsZoomPlugin extends ParagraphsBehaviorBase {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['default_zoom'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable zoom'),
      '#default_value' => $this->configuration['default_zoom'],
      '#description' => $this->t("Default zoom option for the paragraph."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_zoom'] = $form_state->getValue('default_zoom');
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'default_zoom' => 0,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildBehaviorForm(ParagraphInterface $paragraph, array &$form, FormStateInterface $form_state) {
    $form['zoom'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Zoom'),
      '#weight' => 50,
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'zoom', $this->configuration['zoom']),
      '#description' => $this->t("Zoom for the paragraph."),
    ];

    // Returning an empty array will make the behaviors show up in the paragraph content form.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function view(array &$build, Paragraph $paragraphs_entity, EntityViewDisplayInterface $display, $view_mode) {
    if ($zoom = $paragraphs_entity->getBehaviorSetting($this->getPluginId(), 'zoom')) {
      $build['#paragraph']->zoom = $zoom;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $zoom = $paragraph->getBehaviorSetting($this->pluginId, 'zoom');
    if (!is_null($zoom)) {
      return [$this->t('Zoom: @zoom', ['@zoom' => $zoom ? $this->t('On') : $this->t('Off')])];
    } else {
      return [];
    }
  }
}
