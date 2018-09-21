import { UserActions } from 'app/services/user/userActions';
import { RootState } from 'app/store';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class EnsureUserProfile extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    if (!this.props.isProfileFetched) {
      this.props.requestUserProfile();
    }
  }

  public render() {
    if (this.props.isProfileFetched) {
      return this.props.children;
    }
    return null;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isFetching: state.user.isProfileFetching,
    isProfileFetched: !!state.user.profile,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestUserProfile: () => dispatch(UserActions.fetchUserProfileRequest()),
  }
}

export const ConnectedEnsureUserProfile = connect(mapStateToProps, mapDispatchToProps)(EnsureUserProfile);
