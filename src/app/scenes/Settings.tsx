import * as classNames from 'classnames';
import { css, cx } from 'emotion';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg';
import { sceneContents, SceneWrapper } from 'app/components';
import { CardPlate } from 'app/components/CardPlate';
import { SwtichButton } from 'app/components/SwitchButton';
import { CardIssuerCode } from 'app/constants/cards';
import { colors } from 'app/constants/colors';

const settingHorizontalPadding = css({
  paddingLeft: '15px',
  paddingRight: '15px',
})

const settingItem = css(settingHorizontalPadding, {
  backgroundColor: '#fff',
  border: `1px solid ${colors.lightsteelblue_20}`,
  borderLeft: 0,
  borderRight: 0,
  '& + &': {
    marginTop: '10px',
  }
})

const settingBackgroundDescriptionStyle = css(settingHorizontalPadding, {
  color: colors.bluegray_40,
  fontSize: '13px',
  lineHeight: '18px',
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
  width: '64px',
  fontSize: '11px',
})

interface State {
  isOneTouchEnabled: boolean;
}

export class Settings extends React.Component<{}, State> {
  public state: State = {
    isOneTouchEnabled: false,
  };

  public render() {
    return (
      <>
        <SceneWrapper>
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
                  <Button outline={true} color="gray" size="medium" className={deleteCardButton}>카드 삭제</Button>
                </div>
              </div>
              <div className={cardPlateWrapper}>
                <CardPlate
                  cardIssuerCode="CCCT"
                  cardNumber="1093 04** **** ****"
                />
              </div>
            </div>
            <div className={classNames(settingItem, settingDefaultItem)}>
              <h3 className={settingItemName}>원터치 결제 사용</h3>
              <div>
                <SwtichButton
                  isChecked={this.state.isOneTouchEnabled}
                  onChange={() => this.setState({ isOneTouchEnabled: !this.state.isOneTouchEnabled })}
                  id="oneTouchModeInput"
                />
              </div>
            </div>
            <p className={settingBackgroundDescriptionStyle}>비밀번호 입력 없이 바로 결제하는 기능입니다. <br/> 안전한 결제를 위해 10만원 초과 결제 시에는 비밀번호를 입력해주셔야 합니다.</p>
            <div className={classNames(settingItem, settingDefaultItem)}>
              <h3 className={settingItemName}>결제 비밀번호 변경</h3>
            </div>
            <p className={settingBackgroundDescriptionStyle}>비밀번호를 분실하신 경우 카드를 삭제하신 후 다시 등록해주세요.</p>
          </div>
        </SceneWrapper>
      </>
    );
  }
};
