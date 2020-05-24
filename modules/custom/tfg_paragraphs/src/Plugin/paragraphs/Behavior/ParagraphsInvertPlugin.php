<?php

namespace Drupal\xi_paragraphs\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\paragraphs\ParagraphsBehaviorBase;

/**
 * Provides a paragraph invert behavior plugin.
 *
 * @ParagraphsBehavior(
 *   id = "paragraph_invert",
 *   label = @Translation("Paragraph invert"),
 *   description = @Translation("Paragraph invert behavior plugin."),
 *   weight = 1
 * )
 */
class ParagraphsInvertPlugin extends ParagraphsBehaviorBaseConfiguration {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $form['default_invert'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Invert'),
      '#default_value' => $this->configuration['default_invert'],
      '#description' => $this->t("Switch that will render image on the left side."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_invert'] = $form_state->getValue('default_invert');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'default_invert' => 0,
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildBehaviorForm(ParagraphInterface $paragraph, array &$form, FormStateInterface $form_state) {

    if ($this->isBehaviorExcluded($form)) {
      return [];
    }
    $form['invert'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Invert'),
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'invert', $this->configuration['default_invert']),
      '#description' => $this->t("Switch that will render image on the left side."),
    ];

    // Returning an empty array will make the behaviors show up in the paragraph content form.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function view(array &$build, Paragraph $paragraphs_entity, EntityViewDisplayInterface $display, $view_mode) {
    if ($invert = $paragraphs_entity->getBehaviorSetting($this->getPluginId(), 'invert')) {
      $build['#attributes']['class'][] = 'paragraph-invert';
    }
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $invert = $paragraph->getBehaviorSetting($this->getPluginId(), 'invert');
    if (!is_null($invert)) {
      return [$this->t('Invert: @invert', ['@invert' => $invert ? $this->t('Yes') : $this->t('No')])];
    } else {
      return [];
    }
  }
}
