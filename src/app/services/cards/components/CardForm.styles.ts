import { css } from 'emotion';

import {
  breakpoints,
  defaultFontFamily,
  flexSpaceBetween,
  museoSansFontFamily,
  resetLayout,
  securityFontFamily
} from 'app/styles';
import { focusFree } from 'app/utils';

const firstBoxBorderRaius = {
  borderTopRightRadius: '2px',
  borderTopLeftRadius: '2px'
};

const lastBoxBorderRaius = {
  marginBottom: '0',
  borderBottomRightRadius: '2px',
  borderBottomLeftRadius: '2px'
};

export const cardInputGroup = css({
  marginBottom: '10px'
});

export const cardInputBoxCommonStyle: {} = {
  ...resetLayout,
  boxSizing: 'border-box',
  position: 'relative',
  marginBottom: '-1px',
  padding: '6px 10px 10px',
  paddingBottom: '10px',
  background: 'white',
  lineHeight: '20px',
  '&:first-child': firstBoxBorderRaius,
  '&:last-child': lastBoxBorderRaius
};

export const cardInputBox = css(cardInputBoxCommonStyle);

export const cardInputBox60 = css({
  ...cardInputBoxCommonStyle,
  height: '60px'
});

export const cardInputBoxAgreeToTerms = css({
  ...cardInputBoxCommonStyle,
  ...flexSpaceBetween,
  padding: '7px 7px 7px 10px'
});

export const cardInputBoxInlineGroup = css({
  display: 'flex',
  width: '100%',
  marginBottom: '-1px'
});

export const cardInputBoxInline = css({
  ...cardInputBoxCommonStyle,
  height: '60px',
  flexBasis: '51%',
  marginRight: '-1px',
  marginBottom: '0',
  borderRadius: '0',
  '&:last-child': {
    marginRight: '0'
  }
});

export const cardInputBoxLabel = css({
  ...resetLayout,
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  paddingBottom: '8px',
  color: '#384252',
  fontSize: '12px',
  lineHeight: '15px'
});

const innerInputPlaceholderStyle = {
  color: '#9eafbf',
  fontFamily: defaultFontFamily,
  fontSize: '15px',
  verticalAlign: 'top'
};

export const innerInput = css({
  ...resetLayout,
  boxSizing: 'border-box',
  display: 'inline-block',
  width: '100%',
  height: '20px',
  border: 'none',
  caretColor: '#1f8ce6',
  fontFamily: museoSansFontFamily,
  fontSize: '17px',
  lineHeight: '20px',
  zIndex: '3',
  '&::-ms-clear': {
    width: '0',
    height: '0'
  },
  '&::placeholder': innerInputPlaceholderStyle,
  '&:-internal-input-suggested, &:-webkit-autofill': {
    fontFamily: museoSansFontFamily,
    fontSize: '17px'
  }
} as {});

export const innerInputJust = css({
  width: '30px'
});

export const innerInputObscured = css({
  fontFamily: securityFontFamily,
  fontSize: '19px' /* temporary until making cutom securityFont */
});

export const innerInputPlaceholder = css(innerInputPlaceholderStyle);

const cardInputBoxBorderCommonStyle: {} = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  border: 'solid 1px #d6e3f0',
  pointerEvents: 'none',
  [`.${cardInputBox}:first-child &`]: firstBoxBorderRaius,
  [`.${cardInputBox60}:first-child &`]: firstBoxBorderRaius,
  [`.${cardInputBox}:last-child &`]: lastBoxBorderRaius,
  [`.${cardInputBox60}:last-child &`]: lastBoxBorderRaius
};

export const cardInputBoxBorder = css(cardInputBoxBorderCommonStyle);

export const cardInputBoxBorderInteractive = css({
  ...cardInputBoxBorderCommonStyle,
  [`
    .${cardInputBox}:hover &, 
    .${cardInputBox60}:hover &, 
    .${cardInputBoxInline}:hover &
  `]: {
    [breakpoints.mouseDevice]: {
      borderColor: '#9ea7ad',
      zIndex: '1'
    }
  },
  [`
    .${innerInput}:focus ~ &, 
    .${innerInput}:focus:hover ~ &
  `]: {
    borderColor: '#1f8ce6',
    zIndex: '2'
  }
} as {});

export const expDateDelimiter = css({
  display: 'inline-block',
  width: '14px',
  color: '#9eafbf',
  fontFamily: museoSansFontFamily,
  fontSize: '17px',
  lineHeight: '20px',
  verticalAlign: '0'
});

const ruiCheckboxLabelClass = 'RUICheckBox_Label';
export const agreeToTermsCheckbox = css({
  [`& .${ruiCheckboxLabelClass}`]: {
    padding: '8px 8px 8px 28px',
    fontSize: '14px',
    lineHeight: '14px',
    zIndex: '3',
    '&::before': {
      top: '50%',
      marginTop: '-9px'
    },
    '& .RUICheckBox_SVGIcon': {
      top: '50%'
    },
    [breakpoints.mouseDevice]: {
      '&:hover': {
        color: '#40474d'
      }
    },
    [`.${focusFree} &::before`]: {
      boxShadow: 'none'
    }
  },
  [`.RUICheckBox_Input:not(:checked) + .${ruiCheckboxLabelClass}:hover::before`]: {
    borderColor: '#d1d5d9'
  },
  [`.RUICheckBox_Input:checked + .${ruiCheckboxLabelClass}`]: {
    fontWeight: '700'
  }
} as {});
