/**
 * 2019.06.17 Store validator.lib.js 참조
 */

export const isDirty = (url: string) => {
  if (!url) {
    return true;
  }
  // start with double slash
  // scripts tag
  // javascript
  // include backslash
  // 'on' prefix attributes
  if (url.trim().match(/^\/\/|(\b)(on\S+)(\s*)=|\\|javascript|(<\s*)(\/*)script/ig)) {
    return true;
  }
  return false;
};

export const isClean = (url: string) => {
  if (!url) {
    return false;
  }
  // only *.ridibooks.com or *.ridi.io or query strings
  if (url.trim().match(/^(\/|(https?:\/\/|)([a-z0-9]+[.])?([a-z0-9]+[.])?(ridibooks.com|ridi.io)($|\/|\/+))/)) {
    return true;
  }
  return false;
};
