import * as React from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'app/config';
import { ConnectedPayment, ConnectedRegisterCard, ConnectedSetOnetouch, ConnectedSettings, RegisterCard, UpdatePin, ValidatePin } from 'app/scenes';

import { ConnectedEnsureLogin } from 'app/components/EnsureLogin';
import { LegalTerms } from 'app/scenes/LegalTerms';
import { ConnectedRegisterPin } from 'app/scenes/RegisterPin';
import { ConnectedPrivateRoute } from './components/PrivateRoute';
import { ConnectedScrollToTop } from './components/ScrollToTop';

export const urls = {
  SETTINGS: '/settings',
  SET_ONETOUCH: '/settings/onetouch',
  REGISTER_CARD: '/settings/cards/add',
  REGISTER_PIN: '/settings/pin/register',
  RIDIBOOKS_LOGIN: `${process.env.RIDIBOOKS_URL}/account/login`,
};
export const publicUrls = [
  urls.SETTINGS,
  urls.REGISTER_CARD,
];

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedEnsureLogin>
      <ConnectedScrollToTop>
        <Switch>
          <Route exact={true} path="/payments/:reservationId" render={(props) => <ConnectedPayment reservationId={props.match.params.reservationId} />} />
          <Route exact={true} path={urls.SETTINGS} render={() => <ConnectedPrivateRoute component={ConnectedSettings} />} />
          <Route exact={true} path={urls.REGISTER_CARD} render={() => <ConnectedPrivateRoute component={ConnectedRegisterCard} />} />
          <Route exact={true} path={urls.REGISTER_PIN} render={() => <ConnectedPrivateRoute component={ConnectedRegisterPin} />} />
          <Route exact={true} path="/settings/pin/update" render={() => <ConnectedPrivateRoute component={UpdatePin} />} />
          <Route exact={true} path={urls.SET_ONETOUCH} render={() => <ConnectedPrivateRoute component={ConnectedSetOnetouch} />} />
          <Route exact={true} path="/validate/pin" render={() => <ConnectedPrivateRoute component={ValidatePin} />} />
          <Route exact={true} path="/legal/terms" render={() => <ConnectedPrivateRoute component={LegalTerms} />} />
          <Redirect to={urls.SETTINGS}/>
        </Switch>
      </ConnectedScrollToTop>
      </ConnectedEnsureLogin>
    </ConnectedRouter>
  );
};
