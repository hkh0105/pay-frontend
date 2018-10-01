import { Button } from '@ridi/rsg';
import { headerHeight } from 'app/components/Header';
import { ConnectedSceneWrapper } from 'app/components/SceneWrapper';
import { UserActions } from 'app/services/user/userActions';
import { RootState } from 'app/store';
import { applyGraySpinner } from 'app/styles';
import { css } from 'emotion';
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
    return <ConnectedSceneWrapper>
      <div className={s.wrapper}>
        <div className={s.spinner} />
      </div>
    </ConnectedSceneWrapper>
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

const s = {
  wrapper: css({
    height: `calc(100% - ${headerHeight})`,
    display: 'flex',
    alignItems: 'center',
  }),
  spinner: css({
    width: '100%',
    ...applyGraySpinner('30px'),
  } as {}),
}