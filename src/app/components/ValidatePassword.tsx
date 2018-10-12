import * as classNames from 'classnames';
import * as React from 'react';

import { Button } from '@ridi/rsg';
import { colors } from 'app/constants/colors';
import { cardInputBox, cardInputBoxBorderInteractive, innerInput } from 'app/services/cards/components/CardForm.styles';
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
  fontSize: '22px',
  [mediaQueryForIE]: {
    fontSize: '10px',
    letterSpacing: 1,
  },
  [mediaQueryForIOS]: {
    fontSize: '10px',
    letterSpacing: 1,
  },
})

interface Props {
  password: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onSubmitButtonClick: (...args: any[]) => any;
}

export class ValidatePassword extends React.PureComponent<Props> {
  private isSubmitAvailable = () => this.props.password.length >= 6;

  private handlePasswordInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.isSubmitAvailable() || e.key !== 'Enter') {
      return;
    }
    this.props.onSubmitButtonClick();
  };

  private handleSubmitButtonClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.isSubmitAvailable()) {
      return;
    }
    this.props.onSubmitButtonClick();
  }

  public render() {
    return (
      <div>
        <h2 className={titleStyle}>리디북스 비밀번호 입력</h2>
        <p className={descriptionStyle}>10만원 초과 결제 시 비밀번호를 입력해주셔야 합니다.</p>
        <div className={formStyle}>
          <div className={cx(cardInputBox, formInputStyle)}>
            <input
              className={classNames(innerInput, inputStyle)}
              type="password"
              value={this.props.password}
              onChange={this.props.onChange}
              onKeyPress={this.handlePasswordInputKeyPress}
              disabled={this.props.isSubmitting}
            />
            <div className={cx(cardInputBoxBorderInteractive, formInputInteractiveStyle)} />
          </div>
          <Button
            className={formSubmitButtonstyle}
            color="blue"
            disabled={!this.isSubmitAvailable()}
            onClick={this.handleSubmitButtonClick}
            spinner={this.props.isSubmitting}
          >확인</Button>
        </div>
      </div>
    );
  }
};
