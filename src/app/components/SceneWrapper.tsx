import * as classNames from 'classnames';
import { css } from 'emotion';
import * as React from 'react';

import { Header, HeaderProps } from 'app/components/Header';
import { RidiIcon } from 'app/components/RidiIcon';
import { colors } from 'app/constants/colors';
import { RootState } from 'app/store';
import { breakpoints, desktopViewCondition, desktopViewShortHeightCondition, full, half, paperProStylesClassName, paperStylesClassName, resetLayout } from 'app/styles';
import { connect } from 'react-redux';

export interface SceneWrapperProps {
  isPaper: boolean;
  isPaperPro: boolean;
  onBackButtonClick?: HeaderProps['onBackButtonClick'];
}

export const SceneWrapper: React.SFC<SceneWrapperProps> = ({ children, isPaper, isPaperPro, onBackButtonClick }) => (
  <>
    <div
      className={classNames(
        sceneBg,
        {
          [paperStylesClassName]: isPaper,
          [paperProStylesClassName]: isPaperPro,
        },
      )}
    />
    <main className={classNames(
      sceneMain,
      {
        [paperStylesClassName]: isPaper,
        [paperProStylesClassName]: isPaperPro,
      },
    )}>
      <Header
        isPaper={isPaper}
        onBackButtonClick={onBackButtonClick}
      >
        <RidiIcon className={ridiIcon} />
      </Header>
      {children}
    </main>
  </>
);

const mapStateToProps = (state: RootState, ownProps: Partial<SceneWrapperProps>): SceneWrapperProps => {
  return {
    isPaper: state.environment.platform.isPaper,
    isPaperPro: state.environment.platform.isPaperPro,
    ...ownProps,
  };
};

export const ConnectedSceneWrapper = connect(mapStateToProps)(SceneWrapper);

const desktopViewMinHeight = '640px';

const sceneBg =  css({
  display: 'none',
  [breakpoints.desktopView]: {
    display: 'block',
    position: 'absolute',
    width: full,
    height: full,
    backgroundColor: '#b8bfc4',
    minHeight: desktopViewMinHeight,
  },
  [`&.${paperStylesClassName}`]: {
    display: 'none',
  }
});

const sceneMain =  css({
  position: 'absolute',
  width: full,
  height: full,
  minHeight: '380px',
  minWidth: '320px',
  backgroundColor: '#f2f6fc',
  [breakpoints.desktopView]: {
    top: half,
    left: half,
    width: '360px',
    height: desktopViewMinHeight,
    marginTop: '-320px',
    marginLeft: '-180px',
  },
  [`@media ${desktopViewCondition} and ${desktopViewShortHeightCondition}`]: {
    marginTop: 0,
    top: 0,
  },
  [`&.${paperStylesClassName}`]: {
    ...resetLayout,
    top: 0,
    left: 0,
    width: full,
    height: full,
    backgroundColor: 'white',
  }
});

export const sceneContents = css({
  padding: '16px 15px 15px'
});

export const ridiIcon = css({
  width: '30px',
  fill: colors.dodgerblue_50,
  marginTop: '4px',
  [`.${paperStylesClassName} &`]: {
    width: '30px',
    fill: 'black',
    marginTop: '2px',
  }
})