import * as classNames from 'classnames';
import { css } from 'emotion';
import * as React from 'react';

import { Header } from 'app/components/Header';
import { RIDIPayIcon } from 'app/components/RIDIPayIcon';
import { colors } from 'app/constants/colors';
import { RootState } from 'app/store';
import { breakpoints, full, half, paperProStylesClassName, paperStylesClassName, resetLayout } from 'app/styles';
import { connect } from 'react-redux';

export interface SceneWrapperProps {
  isPaper: boolean;
  isPaperPro: boolean;
}

export const SceneWrapper: React.SFC<SceneWrapperProps> = ({ children, isPaper, isPaperPro }) => (
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
      <Header isPaper={isPaper}>
        <RIDIPayIcon className={ridiPayIcon} />
      </Header>
      {children}
    </main>
  </>
);

const mapStateToProps = (state: RootState): SceneWrapperProps => {
  return {
    isPaper: state.environment.platform.isPaper,
    isPaperPro: state.environment.platform.isPaperPro,
  };
};

export const ConnectedSceneWrapper = connect(mapStateToProps)(SceneWrapper);

const sceneBg =  css({
  display: 'none',
  [breakpoints.desktopView]: {
    display: 'block',
    position: 'absolute',
    width: full,
    height: full,
    backgroundColor: '#b8bfc4',
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
    height: '640px',
    marginTop: '-320px',
    marginLeft: '-180px',
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

export const ridiPayIcon = css({
  width: '58px',
  fill: colors.dodgerblue_50,
  marginTop: '4px',
  [`.${paperStylesClassName} &`]: {
    width: '68px',
    fill: 'black',
    marginTop: '2px',
  }
})