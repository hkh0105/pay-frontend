import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg';
import { SceneWrapper } from 'app/components';
import { colors } from 'app/constants/colors';
import { cardInputBox, cardInputBoxBorderInteractive, innerInput } from 'app/services/cards/components/CardForm.styles';
import { postConfirmPassword } from 'app/services/settings/requests';
import { css, cx } from 'emotion';

const titleStyle = css({
  fontSize: '18px',
  letterSpacing: '-0.4px',
  textAlign: 'center',
  marginTop: '80px',
});

const descriptionStyle = css({
  color: colors.bluegray_40,
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '22px',
});

const formStyle = css({
  margin: '40px 40px 0',
});

const buttonStyle = css({
  display: 'block',
  width: '200px',
  margin: '0 auto',
  fontSize: '16px',
  '& + &': {
    marginTop: '8px',
  },
})

interface State {
  isSubmitting: boolean;
}

export class SetOnetouch extends React.PureComponent<{}, State> {
  public state: State = {
    isSubmitting: false,
  }

  private handleEnableButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.submit();
  }


  private handleSkipButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // TODO: Replace current page
  }

  private submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });

    try {
      await postConfirmPassword();
      // TODO: Perform further action here
      alert('Confirmed!');
      this.setState({ isSubmitting: false });
    } catch (e) {
      alert(e);
      this.setState({ isSubmitting: false });
    }
  }

  public render() {
    return (
      <SceneWrapper>
        <Helmet>
          <title>원터치 결제 설정 - 리디페이</title>
        </Helmet>
        <div>
          <h2 className={titleStyle}>원터치 결제를 사용하시겠습니까?</h2>
          <p className={descriptionStyle}>원터치 결제는 등록하신 카드로<br/><strong>비밀번호 입력 없이 바로 결제</strong>하는 기능입니다.</p>
          <div className={formStyle}>
            <Button
              className={buttonStyle}
              size="large"
              color="blue"
              disabled={this.state.isSubmitting}
              onClick={this.handleEnableButtonClick}
              spinner={this.state.isSubmitting}
              >원터치 결제 사용</Button>
            <Button
              className={buttonStyle}
              size="large"
              color="gray"
              outline={true}
              disabled={this.state.isSubmitting}
              onClick={this.handleSkipButtonClick}
            >사용 안함</Button>

          </div>
        </div>
      </SceneWrapper>
    );
  }
};
