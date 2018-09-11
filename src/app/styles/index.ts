import { css, injectGlobal } from 'emotion';

import 'normalize.css/normalize.css';

import '@ridi/rsg/components/dist/components.css';
import '@ridi/rsg/stylesheets/dist/rui-no-reset.css';

export const defaultFontFamily = 'Noto Sans KR, NotoSansKR, Sans-serif';
export const museoSansFontFamily = 'museo_sans, Noto Sans KR, NotoSansKR, Sans-serif';
export const securityFontFamily = 'text-security-disc';
export const full = '100%';
export const half = '50%';

export const paperStylesClassName = 'paper';
export const paperProStylesClassName = 'paperPro';

export const breakpoints = {
  desktopView: '@media (min-width: 481px)',
  mouseDevice: '@media (hover: hover)'
};

export const defaultFontStyle = {
  color: '#40474d',
  lineHeight: '1em'
};

export const resetFont = {
  fontFamily: defaultFontFamily,
  letterSpacing: '-.03em',
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale'
};

export const resetLayout = {
  margin: 0,
  padding: 0
};

export const resetAppearance = {
  border: '0',
  appearance: 'none'
};

export const resetInputFocus = {
  outline: 'none',
  '-webkit-tap-highlight-color': 'transparent'
};

export const resetButton: {} = {
  ...resetLayout,
  ...resetAppearance,
  background: 'none',
  boxShadow: 'none',
  cursor: 'pointer'
};

export const resetLink: {} = {
  ...resetLayout,
  ...resetAppearance,
  color: 'black',
  textDecoration: 'none'
};

export const resetList: {} = { ...resetLayout, ...resetAppearance, listStyle: 'none' };

export const resetHeading: {} = { ...resetLayout, ...resetAppearance, fontSize: 'inherit' };

export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const flexSpaceBetween = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

/** classes  */
export const invisible = css({
  opacity: 0,
  pointerEvents: 'none'
});

export const a11y = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: '0',
  overflow: 'hidden',
  border: '0',
  clip: 'rect(0, 0, 0, 0)'
});

export const centralHeading2 = css({
  ...resetHeading,
  marginTop: '64px',
  fontSize: '18px',
  fontWeight: 700,
  textAlign: 'center',
  [`.${paperStylesClassName} &`]: {
    marginTop: '54px',
    fontSize: '24px',
    lineHeight: '36px'
  },
  [`.${paperProStylesClassName} &`]: {
    marginTop: '94px',
    fontSize: '32px',
    lineHeight: '47px',
    fontWeight: 900
  }
});

injectGlobal({
  html: resetFont,
  input: resetFont,
  textarea: resetFont,
  select: resetFont,
  button: resetFont
});
