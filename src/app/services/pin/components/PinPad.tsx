import { css } from 'emotion';
import * as React from 'react';

import { Icon } from '@ridi/rsg';
import { a11y, museoSansFontFamily, paperProStylesClassName, paperStylesClassName, resetFont, resetLayout } from 'app/styles';
import { PinButton } from './PinButton';

export enum PinButtonFunctionKey {
  delete = 'delete',
  clear = 'clear'
}

export type PinButtonValue = number | PinButtonFunctionKey;

export interface PinPadProps {
  clickKey: (key: PinButtonValue) => void;
}

export class PinPad extends React.Component<PinPadProps> {

  private renderNumberPinButtonTd = (number: number) => (
    <td className={styles.pinButtonTd} key={number}>
      <PinButton onClick={() => this.props.clickKey(number)}>
        <span className={styles.pinButtonNumber}>{number}</span>
      </PinButton>
    </td>
  )

  public render() {
    const { clickKey } = this.props;
    return (
      <table className={styles.pinButtonTable}>
        <tbody>
          <tr>
            {Array.from({ length: 3 }, (v, i) => i + 1).map(this.renderNumberPinButtonTd)}
          </tr>
          <tr>
            {Array.from({ length: 3 }, (v, i) => i + 4).map(this.renderNumberPinButtonTd)}
          </tr>
          <tr>
            {Array.from({ length: 3 }, (v, i) => i + 7).map(this.renderNumberPinButtonTd)}      
          </tr>
          <tr>
            <td className={styles.pinButtonTd}>    
              <PinButton onClick={() => clickKey(PinButtonFunctionKey.clear)}>
                <span className={styles.pinButtonKor}>취소</span>
              </PinButton>
            </td>
            {this.renderNumberPinButtonTd(0)}
            <td className={styles.pinButtonTd}>
              <PinButton onClick={() => clickKey(PinButtonFunctionKey.delete)}>
                <span className={a11y}>삭제</span>
                <Icon name="delete_1" className={styles.pinButtonDeleteIcon}/>
              </PinButton>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
} 

const borderStyle = 'solid 1px #475161';
const paperBorderStyle = 'solid 1px black';
const styles = {
  pinButtonTable: css({
    ...resetLayout,
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    tableLayout: 'fixed',
    background: '#9aa2b1',
    borderSpacing: '0',
    [`.${paperStylesClassName} &`]: {
      background: 'white',
      width: '360px',
      left: '50%',
      bottom: '23px',
      marginLeft: '-180px',
    },
    [`.${paperProStylesClassName} &`]: {
      width: '504px',
      bottom: '36x',
      marginLeft: '-252px',
    },
  }),
  pinButtonTd: css({
    ...resetLayout,
    height: '60px',
    borderRight: borderStyle,
    '&:last-child': {
      borderRight: 0,
    },
    'tr + tr &': {
      borderTop: borderStyle,
    },
    [`.${paperStylesClassName} tr:last-child &`]: {
      borderBottom: paperBorderStyle,
    },
    [`.${paperStylesClassName} &`]: {
      height: '62px',
      borderRight: 0,
      borderTop: paperBorderStyle,
    },
    [`.${paperProStylesClassName} &`]: {
      height: '88px',
    },
  }),
  pinButtonNumber: css({
    flex: 1, // You need this for flex childs for old iOS Safari T^T (iPhone5) 
    fontFamily: museoSansFontFamily,
    fontSize: '24px',
    color: 'inherit',
    [`.${paperStylesClassName} &`]: {
      ...resetFont,
      fontSize: '22px',
    },
    [`.${paperProStylesClassName} &`]: {
      fontSize: '30px',
      fontWeight: 900,
    },
  }),
  pinButtonKor: css({
    flex: 1,
    fontSize: '15px',
    fontWeight: 700,
    color: 'inherit',
    [`.${paperStylesClassName} &`]: {
      fontSize: '13px',
    },
    [`.${paperProStylesClassName} &`]: {
      fontSize: '18px',
      fontWeight: 900,
    },
  }),
  pinButtonDeleteIcon: css({
    flex: 1,
    width: '27px',
    height: '18px',
    fill: 'white',
    [`.${paperStylesClassName} &`]: {
      width: '36px',
      height: '24px',
      fill: 'black',
    },
    [`.${paperProStylesClassName} &`]: {
      width: '50px',
      height: '32px',
    },
  })
};