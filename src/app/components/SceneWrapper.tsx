import { Header } from 'app/components/Header';
import { breakpoints, full, half } from 'app/styles';
import { css } from 'emotion';
import * as React from 'react';

export const SceneWrapper: React.SFC = ({ children }) => (
  <>
    <div className={sceneBg} />
    <main className={sceneMain}>
      <Header>
        리디페이 아이콘
      </Header>
      {children}
    </main>
  </>
);

const sceneBg =  css({
  display: 'none',
  [breakpoints.desktopView]: {
    display: 'block',
    position: 'absolute',
    width: full,
    height: full,
    backgroundColor: '#b8bfc4',
  }
});

const sceneMain =  css({
  position: 'absolute',
  width: full,
  height: full,
  minHeight: '380px',
  backgroundColor: '#f2f6fc',
  [breakpoints.desktopView]: {
    top: half,
    left: half,
    width: '360px',
    height: '640px',
    marginTop: '-320px',
    marginLeft: '-180px',
  }
});

export const sceneContents = css({
  padding: '16px 15px 15px'
});