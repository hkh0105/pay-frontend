import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux'

import { Routes } from 'app/routes';

interface Props {
  store: Store;
}

export class App extends React.Component<Props> {
  public componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }
  public render() {
    return (
      <Provider store={this.props.store}>
        <Routes />
      </Provider>
    )
  }
};

export default App;
