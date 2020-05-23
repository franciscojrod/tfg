module.exports = function attachLibraryLoader(content) {
  // If the twig template extends another don't prepend a call to attach_library
  // as this produces invalid twig.
  if (/{% extends/.test(content)) {
    return content;
  }
  const nameMatcher = this.resource.match(/\/([\w-]+)\/[\w-]+\.twig/);
  let result = content;
  if (!nameMatcher.length) {
    this.emitError(
      new Error(
        'Could not match the library name! Could not inject the attach_library call!'
      )
    );
  } else {
    const name = nameMatcher[1].replace(/-/g, '_');
    const attachCall = `{{ attach_library('particle/${name}') }}`;
    result = [attachCall, content].join('\n\n');
  }

  return result;
};
