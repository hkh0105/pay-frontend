import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { PageSpinner } from 'app/components/PageSpinner';
import { ValidatePassword } from 'app/components/ValidatePassword';
import { ensureReservation } from 'app/hocs/ensureReservation';
import { requestCreatePayment } from 'app/services/payment/paymentRequests';
import { CreateReservationResponse, ReservationInformationResponse } from 'app/services/payment/paymentTypes';
import { PinForm } from 'app/services/pin/components/PinForm';
import { PinList } from 'app/services/pin/components/PinInputGroup';
import { requestValidatePassword, requestValidatePin } from 'app/services/user/userRequests';
import { ValidatePasswordResponse } from 'app/services/user/userTypes';
import { AxiosResponse } from 'axios';

interface Props extends ReservationInformationResponse {
  reservationId: string;
}

interface State {
  validationToken?: string;
  isFetching: boolean;
  isRedirecting: boolean;
  passwordValue: string;
  pinListValue: PinList;
}

class Payment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFetching: false,
      isRedirecting: false,
      validationToken: props.validation_token,
      passwordValue: '',
      pinListValue: [],
    };
  }

  private createPayment = async () => {
    const { reservationId } = this.props;
    const { validationToken, isRedirecting } = this.state;
    if (!validationToken || isRedirecting) {
      return;
    }
    try {
      this.setState({ isRedirecting: true });
      const result: AxiosResponse<CreateReservationResponse> = await requestCreatePayment(reservationId, validationToken);
      location.replace(result.data.return_url);
    } catch (e) {
      alert(e.data.message);
      this.setState({ isRedirecting: false });
    }
  }

  private handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ passwordValue: e.target.value });
  private handlePasswordSubmitButtonClick = async () => {
    if (this.state.isFetching || this.state.passwordValue.length < 6) {
      return;
    }
    try {
      this.setState({ isFetching: true });
      const response: AxiosResponse<ValidatePasswordResponse> = await requestValidatePassword({ 
        password: this.state.passwordValue, 
        reservation_id: this.props.reservationId,
      });
      this.setState({ 
        validationToken: response.data.validation_token,
      }, () => {
        this.createPayment();
      });
    } catch (e) {
      alert(e.data.message);
      this.setState({ isFetching: false });
    }
  };
  private renderPasswordValidation = () => {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>리디북스 비밀번호 입력 - 리디페이</title>
        </Helmet>
        <ValidatePassword
          isSubmitting={this.state.isFetching}
          onChange={this.handlePasswordChange}
          onSubmitButtonClick={this.handlePasswordSubmitButtonClick}
          password={this.state.passwordValue}
        />
      </ConnectedSceneWrapper>
    )
  }

  private handlePinChange = (pinListValue: PinList) => this.setState({ pinListValue });
  private handleSubmitPin = async () => {
    if (this.state.isFetching || this.state.pinListValue.length !== 6) {
      return;
    }
    try {
      this.setState({ isFetching: true });
      const response: AxiosResponse<ValidatePasswordResponse> = await requestValidatePin({ 
        pin: this.state.pinListValue.join(''), 
        reservation_id: this.props.reservationId,
      });
      this.setState({ 
        validationToken: response.data.validation_token,
      }, () => {
        this.createPayment();
      });
    } catch (e) {
      alert(e.data.message);
      this.setState({ isFetching: false, pinListValue: [] });
    }
  }
  private renderPinValidation = () => {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>결제 비밀번호 입력 - 리디페이</title>
        </Helmet>
        <PinForm
          title="결제 비밀번호 입력"
          showFindPin={true}
          isSubmitting={this.state.isFetching}
          onSubmitPin={this.handleSubmitPin}
          pinList={this.state.pinListValue}
          onChange={this.handlePinChange}
        />
      </ConnectedSceneWrapper>
    );
  }

  public componentDidMount() {
    if (this.props.validation_token) {
      this.createPayment();
    } 
  }

  public render() {
    const { isRedirecting } = this.state;
    const { required_validation } = this.props;
    if (required_validation === 'PASSWORD' && !isRedirecting) {
      return this.renderPasswordValidation();
    } else if (required_validation === 'PIN' && !isRedirecting) {
      return this.renderPinValidation();
    }

    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>결제 - 리디페이</title>
        </Helmet>
        <PageSpinner text="결제 완료를 위해 리디북스로 이동합니다." />
      </ConnectedSceneWrapper>
    );
  }
};

export const ConnectedPayment = ensureReservation(Payment);