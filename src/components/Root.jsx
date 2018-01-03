import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';

export default (props) =>
  <div>
    <Provider {...props.context}>
      <Router history={props.history} routes={props.routes} />
    </Provider>
    {__DEV__ &&
      <DevTools />
    }
  </div>;
