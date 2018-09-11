import * as React from 'react';
import { render } from 'react-dom';

import App from 'app/App';
import { requestInitializeEnvironment } from 'app/services/environment';
// import { initializeUser } from 'app/services/user';
import { store } from 'app/store';
import { setTabKeyFocus } from 'app/utils';

// store.dispatch(initializeUser());
store.dispatch(requestInitializeEnvironment());

setTabKeyFocus();
render(<App store={store} />, document.getElementById('app'));