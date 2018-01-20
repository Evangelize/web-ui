import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FlatButton from 'material-ui/FlatButton';
import NavArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';

@inject('routing')
@observer
class NavToolBar extends Component {
  goBack() {
    const { routing } = this.props;
    routing.push(this.props.goBackTo);
  }

  render() {
    return (
      <Toolbar
        style={{ flexWrap: 'wrap' }}
      >
        <ToolbarGroup firstChild >
          <FlatButton
            label={this.props.navLabel}
            onClick={((...args) => this.goBack())}
            icon={<NavArrowBack style={{ marginLeft: '2px' }} />}
            style={{ marginLeft: '2px' }}
          />
        </ToolbarGroup>
        {this.props.children}
      </Toolbar>
    );
  }
}
export default NavToolBar;
