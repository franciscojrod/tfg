<?php

namespace Drupal\xi_paragraphs\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\paragraphs\ParagraphsBehaviorBase;

/**
 * Provides a theme feature plugin.
 *
 * @ParagraphsBehavior(
 *   id = "paragraph_theme",
 *   label = @Translation("Paragraph theme"),
 *   description = @Translation("Paragraph theme behavior plugin"),
 *   weight = 1
 * )
 */
class ParagraphsThemePlugin extends ParagraphsBehaviorBaseConfiguration {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $form['default_theme'] = [
      '#type' => 'select',
      '#title' => $this->t('Default theme'),
      '#options' => $this->configuration['options'],
      '#default_value' => $this->configuration['default_theme'],
      '#description' => $this->t("Default theme option for the paragraph."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_theme'] = $form_state->getValue('default_theme');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'default_theme' => '',
      'options' => [
        '' => $this->t('none'),
        'dark' => $this->t('Dark'),
        'light' => $this->t('Light'),
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
    $form['theme'] = [
      '#type' => 'select',
      '#title' => $this->t('Theme'),
      '#weight' => 50,
      '#options' => $this->configuration['options'],
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'theme', $this->configuration['default_theme']),
      '#description' => $this->t("Theme for the paragraph."),
    ];

    // Returning an empty array will make the behaviors show up in the paragraph content form.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function view(array &$build, Paragraph $paragraphs_entity, EntityViewDisplayInterface $display, $view_mode) {
    if ($theme = $paragraphs_entity->getBehaviorSetting($this->getPluginId(), 'theme')) {
      $build['#attributes']['class'][] = 'paragraph-' . $theme;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $theme = $paragraph->getBehaviorSetting($this->pluginId, 'theme');
    if (!empty($theme)) {
      return [$this->t('Theme: @theme', ['@theme' => $this->configuration['options'][$theme]])];
    } else {
      return [];
    }
  }
}
