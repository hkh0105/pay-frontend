// FIXME: @ridi/rsg publish does not have actual component files 0_0
// import { Icon } from '@ridi/rsg/components/dist/icon';
import * as React from 'react';

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
    <header className="SimpleHeader">
      <button className="SimpleHeader_BackButton" onClick={onBackButtonClick}>
        <span className="a11y">{backButtonLabel}</span>
        {/* <Icon name="arrow_5_left" className="SimpleHeader_BackButton_Icon"/> */}
      </button>
      <h1 className="SimpleHeader_Title">{children}</h1>
      <span className="SimpleHeader_BackButton SimpleHeader_BackButton-invisible" />
    </header>
  );
};
