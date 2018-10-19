import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg';
import { ConnectedSceneWrapper } from 'app/components';
import { history } from 'app/config';
import { colors } from 'app/constants/colors';
import { urls } from 'app/routes';
import { UserActions } from 'app/services/user/userActions';
import { requestToggleOnetouch } from 'app/services/user/userRequests';
import { OnetouchToggleRequestPaylaod } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { css, cx } from 'emotion';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const titleStyle = css({
  fontSize: '18px',
  letterSpacing: '-0.4px',
  textAlign: 'center',
  marginTop: '80px',
});

const descriptionStyle = css({
  color: colors.bluegray_40,
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '22px',
});

const formStyle = css({
  margin: '40px 40px 0',
});

const buttonStyle = css({
  display: 'block',
  width: '200px',
  margin: '0 auto',
  fontSize: '16px',
  '& + &': {
    marginTop: '8px',
  },
})

type Props = ReturnType<typeof mapStateToProps>;
interface State {
  isFetching: boolean;
}

export class SetOnetouch extends React.PureComponent<Props, State> {
  public state: State = {
    isFetching: false,
  }
  private handleButtonClick = (enable: boolean) => async (e: React.MouseEvent<HTMLInputElement>) => {
    if (this.state.isFetching) {
      return;
    }
    try {
      this.setState({ isFetching: true });
      await requestToggleOnetouch({ enable_onetouch_pay: enable });
      alert('RIDI Pay 카드 등록이 완료되었습니다.');
      location.replace(this.props.user.urlToReturn!);
    } catch (e) {
      alert(e.data.mssasage);
      this.setState({ isFetching: false });
    }
  }

  public render() {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>원터치 결제 설정 - 리디페이</title>
        </Helmet>
        <div>
          <h2 className={titleStyle}>원터치 결제를 사용하시겠습니까?</h2>
          <p className={descriptionStyle}>원터치 결제는 등록하신 카드로<br/><strong>비밀번호 입력 없이 바로 결제</strong>하는 기능입니다.</p>
          <div className={formStyle}>
            <Button
              className={buttonStyle}
              size="large"
              color="blue"
              disabled={this.state.isFetching}
              onClick={this.handleButtonClick(true)}
              spinner={this.state.isFetching}
              >원터치 결제 사용</Button>
            <Button
              className={buttonStyle}
              size="large"
              color="gray"
              outline={true}
              disabled={this.state.isFetching}
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


export const ConnectedSetOnetouch = connect(mapStateToProps)(SetOnetouch);