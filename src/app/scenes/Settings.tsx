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
import { Link } from 'react-router-dom';

const settingHorizontalPadding = css({
  paddingLeft: '15px',
  paddingRight: '15px',
})

const settingItem = css(settingHorizontalPadding, {
  backgroundColor: '#fff',
  border: 0,
  '& + &': {
    marginTop: '10px',
    borderTop: `1px solid ${colors.lightsteelblue_20}`,
  }
})

const settingDescriptionWrapper = css(settingHorizontalPadding, {
  color: colors.bluegray_40,
  fontSize: '13px',
  lineHeight: '18px',
  margin: '10px 0',
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

interface State {
  isOneTouchEnabled: boolean;
  cardIssuerCode: CardIssuerCode | null;
}

export class Settings extends React.Component<{}, State> {
  public state: State = {
    isOneTouchEnabled: false,
    cardIssuerCode: 'CCCT',
  };

  private handleDeleteCardButtonClick = () => {
    // TODO: Should use <Popup />
    if (!confirm('카드를 삭제하시겠습니까?')) {
      return;
    }
    this.setState({ cardIssuerCode: null });
  }

  public render() {
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>설정 - 리디페이</title>
          </Helmet>
          <div>
            <div className={classNames(settingItem, settingCardItem)}>
              <div className={settingCardItemBody}>
                <div className={settingCardItemBodyLeft}>
                  <h3 className={settingItemName}>내 카드</h3>
                  <p className={settingItemDescription}>카드는 1개만 등록 가능합니다.</p>
                </div>
                <div>
                  {this.state.cardIssuerCode
                    ? (
                      <Button
                        outline={true}
                        color="gray"
                        size="medium"
                        className={deleteCardButton}
                        onClick={this.handleDeleteCardButtonClick}
                      >카드 삭제</Button>
                    )
                    : (
                      <Button
                        color="blue"
                        size="medium"
                        className={addCardButton}
                        // TODO: Should fix Button interface...
                        component={Link as any}
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
                  cardIssuerCode={this.state.cardIssuerCode}
                  cardNumber="1093 04** **** ****"
                />
              </div>
            </div>
            <div className={classNames(settingItem, settingDefaultItem)}>
              <h3 className={settingItemName}>원터치 결제 사용</h3>
              <div className={settingSwitchButtonWrapper}>
                <SwtichButton
                  isChecked={this.state.isOneTouchEnabled}
                  onChange={() => this.setState({ isOneTouchEnabled: !this.state.isOneTouchEnabled })}
                  id="oneTouchModeInput"
                />
              </div>
            </div>
            <div className={settingDescriptionWrapper}>
              <p>비밀번호 입력 없이 바로 결제하는 기능입니다.</p>
              <p>안전한 결제를 위해 10만원 초과 결제 시에는 비밀번호를 입력해주셔야 합니다.</p>
            </div>
            <div className={classNames(settingItem, settingDefaultItem)}>
              <h3 className={settingItemName}>결제 비밀번호 변경</h3>
            </div>
            <div className={settingDescriptionWrapper}>비밀번호를 분실하신 경우 카드를 삭제하신 후 다시 등록해주세요.</div>
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};
