import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux'

import { Routes } from 'app/routes';

interface Props {
  store: Store;
}

export const App: React.SFC<Props> = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
