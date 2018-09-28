import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'app/config';
import { AddCard, Error404, Payment, SetOnetouch, SetPin, Settings, ValidatePassword, ValidatePin } from 'app/scenes';

import { TestCardPlates } from 'app/components/CardPlate';
import { ConnectedEnsureLogin } from 'app/components/EnsureLogin';
import { ConnectedPrivateRoute, ConnectedScrollToTop } from 'app/hocs';
import { LegalTerms } from 'app/scenes/LegalTerms';

export const urls = {
  ADD_CARD: '/settings/cards/add',
  RIDIBOOKS_LOGIN: `${process.env.RIDIBOOKS_URL}/account/login`,
};

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedEnsureLogin>
      <ConnectedScrollToTop>
        <Switch>
          <Route exact={true} path="/" render={() => <ConnectedPrivateRoute component={Settings} />} />
          <Route exact={true} path="/payments/:reservation_id" render={() => <ConnectedPrivateRoute component={Payment} />} />
          <Route exact={true} path="/settings" render={() => <ConnectedPrivateRoute component={Settings} />} />
          <Route exact={true} path={urls.ADD_CARD} render={() => <ConnectedPrivateRoute component={AddCard} />} />
          <Route exact={true} path="/settings/pin/register" render={() => <ConnectedPrivateRoute component={SetPin} />} />
          <Route exact={true} path="/settings/onetouch" render={() => <ConnectedPrivateRoute component={SetOnetouch} />} />
          <Route exact={true} path="/validate/pin" render={() => <ConnectedPrivateRoute component={ValidatePin} />} />
          <Route exact={true} path="/validate/password" render={() => <ConnectedPrivateRoute component={ValidatePassword} />} />
          <Route exact={true} path="/legal/terms" render={() => <ConnectedPrivateRoute component={LegalTerms} />} />
          <Route exact={true} path="/test/card-plates" render={() => <ConnectedPrivateRoute component={TestCardPlates} />} />
          <Route render={() => <Error404 />} />
        </Switch>
      </ConnectedScrollToTop>
      </ConnectedEnsureLogin>
    </ConnectedRouter>
  );
};
