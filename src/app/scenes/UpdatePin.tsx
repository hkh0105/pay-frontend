import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { history } from 'app/config';
import { PinForm, PinFormOnSubmit, PinFormProps } from 'app/services/pin/components/PinForm';
import { PinList } from 'app/services/pin/components/PinInputGroup';
import { requestPinRegistration, requestPinValidation } from 'app/services/pin/requests';
import { requestRegisterPin, requestUpdatePin, requestValidatePin } from 'app/services/user/userRequests';
import { ValidatePinResponse } from 'app/services/user/userTypes';
import { Omit } from 'app/types';
import { AxiosResponse } from 'axios';

type UpdatePinSteps = 'currentPassword' | 'newPassword' | 'newPasswordConfirm'

export interface SetPinState {
  currentStep: UpdatePinSteps;
  isFetching: boolean;
  pinList: PinList;
  validationToken?: string;
  currentPin?: string;
  newPin?: string;
}

export interface SetPinProps {
  isFirstTimeSetting: boolean;
  userId: string;
}

export class UpdatePin extends React.Component<SetPinProps, SetPinState> {
  public static pinFormPropsForSteps: Record<UpdatePinSteps, Omit<NonNullable<PinFormProps>, 'onSubmitPin' | 'pinList' | 'onChange'>> = {
    currentPassword: {
      title: '현재 비밀번호 입력',
      showFindPin: true,
    },
    newPassword: {
      title: '결제 비밀번호 설정',
      description: '숫자 6자리를 입력해주세요.',
      showFindPin: false,
    },
    newPasswordConfirm: {
      title: '결제 비밀번호 설정',
      description: '한번 더 입력해주세요.',
      showFindPin: false,
    },
  };

  public state: SetPinState = {
    currentStep: 'currentPassword',
    isFetching: false,
    pinList: [],
  }

  private handlePinFormChange = (pinList: PinList) => {
    if (this.state.isFetching) {
      return;
    }
    this.setState({ pinList })
  }

  private handleSubmitPin: PinFormOnSubmit = async (pinList) => {
    const pin = pinList.join('');
    if (this.state.isFetching) {
      return;
    }
    if (this.state.currentStep === 'currentPassword') {
      this.setState({ isFetching: true });
      try {
        const res: AxiosResponse<ValidatePinResponse> = await requestValidatePin({ pin })
        this.setState({
          isFetching: false,
          validationToken: res.data.validation_token,
          currentStep: 'newPassword',
          currentPin: pin,
          pinList: [],
        });
      } catch (e) {
        alert(e.data.message);
        this.setState({ isFetching: false, pinList: [] });
      }
      return;
    } else if (this.state.currentStep === 'newPassword') {
      if (this.state.currentPin === pin) {
        alert('현재 비밀번호와 동일합니다.');
        this.setState({ pinList: [] });
        return;
      }
      this.setState({ currentStep: 'newPasswordConfirm', newPin: pin, pinList: [] });
      return;
    } else if (this.state.currentStep === 'newPasswordConfirm') {
      if (this.state.newPin !== pin) {
        alert('입력한 비밀번호가 다릅니다.\n다시 입력해주세요.');
        this.setState({ currentStep: 'newPassword', newPin: '', pinList: [] });
        return;
      }

      this.setState({ isFetching: true });

      try {
        await requestUpdatePin({ pin, validation_token: this.state.validationToken! })
        alert('결제 비밀번호 변경이 완료되었습니다.');
        history.replace('/settings');
        return;
      } catch (e) {
        alert(e.data.message);
        this.setState({ currentStep: 'newPassword', newPin: '', isFetching: false, pinList: [] });
        return;
      }
    }
    throw new Error('Unexpected step given');
  }

  public render() {
    const { currentStep } = this.state;
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>결제 비밀번호 변경 - 리디페이</title>
          </Helmet>
          <div className={sceneContents}>
            <PinForm
              {...UpdatePin.pinFormPropsForSteps[currentStep]}
              isSubmitting={this.state.isFetching}
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
