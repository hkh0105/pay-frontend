import * as React from 'react';
import { Provider, Store } from 'react-redux';

import { Routes } from 'app/routes';

export const App: React.SFC<{ store: Store<{}> }> = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
