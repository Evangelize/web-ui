import React, { Component, PropTypes } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
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

@inject('classes')
@observer
class DisplayPerson extends Component {
  @observable family;
  componentWillMount() {
    const { person, classes } = this.props;
    this.family = classes.getFamily(person.familyId);
  }

  displayPhoto = () => {
    const { person, badge } = this.props;
    const personPhoto = (person.photoUrl && person.photoUrl.length);
    const familyPhoto = (this.family && this.family.photoUrl && this.family.photoUrl.length);
    let CustomAvatar = (person.firstName) ? <Avatar>{person.firstName.charAt(0)}</Avatar> : null;
    if (personPhoto) {
      CustomAvatar = <Avatar src={person.photoUrl} />;
    } else if (familyPhoto) {
      CustomAvatar = <Avatar src={this.family.photoUrl} />;
    }
    CustomAvatar = (badge) ? badge(person, CustomAvatar) : CustomAvatar;
    return CustomAvatar;
  }

  handleMenuTap = (e) => {
    e.preventDefault();
  }

  handleTap = (e, obj) => {
    e.preventDefault();
    const { person, onTap } = this.props;
    onTap(obj.props.children.toLowerCase(), person);
  }

  formatName = () => {
    const { person, nameFormat } = this.props;
    let name = `${person.firstName} ${person.lastName}`;
    if (nameFormat) {
      name = nameFormat(person);
    }
    return name
  }

  render() {
    const { 
      person,
      secondaryText,
      secondaryTextLines,
      rightAvatar,
      leftAvatar,
      rightMenuItems
    } = this.props;
    const avatar = (leftAvatar) ? leftAvatar(person) : this.displayPhoto();
    const rightIconButton = (rightMenuItems) ? 
      <IconMenu
        iconButtonElement={iconButtonElement}
        onItemClick={this.handleTap}
        onClick={this.handleMenuTap}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {rightMenuItems.map((item, index) =>
          <MenuItem key={index}>{item}</MenuItem>
        )}
      </IconMenu> : null;
    return (
      <div key={person.id}>
        <ListItem
          primaryText={this.formatName()}
          secondaryText={secondaryText}
          secondaryTextLines={secondaryTextLines}
          leftAvatar={avatar}
          rightAvatar={(rightAvatar) ? rightAvatar(person) : null}
          rightIconButton={rightIconButton}
        />
        <Divider />
      </div>
    );
  }
}
export default DisplayPerson;
