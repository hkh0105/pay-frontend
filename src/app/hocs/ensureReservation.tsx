import { Button } from '@ridi/rsg';
import { headerHeight } from 'app/components/Header';
import { PageSpinner } from 'app/components/PageSpinner';
import { ConnectedSceneWrapper } from 'app/components/SceneWrapper';
import { history } from 'app/config';
import { requestReservationInformation } from 'app/services/payment/paymentRequests';
import { ReservationInformationResponse } from 'app/services/payment/paymentTypes';
import { UserActions } from 'app/services/user/userActions';
import { RootState } from 'app/store';
import { applyGraySpinner } from 'app/styles';
import { AxiosResponse } from 'axios';
import { css } from 'emotion';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';

interface RouteProps {
  reservationId: string;
}

interface State {
  response?: ReservationInformationResponse;
}

export const ensureReservation = <P extends ReservationInformationResponse & RouteProps>(Component: React.ComponentType<P>) => 
  class extends React.Component<RouteProps, State> {
  public state: State = {}


  public async componentDidMount() {
    try {
      const response: AxiosResponse<ReservationInformationResponse> = await requestReservationInformation(this.props.reservationId);
      this.setState({ response: response.data });
    } catch (e) {
      alert('유효하지 않은 결제 정보입니다.');
      history.replace('/');
    }
  }

  public render() {
    if (this.state.response) {
      return <Component {...this.state.response} reservationId={this.props.reservationId} />
    }
    return <ConnectedSceneWrapper>
      <PageSpinner />
    </ConnectedSceneWrapper>
  }
}
