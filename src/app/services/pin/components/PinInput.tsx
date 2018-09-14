import * as classNames from 'classnames';
import { css } from 'emotion';
import * as React from 'react';

import { Icon } from '@ridi/rsg';
import { paperProStylesClassName, paperStylesClassName } from 'app/styles';

export interface PinInputProps {
  value: number;
  isFocused: boolean;
}

export const PinInput: React.SFC<PinInputProps> = ({ value, isFocused }) => (
  <span 
    className={classNames(
      styles.pinInput,
      {
        [styles.pinInputFocused]: isFocused,
        [styles.pinInputFilled]: Number.isInteger(value),
      }
    )}
  >
    {
      Number.isInteger(value) && 
      <Icon name="asterisk" className={styles.pinInputIcon} />
    }
  </span>
)

const styles = {
  pinInput: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fefefe',
    borderRadius: '2px',
    width: '28px',
    height: '28px',
    border: 'solid 1px #d6e3f0',
    margin: '0 3px',
    [`.${paperStylesClassName} &`]: {
      width: '36px',
      height: '36px',
      borderRadius: '3px',
      border: 'solid 2px black',
    },
    [`.${paperProStylesClassName} &`]: {
      width: '42px',
      height: '42px',
    }
  }),
  pinInputFocused: css({
    borderColor: '#1f8ce6',
    [`.${paperStylesClassName} &`]: {
      borderColor: 'black',
    }
  }),
  pinInputFilled: css({
    borderColor: '#1f8ce6',
    backgroundColor: '#1f8ce6',
    [`.${paperStylesClassName} &`]: {
      borderColor: 'black',
      backgroundColor: 'black',
    }
  }),
  pinInputIcon: css({
    width: '10px',
    height: '10px',
    fill: 'white',
    [`.${paperStylesClassName} &`]: {
      width: '14px',
      height: '14px',
    },
    [`.${paperProStylesClassName} &`]: {
      width: '18px',
      height: '18px',
    }
  }),
};