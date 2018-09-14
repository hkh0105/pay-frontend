import { flexCenter, paperStylesClassName, resetButton } from 'app/styles';
import { css } from 'emotion';
import * as React from 'react';

export interface PinButtonProps {
  onClick: () => void; 
}

export const PinButton: React.SFC<PinButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.pinButton}>
    {children}
  </button>
)

const styles = {
  pinButton: css({
    ...resetButton,
    ...flexCenter,
    // textAlign: 'center',
    backgroundColor: '#59667a',
    width: '100%',
    height: '100%',
    color: 'white',
    touchAction: 'manipulation',
    '&:active': {
      backgroundColor: '#505b6d',
    },
    [`.${paperStylesClassName} &`]: {
      backgroundColor: 'white',
      color: 'black',
      fontWeight: 700,
    }
  }),
};