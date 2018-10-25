import { Popup } from '@ridi/rsg';
import { history } from 'app/config';
import { colors } from 'app/constants/colors';
import { urls } from 'app/routes';
import { flexCenter, paperProStylesClassName, paperStylesClassName, resetButton } from 'app/styles';
import { css } from 'emotion';
import * as React from 'react';

interface State {
  isPopupOpened: boolean;
}

export class FindPin extends React.PureComponent<{}, State> {
  public state: State = {
    isPopupOpened: false,
  }
  public render() {
    const { isPopupOpened } = this.state;
    return (
      <div className={styles.findPinDiv}>
        <button
          className={styles.findPinButton}
          onClick={() => this.setState({ isPopupOpened: true })}
        >
          비밀번호를 잊으셨나요?
        </button>
        <Popup
          title="비밀번호 분실"
          active={isPopupOpened}
          useButtons={true}
          onCancel={() => this.setState({ isPopupOpened: false })}
          onConfirm={() => history.push(urls.SETTINGS)}
          cancelButtonName="닫기"
          confirmButtonName="카드 관리"
          showFooterHr={false}
        >
          <div className={styles.popupContent}>
            비밀번호를 분실하신 경우<br/>
            <strong>카드를 삭제하신 후 다시 등록</strong>해주세요.
          </div>
        </Popup>
      </div>
    )
  };
}

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
  popupContent: css({
    marginTop: '40px',
    marginBottom: '30px',
    lineHeight: '23px',
    fontSize: '15px',
    textAlign: 'center',
    color: colors.slategray_60,
  }),
};