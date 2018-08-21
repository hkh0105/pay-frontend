import { Icon } from '@ridi/rsg/components/dist/icon';
import { css, cx } from 'emotion';
import * as React from 'react';

import { a11y, flexCenter, flexSpaceBetween, full, invisible, resetButton, resetHeading, resetLayout } from 'app/styles';

export interface HeaderProps {
  onBackButtonClick?: () => void;
  backButtonLabel?: string;
}

export const Header: React.SFC<HeaderProps> = ({
  onBackButtonClick = () => window.history.back(),
  backButtonLabel = '뒤로 가기',
  children
}) => {
  return (
    <header className={header}>
      <button className={backButton} onClick={onBackButtonClick}>
        <span className={a11y}>{backButtonLabel}</span>
        <Icon name="arrow_5_left" className={backButtonIcon} />
      </button>
      <h1 className={headerTitle}>{children}</h1>
      <span className={cx(backButton, invisible)} />
    </header>
  );
};

const header = css({
  ...resetLayout,
  ...flexSpaceBetween,
  height: '42px',
  borderBottom: 'solid 1px #d6e3f0',
});

const backButton = css({
  ...resetButton,
  ...flexCenter,
  width: '32px',
  height: full,
});

const backButtonIcon = css({
  width: '8px',
  height: '14px',
  fill: '#1f8ce6',
});

const headerTitle = css({
  ...resetHeading,
  color: '#1f8ce6',
  fontSize: '16px',
});