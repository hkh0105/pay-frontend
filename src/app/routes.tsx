import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'app/config';
import { AddCard, Error404 } from 'app/scenes';

import { ConnectedPrivateRoute, ConnectedScrollToTop } from 'app/hocs';

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedScrollToTop>
        <Switch>
          <Route path="/" render={() => <ConnectedPrivateRoute component={AddCard} />} />
          <Route render={() => <Error404 />} />
        </Switch>
      </ConnectedScrollToTop>
    </ConnectedRouter>
  );
};
