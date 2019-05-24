import * as React from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'app/config';
import { ConnectedPayment, ConnectedRegisterCard, ConnectedSettings, UpdatePin } from 'app/scenes';

import { ConnectedEnsureLogin } from 'app/components/EnsureLogin';
import { LegalTerms } from 'app/scenes/LegalTerms';
import { ConnectedRegisterPin } from 'app/scenes/RegisterPin';
import { ConnectedPrivateRoute } from './components/PrivateRoute';
import { ConnectedScrollToTop } from './components/ScrollToTop';

export const urls = {
  SETTINGS: '/settings',
  REGISTER_CARD: '/settings/cards/register',
  CHANGE_CARD: '/settings/cards/change',
  REGISTER_PIN: '/settings/pin/register',
  PAYMENT: '/payments/:reservationId',
  SUBSCRIPTION_RESERVATION: '/payments/subscriptions/:reservationId',
  UPDATE_PIN: '/settings/pin/update',
  TERMS: '/legal/terms',
};
export const externalUrls = {
  RIDIBOOKS_LOGIN: `//${process.env.RIDIBOOKS_HOST}/account/login`,
}
export const publicUrls = [
  urls.SETTINGS,
  urls.REGISTER_CARD,
  urls.CHANGE_CARD,
];

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <ConnectedEnsureLogin>
      <ConnectedScrollToTop>
        <Switch>
          <Route exact={true} path={urls.PAYMENT} render={(props) => <ConnectedPayment paymentType={'payment'} reservationId={props.match.params.reservationId} />} />
          <Route exact={true} path={urls.SUBSCRIPTION_RESERVATION} render={(props) => <ConnectedPayment paymentType={'subscription'} reservationId={props.match.params.reservationId} />} />
          <Route exact={true} path={urls.SETTINGS} render={() => <ConnectedPrivateRoute component={ConnectedSettings} />} />
          <Route exact={true} path={urls.REGISTER_CARD} render={() => <ConnectedPrivateRoute component={ConnectedRegisterCard} />} />
          <Route exact={true} path={urls.CHANGE_CARD} render={() => <ConnectedPrivateRoute component={ConnectedRegisterCard} />} />
          <Route exact={true} path={urls.REGISTER_PIN} render={() => <ConnectedPrivateRoute component={ConnectedRegisterPin} />} />
          <Route exact={true} path={urls.UPDATE_PIN} render={() => <ConnectedPrivateRoute component={UpdatePin} />} />
          <Route exact={true} path={urls.TERMS} render={() => <ConnectedPrivateRoute component={LegalTerms} />} />
          <Redirect to={urls.SETTINGS}/>
        </Switch>
      </ConnectedScrollToTop>
      </ConnectedEnsureLogin>
    </ConnectedRouter>
  );
};
