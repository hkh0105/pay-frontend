import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { CardForm, ConnectedCardForm } from 'app/services/cards/components';
import { UserActions } from 'app/services/user/userActions';
import { UpdateUrlToReturnPayload } from 'app/services/user/userTypes';
import * as qs from 'qs';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type Props = ReturnType<typeof mapDispatchToProps>;

export class RegisterCard extends React.PureComponent<Props> {
  public componentDidMount() {
    const queryString = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (queryString.returnUrl) {
      this.props.updateUrlToReturn({ url: queryString.returnUrl });
    }
  }

  public render() {
    return (
      <>
        <ConnectedSceneWrapper>
          <Helmet>
            <title>카드 등록 - 리디페이</title>
          </Helmet>
          <div className={sceneContents}>
            <ConnectedCardForm />
          </div>
        </ConnectedSceneWrapper>
      </>
    );
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUrlToReturn: (payload: UpdateUrlToReturnPayload) => dispatch(UserActions.updateUrlToReturn(payload)),
  }
};

export const ConnectedRegisterCard = connect(null, mapDispatchToProps)(RegisterCard);