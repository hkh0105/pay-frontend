import * as React from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'app/config';
import { ConnectedSettings, Error404, Payment, RegisterCard, SetOnetouch, SetPin, Settings, ValidatePassword, ValidatePin } from 'app/scenes';

import { ConnectedEnsureLogin } from 'app/components/EnsureLogin';
import { ConnectedPrivateRoute, ConnectedScrollToTop } from 'app/hocs';
import { LegalTerms } from 'app/scenes/LegalTerms';

export const urls = {
  SETTINGS: '/settings',
  REGISTER_CARD: '/settings/cards/add',
  RIDIBOOKS_LOGIN: `${process.env.RIDIBOOKS_URL}/account/login`,
};

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedEnsureLogin>
      <ConnectedScrollToTop>
        <Switch>
          <Route exact={true} path="/payments/:reservation_id" render={() => <ConnectedPrivateRoute component={Payment} />} />
          <Route exact={true} path={urls.SETTINGS} render={() => <ConnectedPrivateRoute component={ConnectedSettings} />} />
          <Route exact={true} path={urls.REGISTER_CARD} render={() => <ConnectedPrivateRoute component={RegisterCard} />} />
          <Route exact={true} path="/settings/pin/register" render={() => <ConnectedPrivateRoute component={SetPin} />} />
          <Route exact={true} path="/settings/onetouch" render={() => <ConnectedPrivateRoute component={SetOnetouch} />} />
          <Route exact={true} path="/validate/pin" render={() => <ConnectedPrivateRoute component={ValidatePin} />} />
          <Route exact={true} path="/validate/password" render={() => <ConnectedPrivateRoute component={ValidatePassword} />} />
          <Route exact={true} path="/legal/terms" render={() => <ConnectedPrivateRoute component={LegalTerms} />} />
          <Redirect to={urls.REGISTER_CARD}/>
        </Switch>
      </ConnectedScrollToTop>
      </ConnectedEnsureLogin>
    </ConnectedRouter>
  );
};
