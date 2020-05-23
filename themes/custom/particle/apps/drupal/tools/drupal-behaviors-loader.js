module.exports = function drupalBehaviorsLoader(content) {
  // Do not do this transform if it is not a pattern entry.
  if (
    !/(01-atoms|02-molecules|03-organisms)\/[a-z,-]*\/index\.js$/.test(
      this.resource
    )
  ) {
    return content;
  }

  return [
    content,
    '',
    '// This is automatically added by drupal-behaviors-loader',
    'Drupal.behaviors[name] = {',
    '  attach: enable,',
    '  detach: disable,',
    '};',
  ].join('\n');
};
