import { Icon } from '@ridi/rsg';
import { css, cx } from 'emotion';
import * as React from 'react';

import { a11y, flexCenter, flexSpaceBetween, full, invisible, paperStylesClassName, resetButton, resetHeading, resetLayout } from 'app/styles';

export interface HeaderProps {
  isPaper: boolean;
  onBackButtonClick?: () => void;
  backButtonLabel?: string;
}

export const Header: React.SFC<HeaderProps> = ({
  onBackButtonClick = () => window.history.back(),
  backButtonLabel = '뒤로 가기',
  isPaper,
  children
}) => {
  return (
    <header className={header}>
      <button className={backButton} onClick={onBackButtonClick}>
        <span className={a11y}>{backButtonLabel}</span>
        <Icon name={isPaper ? 'arrow_12_left' : 'arrow_5_left'} className={backButtonIcon} />
      </button>
      <h1 className={headerTitle}>{children}</h1>
      <span className={cx(backButton, invisible)} />
    </header>
  );
};

export const headerHeightPixel = 42;
export const headerHeight = `${headerHeightPixel}px`;
const header = css({
  ...resetLayout,
  ...flexSpaceBetween,
  boxSizing: 'border-box',
  height: headerHeight,
  borderBottom: 'solid 1px #d6e3f0',
  [`.${paperStylesClassName} &`]: {
    height: '49px',
    borderBottom: 'solid 2px #b3b3b3'
  }
});

const backButton = css({
  ...resetButton,
  ...flexCenter,
  width: '32px',
  height: full,
  [`.${paperStylesClassName} &`]: {
    paddingLeft: '20px',
    width: '44px',
  }
});

const backButtonIcon = css({
  flex: 1,
  width: '8px',
  height: '14px',
  fill: '#1f8ce6',
  [`.${paperStylesClassName} &`]: {
    width: '24px',
    height: '19px',
    fill: '#3d4142',
  }
});

const headerTitle = css({
  ...resetHeading,
  color: '#1f8ce6',
  fontSize: '16px',
  [`.${paperStylesClassName} &`]: {
    color: 'black',
  }
});