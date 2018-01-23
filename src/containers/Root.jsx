import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import ErrorBoundary from 'react-error-boundaries';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';

const FallBackView = () => (
  <div />
);

export default (props) => (
  <ErrorBoundary
    onError={props.onError}
    FallbackComponent={FallBackView}
  >
    <div>
      <Provider {...props.context}>
        <Router history={props.history}>
          {renderRoutes(routes())}
        </Router>
      </Provider>
      {__DEV__ &&
        <DevTools />
      }
    </div>
  </ErrorBoundary>
);
