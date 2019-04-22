import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { history } from 'app/config';
import { urls } from 'app/routes';
import { PinForm, PinFormOnSubmit, PinFormProps } from 'app/services/pin/components/PinForm';
import { PinList } from 'app/services/pin/components/PinInputGroup';
import { requestPinRegistration, requestPinValidation } from 'app/services/pin/requests';
import { UserActions } from 'app/services/user/userActions';
import { requestRegisterPin } from 'app/services/user/userRequests';
import { RegisterPinPayload } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { Omit } from 'app/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { runInThisContext } from 'vm';


type RegisterPinSteps = 'newPassword' | 'newPasswordConfirm'
export interface SetPinState {
  currentStep: RegisterPinSteps;
  isFetching: boolean;
  pinList: PinList;
  currentPin?: string;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class RegisterPin extends React.Component<Props, SetPinState> {
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
    const { dispatchRequestRegisterPin } = this.props;
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

    dispatchRequestRegisterPin({pin, validation_token: this.props.user.cardRegistrationToken!})
    
    // return requestRegisterPin({ pin, validation_token: this.props.user.cardRegistrationToken! })
    //   .catch(() => {
    //     this.setState({ currentStep: 'newPassword', currentPin: '', isFetching: false, pinList: [] });
    //   })
    //   .then(() => {
    //     history.replace(urls.SET_ONETOUCH)
    //   });
  }

  public componentDidMount() {
    if (!this.props.user.cardRegistrationToken) {
      history.replace(urls.SETTINGS);
    }
  }

  public render() {
    const { currentStep } = this.state;
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>결제 비밀번호 설정 - 리디</title>
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

export const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
    isFetching: state.user.isAddingPinFetching,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchRequestRegisterPin: (payload: RegisterPinPayload) => dispatch(UserActions.registerPinRequest(payload)),
  }
}

export const ConnectedRegisterPin = connect(mapStateToProps, mapDispatchToProps)(RegisterPin);
