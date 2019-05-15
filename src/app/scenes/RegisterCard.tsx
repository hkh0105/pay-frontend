import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { CardForm, ConnectedCardForm } from 'app/services/cards/components';
import { UserActions } from 'app/services/user/userActions';
import { UpdateRegisterTypePayload, UpdateUrlToReturnPayload } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import * as qs from 'qs';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface State {
  type: string;
}

type Props = ReturnType<typeof mapDispatchToProps>;

export class RegisterCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    let type = 'register'
    if (location.pathname === '/settings/cards/change') {
      type = 'change'
      this.props.updateRegisterType({ type: 'change' });  
    } else {
      this.props.updateRegisterType({ type: 'register' });  
    }
    
    this.state = {
      type,
    }
  }
  public componentDidMount() {
    const queryString = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (queryString.returnUrl) {
      this.props.updateUrlToReturn({ url: encodeURIComponent(queryString.returnUrl) });
    }
  }

  public render() {
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>카드 등록 - 리디</title>
          </Helmet>
          <div className={sceneContents}>
            <ConnectedCardForm type={this.state.type} />
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    registerType: state.user.registerType,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUrlToReturn: (payload: UpdateUrlToReturnPayload) => dispatch(UserActions.updateUrlToReturn(payload)),
    updateRegisterType: (payload: UpdateRegisterTypePayload) => dispatch(UserActions.updateRegisterType(payload)),
  }
};

export const ConnectedRegisterCard = connect(null, mapDispatchToProps)(RegisterCard);