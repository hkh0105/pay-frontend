import * as classNames from 'classnames';
import { css, cx } from 'emotion';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button, Icon } from '@ridi/rsg';
import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { CardPlate } from 'app/components/CardPlate';
import { SwtichButton } from 'app/components/SwitchButton';
import { CardIssuerCode } from 'app/constants/cards';
import { colors } from 'app/constants/colors';
import { UserActions } from 'app/services/user/userActions';
import { DeleteCardRequestPayload, OnetouchToggleRequestPaylaod } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
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

export class Settings extends React.Component<Props> {
  private handleDeleteCardButtonClick = () => {
    if (this.props.user.isDeletingCardFetching) {
      return;
    }
    if (!confirm('카드를 삭제하시겠습니까?')) {
      return;
    }
    this.props.requestDeleteCard({ payment_method_id: this.props.user.cards[0]!.payment_method_id });
  }

  public render() {
    const { cards, isUsingOnetouchPay, isDeletingCardFetching, hasPin } = this.props.user;
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
                  {cards.length
                    ? (
                      <Button
                        outline={true}
                        color="gray"
                        size="medium"
                        className={deleteCardButton}
                        spinner={isDeletingCardFetching}
                        onClick={this.handleDeleteCardButtonClick}
                      >카드 삭제</Button>
                    )
                    : (
                      <Button
                        color="blue"
                        size="medium"
                        className={addCardButton}
                        component={Link}
                        to="/settings/cards/add"
                      >
                        <Icon name="plus_1" className={addCardIcon} />
                        카드 등록
                      </Button>
                    )
                  }
                </div>
              </div>
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
                  onChange={(e) => {
                    if (!this.props.user.isOnetouchTogglingFetching) {
                      this.props.requestToggleOnetouch({ enable_onetouch_pay: e.target.checked });
                    }
                  }}
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