import React from 'react';  
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router'

export default function requireAuthentication(Component) {
  @withRouter
  @inject('auth', 'routing')
  @observer
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      const { auth, routing } = this.props;
      if (!auth.authenticated) {
        const redirectAfterLogin = routing.location.pathname;
        routing.push(`/login?next=${redirectAfterLogin}`);
      }
    }

    render() {
      const { auth } = this.props;
      return (
        <div>
          {(auth.authenticated)
            ? <Component {...this.props} />
            : null
          }
        </div>
      )

    }
  }

  return AuthenticatedComponent;
}
