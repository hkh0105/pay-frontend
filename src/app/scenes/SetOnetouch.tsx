import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg';
import { ConnectedSceneWrapper, headerHeight, headerHeightPixel } from 'app/components';
import { history } from 'app/config';
import { colors } from 'app/constants/colors';
import { urls } from 'app/routes';
import { VoidActions } from 'app/services/void/voidActions';
import { FinishPaymentRegistrationPayload } from 'app/services/void/voidTypes';
import { RootState } from 'app/store';
import { css, cx } from 'emotion';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface State {
  isEnabling: boolean;
  isDisabling: boolean;
}

export class SetOnetouch extends React.PureComponent<Props, State> {
  public state: State = {
    isEnabling: false,
    isDisabling: false,
  }

  private handleButtonClick = (enable: boolean) => async (e: React.MouseEvent<HTMLInputElement>) => {
    if (this.state.isEnabling || this.state.isDisabling) {
      return;
    }
    try {
      this.setState({ 
        isEnabling: enable,
        isDisabling: !enable,
      });
      this.props.dispatchFinishPaymentRegistration({ enable_onetouch_pay: enable })
    } catch (e) {
      alert(e.data.mssasage);
      this.setState({ isEnabling: false, isDisabling: false });
    }
  }

  public componentDidMount() {
    if (!this.props.user.cardRegistrationToken) {
      history.replace(urls.SETTINGS);
    }
  }

  public render() {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>원터치 결제 설정 - 리디</title>
        </Helmet>
        <div>
          <h2 className={s.title}>원터치 결제를 사용하시겠습니까?</h2>
          <p className={s.description}>원터치 결제는 10만원 미만 결제 시  <br/><strong>비밀번호 입력 없이 바로 결제</strong>하는 기능입니다.</p>
          <div className={s.form}>
            <Button
              className={s.button}
              size="large"
              color="blue"
              disabled={this.state.isEnabling || this.state.isDisabling}
              onClick={this.handleButtonClick(true)}
              spinner={this.state.isEnabling}
              >원터치 결제 사용</Button>
            <Button
              className={s.button}
              size="large"
              color="gray"
              outline={true}
              disabled={this.state.isEnabling || this.state.isDisabling}
              spinner={this.state.isDisabling}
              onClick={this.handleButtonClick(false)}
            >사용 안함</Button>
          </div>
        </div>
      </ConnectedSceneWrapper>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchFinishPaymentRegistration: (payload: FinishPaymentRegistrationPayload) => dispatch(VoidActions.finishPaymentRegistration(payload)),
  }
}


export const ConnectedSetOnetouch = connect(mapStateToProps, mapDispatchToProps)(SetOnetouch);

const s = {
  title: css({
    fontSize: '18px',
    letterSpacing: '-0.4px',
    textAlign: 'center',
    margin: '80px 0 0 0',
  }),
  description: css({
    color: colors.bluegray_40,
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '22px',
    margin: '10px 0 0 0',
  }),
  form: css({
    margin: '30px 40px 0',
  }),
  button: css({
    display: 'block',
    width: '200px',
    margin: '0 auto',
    fontSize: '16px',
    '& + &': {
      marginTop: '8px',
    },
  })
}