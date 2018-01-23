const isBrowser = typeof window !== 'undefined';
const ReactSocialLoginButtons = isBrowser ? require('react-social-login-buttons') : undefined;
const GoogleLoginButton = isBrowser ? ReactSocialLoginButtons.GoogleLoginButton : undefined;
const FacebookLoginButton = isBrowser ? ReactSocialLoginButtons.FacebookLoginButton : undefined;
import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CustomColors from '../components/CustomColors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

@inject('auth', 'settings', 'sockets', 'routing')
@observer
class Login extends Component {
  @observable displayLoginFields = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      muiTheme: getMuiTheme(CustomColors),
      email: null,
      password: null,
      error: null,
    };
  }

  componentWillMount() {

  }

  async socialLogin(type) {
    let link;
    this.error = null;
    const { auth, sockets, settings, routing } = this.props;
    const result = await auth.login(type);
    console.log(result);
    if (result.error && result.error.code === 'auth/account-exists-with-different-credential') {
      link = await result.results.user.linkWithCredential(result.error.credential);
      this.providers = result.providers;
    } else if (result.error) {
      this.error = result.error;
      this.providers = result.providers;
      this.loginButtonText = `Login with ${result.result.providers[0]}`;
      this.open = true;
    }
    console.log(result.result);
    if (!result.error) {
      sockets.setupWs();
      routing.push('/dashboard');
    }
  }

  login() {
    const { auth, sockets, settings, routing } = this.props;
    const self = this;
    self.setState({ error: null });
    auth.authenticate(
      this.state.email,
      this.state.password
    ).then(
      (authenticated) => {
        if (authenticated) {
          sockets.setupWs();
          routing.push('/dashboard');
        } else {
          self.setState({ error: 'Incorrect email and/or password' });
        }
      }
    );
  }

  handleChange(field, e) {
    if (field === 'email') {
      this.setState({
        email: e.target.value,
      });
    } else if (field === 'password') {
      this.setState({
        password: e.target.value,
      });
    }
  }

  responseGoogle = (response) => {
    const { auth, sockets, settings, routing } = this.props;
    console.log(response);
    auth.thirdPartyLogin(
      'google',
      response,
      (authenticated) => {
        if (authenticated) {
          sockets.setupWs();
          routing.push('/dashboard');
        } else {
          self.setState({ error: 'Incorrect Google Login' });
        }
      }
    );
  }

  render() {
    const { auth } = this.props;
    const priorAuth = sessionStorage.getItem('auth-issue');
    const provider = (priorAuth) ? JSON.parse(priorAuth).provider : null;
    return (
      <div className="login-box">
        {!auth.showSplash ?
          <div className="login-center">
            <div className="login">
              <div className="login-header"
                  style={{
                    backgroundColor: this.state.muiTheme.rawTheme.palette.primary1Color,
                    color: this.state.muiTheme.rawTheme.palette.alternateTextColor,
                    backgroundImage: 'url(/images/evangelize-logo.svg)',
                  }}
              >
              </div>
              <div className="login-body">
                {priorAuth ?
                  <h3>To complete signup using the prior credentials you must login with the provider below</h3> : null
                }
                {isBrowser && !priorAuth ?
                  <div>
                    <GoogleLoginButton
                      onClick={((...args) => this.socialLogin('google', ...args))}
                    />
                    <FacebookLoginButton
                      onClick={((...args) => this.socialLogin('facebook', ...args))}
                    />
                  </div> : null
                }
                {isBrowser && priorAuth ?
                  <div>
                    {provider === 'google.com' ?
                      <GoogleLoginButton
                        onClick={((...args) => this.socialLogin('google', ...args))}
                      /> : null
                    }
                    {provider === 'facebook.com' ?
                      <FacebookLoginButton
                        onClick={((...args) => this.socialLogin('facebook', ...args))}
                      /> : null
                    }
                  </div> : null
                }
                {this.displayLoginFields ?
                  <div>
                    <TextField
                      hintText="Email"
                      floatingLabelText="Email"
                      type="email"
                      errorText={this.state.error}
                      style={{ width: '100%' }}
                      value={this.state.email}
                      onChange={((...args) => this.handleChange('email', ...args))}
                    />
                    <br />
                    <TextField
                      type="password"
                      hintText="Password"
                      floatingLabelText="Password"
                      errorText={this.state.error}
                      style={{ width: '100%' }}
                      value={this.state.password}
                      onChange={((...args) => this.handleChange('password', ...args))}
                    />
                    <br />
                    <br />
                    <RaisedButton label="Login" primary onClick={((...args) => this.login(...args))} />
                  </div> : null
                }
              </div>
            </div>
          </div> :
          <div className="login-center">
            <img src="/images/logo.min.svg" alt="logo" role="presentation" />
          </div>
        }
      </div>
    );
  }
}

export default Login;
