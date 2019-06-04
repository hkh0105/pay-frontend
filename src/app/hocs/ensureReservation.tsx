import { PageSpinner } from 'app/components/PageSpinner';
import { ConnectedSceneWrapper } from 'app/components/SceneWrapper';
import { history } from 'app/config';
import { requestReservationInformation, requestReservationSubscriptionInformation } from 'app/services/payment/paymentRequests';
import { ReservationInformationResponse } from 'app/services/payment/paymentTypes';
import { AxiosResponse } from 'axios';
import * as React from 'react';

interface RouteProps {
  reservationId: string;
  paymentType: string;
}

interface State {
  response?: ReservationInformationResponse;
}

export const ensureReservation = <P extends ReservationInformationResponse & RouteProps>(Component: React.ComponentType<P>) => 
  class extends React.Component<RouteProps, State> {
  public state: State = {}


  public async componentDidMount() {
    const { paymentType } = this.props;
    try {
      const response: AxiosResponse<ReservationInformationResponse> = paymentType === 'payment' ? 
      await requestReservationInformation(this.props.reservationId) : 
      await requestReservationSubscriptionInformation(this.props.reservationId)
      this.setState({ response: response.data });
    } catch (e) {
      alert('유효하지 않은 결제 정보입니다.');
      history.replace('/');
    }
  }

  public render() {
    if (this.state.response) {
      return <Component {...this.state.response} paymentType={this.props.paymentType} reservationId={this.props.reservationId} />
    }
    return <ConnectedSceneWrapper>
      <PageSpinner />
    </ConnectedSceneWrapper>
  }
}
