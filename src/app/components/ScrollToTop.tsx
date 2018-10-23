import * as React from 'react';
import { withRouter } from 'react-router';

interface ScrollToTopProps {
  location: Location;
}

export class ScrollToTop extends React.Component<ScrollToTopProps> {
  constructor(props: any) {
    super(props);
  }

  public componentDidUpdate(prevProps: ScrollToTopProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export const ConnectedScrollToTop = withRouter(ScrollToTop);
