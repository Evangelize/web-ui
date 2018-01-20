import React, { Component, PropTypes } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CustomColors from '../components/CustomColors';
import * as Colors from 'material-ui/styles/colors';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import { Modal } from 'react-overlays';
import MediaQuery from 'react-responsive';

@inject('auth', 'classes', 'settings', 'routing')
@observer
export default class App extends Component {
  @observable muiTheme;
  @observable open = false;
  @observable name;
  @observable modal;

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  componentWillMount() {
    const { classes, auth, settings } = this.props;
    this.muiTheme = getMuiTheme(CustomColors);
    this.name = (auth.user) ? auth.userFullName : '';
    this.modal = classes.isUpdating;
  }

  getChildContext() {
    return {
      muiTheme: this.muiTheme,
    };
  }

  handleLeftNavChange(url, e) {
    const { settings, routing } = this.props;
    console.log('handleLeftNavChange');
    settings.leftNavOpen = false;
    routing.push(url);
  }

  showLeftNavClick = (e) => {
    const { settings } = this.props;
    console.log('showLeftNavClick', e);
    settings.leftNavOpen = true;
  }

  leftNavState(state) {
    const { settings } = this.props;
    console.log('leftNavState', state.open);
    settings.leftNavOpen = state.open;
  }

  onRequestChange = (open) => {
    const { settings } = this.props;
    settings.leftNavOpen = open;
  }

  close() {
    this.modal = false;
  }

  render() {
    const { auth, settings, route } = this.props;
    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0,
    };
    const backdropStyle = {
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5,
      ...modalStyle,
    };
    const textColor = this.muiTheme.rawTheme.palette.alternateTextColor;
    const navHeader = {
      backgroundColor: this.muiTheme.rawTheme.palette.primary1Color,
      height: '12em',
      color: textColor,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundSize: 'cover',
      backgroundImage: 'url(\'/images/nav-header.jpg\')',
    };
    const brandingStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: Colors.white,
      backgroundColor: this.muiTheme.rawTheme.palette.accent1Color,
      padding: '0px 10px',
    };
    // console.log("settings", this.props);
    return (
      <div>
        <Modal
          aria-labelledby="modal-label"
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.modal}
          onHide={this.close}
        >
          <div />
        </Modal>
        <div style={{ display: (auth.authenticated) ? 'block' : 'none' }}>
          <AppBar
            title="Evangelize"
            iconElementLeft={<IconButton onClick={this.showLeftNavClick}><NavigationMenu /></IconButton>}
          >
            <MediaQuery query="(min-device-width: 1024px)">
              <div style={brandingStyle}>
                <h6>Twin City church of Christ</h6>
              </div>
            </MediaQuery>
          </AppBar>
        </div>
        <div>
          <Drawer
            ref="leftNav"
            docked={false}
            open={settings.leftNavOpen}
            onRequestChange={this.onRequestChange}
          >
            <div
              style={navHeader}
            >
              <div className="navName">
                {auth.userFullName}
              </div>
            </div>

            <List>
              <ListItem
                primaryText="Dashboard"
                onClick={((...args) => this.handleLeftNavChange('/dashboard', ...args))}
              />
              <ListItem
                primaryText="Class Management"
                initiallyOpen
                primaryTogglesNestedList
                nestedItems={[
                  <ListItem
                    key={1}
                    onClick={((...args) => this.handleLeftNavChange('/classes/attendance', ...args))}
                    primaryText="Attendance"
                  />,
                  <ListItem
                    key={2}
                    onClick={((...args) => this.handleLeftNavChange('/classes', ...args))}
                    primaryText="Classes"
                  />,
                  <ListItem
                    key={4}
                    onClick={((...args) => this.handleLeftNavChange('/classes/schedules', ...args))}
                    primaryText="Schedules"
                  />,
                ]}
              />
              <ListItem
                primaryText="Worship Management"
                initiallyOpen
                primaryTogglesNestedList
                nestedItems={[
                  <ListItem
                    key={1}
                    onClick={((...args) => this.handleLeftNavChange('/worship/services', ...args))}
                    primaryText="Worship Services"
                  />,
                  <ListItem
                    key={2}
                    onClick={((...args) => this.handleLeftNavChange('/worship/jobs', ...args))}
                    primaryText="Jobs"
                  />,
                  <ListItem
                    key={3}
                    onClick={((...args) => this.handleLeftNavChange('/worship/services/assign/jobs', ...args))}
                    primaryText="Assign Jobs"
                  />,
                  <ListItem
                    key={4}
                    onClick={((...args) => this.handleLeftNavChange('/worship/attendance', ...args))}
                    primaryText="Attendance"
                  />,
                ]}
              />
              <ListItem
                primaryText="Member Management"
                initiallyOpen
                primaryTogglesNestedList
                nestedItems={[
                  <ListItem
                    key={1}
                    onClick={((...args) => this.handleLeftNavChange('/people/members', ...args))}
                    primaryText="Members"
                  />,
                  <ListItem
                    key={2}
                    onClick={((...args) => this.handleLeftNavChange('/people/families', ...args))}
                    primaryText="Families"
                  />,
                  <ListItem
                    key={3}
                    onClick={((...args) => this.handleLeftNavChange('/people/groups', ...args))}
                    primaryText="Groups"
                  />,
                  <ListItem
                    key={4}
                    onClick={((...args) => this.handleLeftNavChange('/people/import', ...args))}
                    primaryText="Import"
                  />,
                ]}
              />
              <ListItem
                value={"/settings"}
                primaryText="Settings"
                onClick={((...args) => this.handleLeftNavChange('/settings', ...args))}
              />
            </List>
          </Drawer>
        </div>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

/*
App.contextTypes = {
  store: React.PropTypes.object.isRequired
};
*/
