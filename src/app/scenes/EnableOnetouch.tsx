import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { history } from 'app/config';
import { urls } from 'app/routes';
import { PinForm, PinFormOnSubmit, PinFormProps } from 'app/services/pin/components/PinForm';
import { PinList } from 'app/services/pin/components/PinInputGroup';
import { UserActions } from 'app/services/user/userActions';
import { requestValidatePin } from 'app/services/user/userRequests';
import { ValidatePinResponse } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


export interface State {
  isFetching: boolean;
  pinList: PinList;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class EnableOnetouch extends React.Component<Props, State> {
  public state: State = {
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
    this.setState({ isFetching: true });
    try {
      const response: AxiosResponse<ValidatePinResponse> = await requestValidatePin({ pin });
      this.props.requestEnableOnetouch(response.data.validation_token);
    } catch (e) {
      alert(e.data.message);
      this.setState({ isFetching: false, pinList: [] });
    }
  }

  public componentDidMount() {
    if (this.props.user.isUsingOnetouchPay === true) {
      history.replace(urls.SETTINGS);
    }
  }

  public render() {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>원터치 결제 설정 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          <PinForm
            isSubmitting={this.state.isFetching}
            onSubmitPin={this.handleSubmitPin}
            pinList={this.state.pinList}
            onChange={this.handlePinFormChange}
            showFindPin={true}
            title="결제 비밀번호 입력"
          />
        </div>
      </ConnectedSceneWrapper>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestEnableOnetouch: (token: string) => 
      dispatch(UserActions.toggleOnetouchRequest({ enable_onetouch_pay: true, validation_token: token }))
  }
}

export const ConnectedEnableOnetouch = connect(mapStateToProps, mapDispatchToProps)(EnableOnetouch);
