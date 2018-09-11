import { flexCenter, paperProStylesClassName, paperStylesClassName, resetButton } from 'app/styles';
import { css } from 'emotion';
import * as React from 'react';

export const FindPin: React.SFC = () => (
  <div className={styles.findPinDiv}>
    <button
      className={styles.findPinButton}
      onClick={() => alert('비밀번호를 분실하신 경우\n카드를 삭제하신 후 다시 등록해주세요.')}
    >
      비밀번호를 잊으셨나요?
    </button>
  </div>
);

const styles = {
  findPinDiv: css({
    ...flexCenter,  
  }),
  findPinButton: css({
    ...resetButton,
    width: '140px',
    height: '30px',
    borderRadius: '2px',
    backgroundColor: '#f2f6fc',
    border: 'solid 1px #ccd9e6',
    fontSize: '12px',
    color: '#738096',
    [`.${paperStylesClassName} &`]: {
      width: 'auto',
      height: 'auto',
      paddingBottom: '5px',
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: '19px',
      background: 'none',
      border: 'none',
      borderBottom: 'dotted 2px black',
      color: 'black',
    },
    [`.${paperProStylesClassName} &`]: {
      fontSize: '16px',
      lineHeight: '24px',
      paddingBottom: '8px',
    }
  }),
};