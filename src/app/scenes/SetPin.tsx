import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { PinForm } from 'app/services/pin/components/PinForm';
import { requestPinRegistration, requestPinValidation } from 'app/services/pin/requests';

export enum SetPinStep {
  validateCurrentPin = 'validateCurrentPin',
  setNewPin = 'setNewPin',
  confirmNewPin = 'confirmNewPin',
}

export const stepStates: {
  [index: string]: {
    title: string;
    showFindPin: boolean;
    description?: string; 
  }
} = {
  [SetPinStep.validateCurrentPin]: {
    title: '현재 비밀번호 입력',
    showFindPin: true,
  },
  [SetPinStep.setNewPin]: {
    title: '결제 비밀번호 설정',
    showFindPin: false,
    description: '숫자 6자리를 입력해주세요.',
  },
  [SetPinStep.confirmNewPin]: {
    title: '결제 비밀번호 설정',
    showFindPin: false,
    description: '한번 더 입력해주세요.',
  },
}

export interface SetPinState {
  steps: SetPinStep[];
  currentStepIndex: number; 
  isSubmitting: boolean;
  newPin: string;
}

export interface SetPinProps {
  isFirstTimeSetting: boolean;
  userId: string;
}

export class SetPin extends React.Component<SetPinProps, SetPinState> {
  public constructor(props: SetPinProps) {
    super(props);
    const steps = props.isFirstTimeSetting ? [
      SetPinStep.setNewPin,
      SetPinStep.confirmNewPin,
    ]: [
      SetPinStep.validateCurrentPin,
      SetPinStep.setNewPin,
      SetPinStep.confirmNewPin
    ];
    this.state = {
      steps,
      currentStepIndex: 0,
      isSubmitting: false,
      newPin: '',
    };
  }

  private moveToPrevStep() {
    this.setState((state) => ({
      currentStepIndex: state.currentStepIndex - 1,
    }))
  }

  private moveToNextStep() {
    this.setState((state) => ({
      currentStepIndex: state.currentStepIndex + 1,
    }))
  }

  private doesNewPinMatch(pin: string) {
    if (this.state.newPin !== pin) { 
      return false;
    }
    return true;
  }

  private toggleIsSubmitting(value: boolean) {
    this.setState({
      isSubmitting: value,
    });
  }

  public [SetPinStep.validateCurrentPin] = (pinList: number[]) => {
    this.toggleIsSubmitting(true);
    // TODO: error handling
    return requestPinValidation({
      userId: this.props.userId || 'qjincho',
      pin: pinList.join(),
    }).then(() => {
      this.moveToNextStep();
      this.toggleIsSubmitting(false);
    })
  }

  public [SetPinStep.setNewPin] = (pinList: number[]) => {
    this.toggleIsSubmitting(true);
    this.setState({
      newPin: pinList.join(),
    });
    this.moveToNextStep();
    this.toggleIsSubmitting(false);
    return new Promise((resolve) => resolve());
  }

  public [SetPinStep.confirmNewPin] = (pinList: number[]) => {
    this.toggleIsSubmitting(true);
    const newPin = pinList.join();
    if (!this.doesNewPinMatch(newPin)) {
      // UX from here isn't clear TODO: check
      // FIXME: loading spinner doens't show T^T 
      window.alert('결제 비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
      this.moveToPrevStep();
      this.toggleIsSubmitting(false);
      return new Promise((resolve) => resolve());
    } else {
      // TODO: error handling
      return requestPinRegistration({
        userId: this.props.userId || 'qjincho',
        pin: newPin,
      }).then(() => {
        this.toggleIsSubmitting(false);
        // UX from here isn't clear TODO: check
        window.alert('결제 비밀번호 설정이 완료되었습니다.');
        location.assign('/');
      })
    }
  }

  public render() {
    const { currentStepIndex, isSubmitting } = this.state;
    const currentStep = this.state.steps[currentStepIndex];
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>결제 비밀번호 설정 - 리디페이</title>
          </Helmet>
          <div className={sceneContents}>
            <PinForm 
              title={stepStates[currentStep].title}
              showFindPin={stepStates[currentStep].showFindPin}
              description={stepStates[currentStep].description}
              isSubmitting={isSubmitting}
              onSubmitPin={this[currentStep]}
            />
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};
