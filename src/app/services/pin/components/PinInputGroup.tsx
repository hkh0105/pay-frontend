import { css } from 'emotion';
import * as React from 'react';

import { PinInput } from 'app/services/pin/components/PinInput';
import { breakpoints, flexCenter, paperProStylesClassName, paperStylesClassName } from 'app/styles';

export interface PinInputGroupProps {
  pinList: number[];
}

const sixLengthArray = Array.from({ length: 6 });

export const PinInputGroup: React.SFC<PinInputGroupProps> = ({ pinList }) => {
  const currentFocusedIndex = pinList.length;
  return (
    <div className={styles.pinInputGroup}>
      {sixLengthArray.map((value, index) => (
        <PinInput 
          value={pinList[index]} 
          isFocused={index === currentFocusedIndex} 
          key={index}
        />
      ))}
    </div>
  )
}

const styles = {
  pinInputGroup: css({
    ...flexCenter,
    margin: '40px 0 60px',
    [breakpoints.pinPageSmallHeight]: {
      margin: '6vh 0'
    },
    [`.${paperStylesClassName} &`]: {
      margin: '20px 0 50px',
    },
    [`.${paperProStylesClassName} &`]: {
      margin: '40px 0 80px',      
    },
  }),
};