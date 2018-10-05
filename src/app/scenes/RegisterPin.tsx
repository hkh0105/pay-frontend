import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { history } from 'app/config';
import { PinForm, PinFormOnSubmit, PinFormProps } from 'app/services/pin/components/PinForm';
import { PinList } from 'app/services/pin/components/PinInputGroup';
import { requestPinRegistration, requestPinValidation } from 'app/services/pin/requests';
import { requestRegisterPin } from 'app/services/user/userRequests';
import { Omit } from 'app/types';
import { connect } from 'react-redux';
import { runInThisContext } from 'vm';


type RegisterPinSteps = 'newPassword' | 'newPasswordConfirm'
export interface SetPinState {
  currentStep: RegisterPinSteps;
  isFetching: boolean;
  pinList: PinList;
  currentPin?: string;
}

export class RegisterPin extends React.Component<{}, SetPinState> {
  public static pinFormPropsForSteps: Record<RegisterPinSteps, Omit<NonNullable<PinFormProps>, 'onSubmitPin' | 'pinList' | 'onChange'>> = {
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
    pinList: [],
  }

  private handlePinFormChange = (pinList: PinList) => {
    if (this.state.isFetching) {
      return;
    }
    this.setState({ pinList })
  }

  private handleSubmitPin: PinFormOnSubmit = (pinList) => {
    const pin = pinList.join('');
    if (this.state.isFetching) {
      return;
    }
    if (this.state.currentStep === 'newPassword') {
      this.setState({ currentStep: 'newPasswordConfirm', currentPin: pin, pinList: [] });
      return;
    }

    if (this.state.currentPin !== pin) {
      alert('비밀번호가 일치하지 않습니다.')
      this.setState({ currentStep: 'newPassword', currentPin: '', pinList: [] });
      return;
    }

    this.setState({ isFetching: true });

    return requestRegisterPin({ pin })
      .catch(() => {
        this.setState({ currentStep: 'newPassword', currentPin: '', isFetching: false, pinList: [] });
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
              pinList={this.state.pinList}
              onChange={this.handlePinFormChange}
            />
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};

export const ConnectedRegisterPin = connect(null, null)(RegisterPin);
