import { UserActions } from 'app/services/user/userActions';
import { RootState } from 'app/store';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class EnsureLogin extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.isUserLoggedIn) {
      this.props.requestUserProfile();
    }
  }

  public render() {
    if (this.props.isUserLoggedIn) {
      return this.props.children;
    }
    return null;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isUserLoggedIn: !!state.user.isUserLoggedIn,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestUserProfile: () => dispatch(UserActions.fetchUserProfileRequest()),
  }
}

export const ConnectedEnsureLogin = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false, // Make sure re-render for its children
})(EnsureLogin);
