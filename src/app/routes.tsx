import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'app/config';
import { AddCard, Error404, Payment, SetOnetouch, SetPin, Settings, ValidatePassword, ValidatePin } from 'app/scenes';

import { ConnectedPrivateRoute, ConnectedScrollToTop } from 'app/hocs';

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedScrollToTop>
        <Switch>
          <Route path="/" render={() => <ConnectedPrivateRoute component={Settings} />} />
          <Route path="/payments/:reservation_id" render={() => <ConnectedPrivateRoute component={Payment} />} />
          <Route path="/settings" render={() => <ConnectedPrivateRoute component={Settings} />} />
          <Route path="/settings/cards/add" render={() => <ConnectedPrivateRoute component={AddCard} />} />
          <Route path="/settings/pin/register" render={() => <ConnectedPrivateRoute component={SetPin} />} />
          <Route path="/setings/onetouch" render={() => <ConnectedPrivateRoute component={SetOnetouch} />} />
          <Route path="/validate/pin" render={() => <ConnectedPrivateRoute component={ValidatePin} />} />
          <Route path="/validate/password" render={() => <ConnectedPrivateRoute component={ValidatePassword} />} />
          <Route render={() => <Error404 />} />
        </Switch>
      </ConnectedScrollToTop>
    </ConnectedRouter>
  );
};
