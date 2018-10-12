import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { ensureReservation } from 'app/hocs/ensureReservation';
import { requestCreatePayment } from 'app/services/payment/paymentRequests';
import { CreateReservationResponse, ReservationInformationResponse } from 'app/services/payment/paymentTypes';
import { AxiosResponse } from 'axios';

interface Props extends ReservationInformationResponse {
  reservationId: string;
}

interface State {
  validationToken?: string;
  isFetching: boolean;
}

class Payment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFetching: false,
      validationToken: props.validation_token,
    };
  }

  private createPayment = async () => {
    const { reservationId } = this.props;
    const { validationToken, isFetching } = this.state;
    if (!validationToken || isFetching) {
      return;
    }
    try {
      this.setState({ isFetching: true });
      const result: AxiosResponse<CreateReservationResponse> = await requestCreatePayment(reservationId, validationToken);
      location.replace(result.data.return_url);
    } catch (e) {
      this.setState({ isFetching: false });
    }
  }

  public componentDidMount() {
    if (this.props.validation_token) {
      this.createPayment();
    }
  }

  public render() {
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>결제 - 리디페이</title>
          </Helmet>
          <div className={sceneContents}>
            {/* contents */}
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};

export const ConnectedPayment = ensureReservation(Payment);