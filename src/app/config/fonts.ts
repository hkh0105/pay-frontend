import * as WebFont from 'webfontloader';

import 'fonts.css';

export const loadFonts = () => {
  WebFont.load({
    custom: {
      families: ['Noto Sans KR:n4,n7,n9'],
    },
  });
};