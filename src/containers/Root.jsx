import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config'
import routes from '../routes';

export default (props) =>
  <div>
    <Provider {...props.context}>
      <Router history={props.history}>
        {renderRoutes(routes())}
      </Router>
    </Provider>
    {__DEV__ &&
      <DevTools />
    }
  </div>;
