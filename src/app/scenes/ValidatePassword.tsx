import * as classNames from 'classnames';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg';
import { ConnectedSceneWrapper } from 'app/components';
import { colors } from 'app/constants/colors';
import { cardInputBox, cardInputBoxBorderInteractive, innerInput } from 'app/services/cards/components/CardForm.styles';
import { postConfirmPassword } from 'app/services/settings/requests';
import { mediaQueryForIE, mediaQueryForIOS } from 'app/styles/mediaQueries';
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
});

const formStyle = css({
  display: 'flex',
  margin: '40px 40px 0',
});

const formInputStyle = css({
  flex: '1',
  padding: '8px 10px 10px',
  height: '40px',
});

const formInputInteractiveStyle = css({
  borderRadius: '2px',
});

const formSubmitButtonstyle = css({
  display: 'inline-block',
  width: '60px',
  marginLeft: '6px',
})

const inputStyle = css({
  [mediaQueryForIE]: {
    fontSize: '11px',
  },
  [mediaQueryForIOS]: {
    fontSize: '13px',
  },
})

interface State {
  password: string;
  isSubmitting: boolean;
}

export class ValidatePassword extends React.PureComponent<{}, State> {
  public state: State = {
    password: '',
    isSubmitting: false,
  }

  private isSubmitAvailable = () => this.state.password.length >= 6;

  private handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  private handlePasswordInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.isSubmitAvailable() || e.key !== 'Enter') {
      return;
    }
    this.submit();
  };

  private handleSubmitButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!this.isSubmitAvailable()) {
      return;
    }
    this.submit();
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
      this.setState({ isSubmitting: false, password: '' });
    } catch (e) {
      alert(e);
      this.setState({ isSubmitting: false });
    }
  }

  public render() {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>리디북스 비밀번호 입력 - 리디페이</title>
        </Helmet>
        <div>
          <h2 className={titleStyle}>리디북스 비밀번호 입력</h2>
          <p className={descriptionStyle}>10만원 초과 결제 시 비밀번호를 입력해주셔야 합니다.</p>
          <div className={formStyle}>
            <div className={cx(cardInputBox, formInputStyle)}>
              <input
                className={classNames(innerInput, inputStyle)}
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordInputChange}
                onKeyPress={this.handlePasswordInputKeyPress}
                disabled={this.state.isSubmitting}
              />
              <div className={cx(cardInputBoxBorderInteractive, formInputInteractiveStyle)} />
            </div>
            <Button
              className={formSubmitButtonstyle}
              color="blue"
              disabled={!this.isSubmitAvailable()}
              onClick={this.handleSubmitButtonClick}
              spinner={this.state.isSubmitting}
            >확인</Button>
          </div>
        </div>
      </ConnectedSceneWrapper>
    );
  }
};
