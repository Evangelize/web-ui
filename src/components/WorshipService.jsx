import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

@observer
class WorshipService extends Component {

  handleMenuTap = (e) => {
    e.preventDefault();
  }

  handleTap = (e, obj) => {
    e.preventDefault();
    const { item, onTap } = this.props;
    if (obj.props.children === 'Delete') {
      onTap('delete', item);
    } else if (obj.props.children === 'Edit') {
      onTap('edit', item);
    } else if (obj.props.children === 'Select Jobs') {
      onTap('jobs', item);
    }
  }

  render() {
    const { item, selected, type, onSelect } = this.props;
    let Item = (
      <ListItem
        primaryText={item.title}
        secondaryText={`${moment().weekday(item.day).format('dddd')} ${moment(item.startTime, 'hh:mm:ss').format('h:mm a')} - ${moment(item.endTime, 'hh:mm:ss').format('h:mm a')}`}
        rightIconButton={
          <IconMenu
            iconButtonElement={iconButtonElement}
            onItemClick={this.handleTap}
            onClick={this.handleManuTap}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem>Edit</MenuItem>
            <MenuItem>Select Jobs</MenuItem>
            <MenuItem>Delete</MenuItem>
          </IconMenu>
        }
      />
    );
    Item = (type === 'add') ? (
      <ListItem
        leftCheckbox={
          <Checkbox
            checked={selected > -1}
            onCheck={((...args) => onSelect(item.id, ...args))}
          />
        }
        primaryText={item.title}
      />
    ) : Item;
    return (
      <div
        key={item.id}
      >
        <Divider />
        {Item}
      </div>
    );
  }
}
export default WorshipService;
