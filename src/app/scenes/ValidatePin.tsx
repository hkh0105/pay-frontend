import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { PinForm } from 'app/services/pin/components/PinForm';
import { requestPinValidation } from 'app/services/pin/requests';

export interface ValidatePinProps {
  userId: string;
}

export interface ValidatePinState {
  isSubmitting: boolean;
}

export class ValidatePin extends React.Component<ValidatePinProps, ValidatePinState> {
  public constructor(props: ValidatePinProps) {
    super(props);
    this.state = {
      isSubmitting: false,
    };
  }

  private toggleIsSubmitting(value: boolean) {
    this.setState({
      isSubmitting: value,
    });
  }

  public handleValidationSubmit = (pinList: number[]) => {
    this.toggleIsSubmitting(true);
    // TODO: error handling
    return requestPinValidation({
      userId: this.props.userId || 'qjincho',
      pin: pinList.join(),
    }).then(() => {
      location.assign('/');
    })
  }

  public render() {
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>결제 비밀번호 입력 - 리디</title>
          </Helmet>
          <div className={sceneContents}>
            <PinForm 
              title="결제 비밀번호 입력"
              showFindPin={true}
              isSubmitting={this.state.isSubmitting}
              onSubmitPin={this.handleValidationSubmit}
              pinList={[]}
              onChange={() => null}
            />
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};
