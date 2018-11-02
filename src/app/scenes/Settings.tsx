import * as classNames from 'classnames';
import { css, cx } from 'emotion';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button, ButtonProps, Icon, Popup } from '@ridi/rsg';
import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { CardPlate } from 'app/components/CardPlate';
import { SwtichButton } from 'app/components/SwitchButton';
import { history } from 'app/config';
import { CardIssuerCode } from 'app/constants/cards';
import { colors } from 'app/constants/colors';
import { urls } from 'app/routes';
import { UserActions } from 'app/services/user/userActions';
import { DeleteCardRequestPayload, OnetouchToggleRequestPaylaod } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { rsgPopupCommonStyle } from 'app/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

const settingWrapper = css({
  backgroundColor: '#f2f6fc',
});

const settingHorizontalPadding = css({
  paddingLeft: '15px',
  paddingRight: '15px',
})

const settingItem = css(settingHorizontalPadding, {
  backgroundColor: '#fff',
  border: 0,
  borderBottom: `1px solid ${colors.lightsteelblue_20}`,
  '& + &': {
    marginTop: '10px',
  }
})

const settingDescriptionWrapper = css(settingHorizontalPadding, {
  color: colors.bluegray_40,
  fontSize: '13px',
  lineHeight: '18px',
  padding: '10px 15px',
  'p': {
    margin: 0,
  },
  'p + p': {
    marginTop: '4px',
  },
})

const settingCardItem = css({
  paddingTop: '20px',
  paddingBottom: '30px',
})

const settingDefaultItem = css({
  display: 'flex',
  height: '52px',
  lineHeight: '52px',
  borderTop: `1px solid ${colors.lightsteelblue_20}`,
  textDecoration: 'none',
  color: 'inherit',
})

const settingsDefaultItemDisabled = css({
  color: colors.slategray_50,
})

const settingItemName = css({
  fontSize: '15px',
  fontWeight: 'bold',
  margin: 0,
  flex: 1,
})

const settingItemDescription = css({
  fontSize: '13px',
  lineHeight: '19px',
  margin: '4px 0 0 0',
  color: colors.bluegray_40,
})

const settingSwitchButtonWrapper = css({
  lineHeight: '48px',
})

const settingCardItemBody = css({
  display: 'flex',
})

const settingCardItemBodyLeft = css({
  flex: 1,
})

const cardPlateWrapper = css({
  marginTop: '20px',
})

const deleteCardButton = css({
  display: 'inline-block',
  width: '64px',
  fontSize: '11px',
})

const addCardButton = css({
  display: 'inline-block',
  width: '78px',
  fontSize: '11px',
})

const addCardIcon = css({
  width: '9px',
  height: '9px',
  marginRight: '5px',
  fill: '#fff',
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface State {
  isConfirmDeletionPopupOpened: boolean;
}

export class Settings extends React.Component<Props, State> {
  public state: State = {
    isConfirmDeletionPopupOpened: false,
  }

  private renderConfrimCardDeletionPopup = () => {
    const { cards } = this.props.user;
    const { isConfirmDeletionPopupOpened } = this.state;
    if (!cards.length) {
      return;
    }
    return (
      <Popup
        title="카드 삭제"
        active={isConfirmDeletionPopupOpened}
        useButtons={true}
        onCancel={() => this.setState({ isConfirmDeletionPopupOpened: false })}
        onConfirm={() => {
          this.setState({ isConfirmDeletionPopupOpened: false });
          this.props.requestDeleteCard({ payment_method_id: cards[0]!.payment_method_id });
        }}
        cancelButtonName="취소"
        confirmButtonName="카드 삭제"
        showFooterHr={false}
        contentClassName={rsgPopupCommonStyle}
      >
        <div className={s.confirmDeletioPopupBody}>
          <h3 className={s.confirmDeletionPopupHeading}><Icon name="exclamation_3" className={s.confirmDeletionPopupIcon} />카드를 삭제하시겠습니까?</h3>
          {cards[0]!.subscriptions.length > 0 && (
            <p className={s.confirmDeletionPopupDescription}>카드 삭제 시 <strong>{cards[0]!.subscriptions.join(', ')}</strong>이 해지 예약됩니다.</p>
          )}
        </div>
      </Popup>
    )
  }

  private getCardActionButtonProps = (): ButtonProps => {
    const { cards, isDeletingCardFetching } = this.props.user;
    return cards.length
      ? {
        outline: true,
        color: "gray",
        size: "medium",
        className: deleteCardButton,
        spinner: isDeletingCardFetching,
        onClick: () => {
          if (!isDeletingCardFetching) {
            this.setState({ isConfirmDeletionPopupOpened: true })
          }
        },
        children: '카드 삭제',
      }
      : {
        color: "blue",
        size: "medium",
        className: addCardButton,
        component: Link,
        to: urls.REGISTER_CARD,
        children: <>
          <Icon name="plus_1" className={addCardIcon} />
          카드 등록
        </>
      };
  }

  private handleOnetouchSwitchButtonClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.user.isOnetouchTogglingFetching) {
      return;
    }
    if (e.target.checked) {
      e.preventDefault();
      history.push(urls.ENABLE_ONETOUCH);
      return;
    } else {
      this.props.requestToggleOnetouch({ enable_onetouch_pay: false });
    }
  }

  public render() {
    const { cards, isUsingOnetouchPay, isDeletingCardFetching, hasPin } = this.props.user;
    const { isConfirmDeletionPopupOpened } = this.state;
    const isOnetouchPayNotSet = isUsingOnetouchPay === null;
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>설정 - 리디페이</title>
          </Helmet>
          <div className={settingWrapper}>
            <div className={classNames(settingItem, settingCardItem)}>
              <div className={settingCardItemBody}>
                <div className={settingCardItemBodyLeft}>
                  <h3 className={settingItemName}>내 카드</h3>
                  <p className={settingItemDescription}>카드는 1개만 등록 가능합니다.</p>
                </div>
                <div>
                  <Button {...this.getCardActionButtonProps()} />
                </div>
              </div>
              {this.renderConfrimCardDeletionPopup()}
              <div className={cardPlateWrapper}>
                <CardPlate
                  card={cards.length ? cards[0] : undefined}
                />
              </div>
            </div>
            <div className={classNames(settingItem, settingDefaultItem, isOnetouchPayNotSet && settingsDefaultItemDisabled)}>
              <h3 className={settingItemName}>원터치 결제 사용</h3>
              {!isOnetouchPayNotSet && <div className={settingSwitchButtonWrapper}>
                <SwtichButton
                  isChecked={isUsingOnetouchPay || false}
                  onChange={this.handleOnetouchSwitchButtonClick}
                  id="oneTouchModeInput"
                />
              </div>}
            </div>
            <div className={settingDescriptionWrapper}>
              <p>10만원 미만 결제 시 비밀번호 입력 없이 바로 결제하는 기능입니다.</p>
            </div>
            <Link
              className={classNames(settingItem, settingDefaultItem, !hasPin && settingsDefaultItemDisabled)}
              to={!hasPin ? '' : '/settings/pin/update'}
              onClick={e => !hasPin && e.preventDefault()}
            >
              <h3 className={settingItemName}>결제 비밀번호 변경</h3>
            </Link>
            <div className={settingDescriptionWrapper}>비밀번호를 분실하신 경우 카드를 삭제하신 후 다시 등록해주세요.</div>
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestDeleteCard: (payload: DeleteCardRequestPayload) => dispatch(UserActions.deleteCardRequest(payload)),
    requestToggleOnetouch: (payload: OnetouchToggleRequestPaylaod) => dispatch(UserActions.toggleOnetouchRequest(payload))
  }
}

export const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

const s = {
  confirmDeletioPopupBody: css({
    padding: '40px 0 30px',
    margin: '0 auto',
    textAlign: 'center',
  }),
  confirmDeletionPopupIcon: css({
    width: '17px',
    height: '17px',
    fill: colors.slategray_60,
    marginRight: '6px',
  }),
  confirmDeletionPopupHeading: css({
    margin: 0,
    fontSize: '18px',
  }),
  confirmDeletionPopupDescription: css({
    color: colors.slategray_60,
    lineHeight: '23px',
    margin: '14px 0 0 0',
    fontSize: '15px',
    wordBreak: 'keep-all',
    padding: '0 20px',
  }),
}