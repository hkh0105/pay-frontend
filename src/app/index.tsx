import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { render } from 'react-dom';
import Favicon from 'react-favicon';

import App from 'app/App';
import { requestInitializeEnvironment } from 'app/services/environment';
import { store } from 'app/store';
import { setTabKeyFocus } from 'app/utils';
import { env } from './config';


if (env.isProduction) {
  Sentry.init({
    dsn: 'https://0bc859e1423a42dc8728690b03bcedf0@sentry.io/1307887',
  });
}

setTabKeyFocus();
store.dispatch(requestInitializeEnvironment());

render(
  <>
    <Favicon url={`//${process.env.RIDI_PAY_HOST}/public/images/pay-favicon.ico`} />
    <App store={store} />
  </>
, document.getElementById('app'));