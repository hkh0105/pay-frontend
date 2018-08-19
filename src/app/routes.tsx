import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { Header } from 'app/components';

import { history } from 'app/config';
import { Error404 } from 'app/scenes';

import { ConnectedScrollToTop } from 'app/hocs';

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedScrollToTop>
        <Header />
        <Switch>
          {/* <Route path="/" render={() => <ConnectedPrivateRoute component={RegisterTerms} />} />
          <Route
            path="/register/creditcard"
            render={() => <ConnectedPrivateRoute component={RegisterCreditCard} />}
          />
          <Route
            path="/register/terms"
            render={() => <ConnectedPrivateRoute component={RegisterTerms} />}
          /> */}
          <Route render={() => <Error404 />} />
        </Switch>
      </ConnectedScrollToTop>
    </ConnectedRouter>
  );
};
