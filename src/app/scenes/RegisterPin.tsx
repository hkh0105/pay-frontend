import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { history } from 'app/config';
import { PinForm, PinFormOnSubmit, PinFormProps } from 'app/services/pin/components/PinForm';
import { requestPinRegistration, requestPinValidation } from 'app/services/pin/requests';
import { requestRegisterPin } from 'app/services/user/userRequests';
import { Omit } from 'app/types';
import { connect } from 'react-redux';


type RegisterPinSteps = 'newPassword' | 'newPasswordConfirm'
export interface SetPinState {
  currentStep: RegisterPinSteps;
  isFetching: boolean;
  currentPin?: string;
}

export interface SetPinProps {}

export class RegisterPin extends React.Component<SetPinProps, SetPinState> {
  public static pinFormPropsForSteps: Record<RegisterPinSteps, Omit<NonNullable<PinFormProps>, 'onSubmitPin'>> = {
    newPassword: {
      title: '결제 비밀번호 설정',
      description: '숫자 6자리를 입력해주세요.',
    },
    newPasswordConfirm: {
      title: '결제 비밀번호 설정',
      description: '한번 더 입력해주세요.',
    },
  };

  public state: SetPinState = {
    currentStep: 'newPassword',
    isFetching: false,
  }

  private handleSubmitPin: PinFormOnSubmit = (pin, resetPinList) => {
    if (this.state.currentStep === 'newPassword') {
      resetPinList();
      this.setState({ currentStep: 'newPasswordConfirm', currentPin: pin.join('') });
      return;
    }

    const currentPin = pin.join('');
    if (this.state.currentPin !== currentPin) {
      alert('비밀번호가 일치하지 않습니다.')
      resetPinList();
      this.setState({ currentStep: 'newPassword', currentPin: '' });
      return;
    }

    this.setState({ isFetching: true });

    return requestRegisterPin({ pin: currentPin })
      .catch(() => {
        resetPinList();
        this.setState({ currentStep: 'newPassword', currentPin: '', isFetching: false });
      })
      .then(() => {
        alert('RIDI Pay 카드 등록이 완료되었습니다.');
        // TODO: Redirect to where users were from (e.g. checkout page)
        history.push('/settings');
      });
  }

  public render() {
    const { currentStep } = this.state;
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>결제 비밀번호 설정 - 리디페이</title>
          </Helmet>
          <div className={sceneContents}>
            <PinForm
              {...RegisterPin.pinFormPropsForSteps[currentStep]}
              isSubmitting={currentStep === 'newPasswordConfirm' && this.state.isFetching}
              onSubmitPin={this.handleSubmitPin}
            />
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};

export const ConnectedRegisterPin = connect(null, null)(RegisterPin);
