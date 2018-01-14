import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import Avatar from 'material-ui/Avatar';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import * as Colors from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckedIcon from 'material-ui/svg-icons/toggle/check-box';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Grid, Row, Col } from 'react-bootstrap';
import RenderPeople from './RenderPeople';
import FormEditWrapper from './FormEditWrapper';
import Divider from 'material-ui/Divider/Divider';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const dropDownStyle = {
  marginTop: '16px',
};

@inject('worship', 'people')
@observer
export default class extends Component {
  @observable group = null;
  @observable searchType = 'lastName';
  @observable filter = '';

  componentWillMount() {
    const { service, worshipDate } = this.props;
  }

  badge = (person, custom) => {
    const { worship, service, worshipDate } = this.props;
    const defaultPresent = worship.getDefaultAttendanceType('present');
    const defaultAbsent = worship.getDefaultAttendanceType('absent');
    const presentCategories = worship.getAttendanceCategoriesByType('present');
    const personAttendance = worship.getPersonWorshipAttendance(worshipDate, service.id, person.id);
    const CustomAvatar = (personAttendance
      && presentCategories.filter(c => c.id === personAttendance.attendanceTypeId).length
    ) ? (
      <CheckedIcon
        onClick={((...args) => this.menuItemTap(defaultAbsent.id, person.id, ...args))}
        style={{ fill: Colors.deepOrange500 }}
      />
    ) : (
      <UnCheckedIcon
        onClick={((...args) => this.menuItemTap(defaultPresent.id, person.id, ...args))}
        style={{ fill: Colors.grey400 }}
      />
    );
    return CustomAvatar;
  }

  handleInputChange = (value) => {
    this.filter = value;
  }

  handleSelectValueChange = (e, index, value) => {
    this.searchType = value;
  }

  handleGroupChange = (e, index, value) => {
    this.group = value;
  }

  menuItemTap = (type, personId) => {
    const { worship, service, worshipDate } = this.props;

    worship.setMemberAttendanceType(type, service.id, worshipDate, personId);
  }

  formatName = (person) => {
    return `${person.lastName}, ${person.firstName}`;
  }

  avatar = (person) => {
    const { worship } = this.props;
    const RightMenu = (
      <IconMenu
        iconButtonElement={iconButtonElement}
        onItemClick={this.handleTap}
        onClick={this.handleMenuTap}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {worship.getAttendanceTypes().map(t => <MenuItem key={t.id}>{t.title}</MenuItem>)}
      </IconMenu>
    );
    const personPhoto = (person.photoUrl && person.photoUrl.length);
    let CustomAvatar = <Avatar>{person.firstName.charAt(0)}{person.lastName.charAt(0)}</Avatar>;
    if (personPhoto) {
      CustomAvatar = (
        <div>
          <Avatar src={person.photoUrl} />
          {RightMenu}
        </div>
      );
    } else {
      CustomAvatar = (
        <div>
          {CustomAvatar}
          {RightMenu}
        </div>
      );
    }
    return CustomAvatar;
  }

  render() {
    const { worship, people, service, worshipDate } = this.props;
    const filter = this.filter;
    return (
      <Card>
        <CardHeader
          title={`${(service) ? service.title : 'Unknown Service'} Attendance`}
          subtitle={moment(worshipDate).tz('America/Chicago').format('dddd MM/DD/YYYY')}
          avatar={<Avatar>{moment(worshipDate).tz('America/Chicago').format('dd')}</Avatar>}
        />
        <CardMedia>
          <Row>
            <Col xs={12} sm={12} md={3} lg={2}>
              <DropDownMenu
                value={this.group}
                onChange={this.handleGroupChange}
                style={dropDownStyle}
              >
                <MenuItem value={null} primaryText="All" />
                {people.getGroups().map(group =>
                  <MenuItem key={group.id} value={group.id} primaryText={group.title} />
                )}
              </DropDownMenu>
            </Col>
            <Col xs={12} sm={12} md={3} lg={2}>
              <DropDownMenu
                value={this.searchType}
                onChange={((...args) => this.handleSelectValueChange(...args))}
                style={dropDownStyle}
              >
                <MenuItem value={'lastName'} primaryText="Last Name" />
                <MenuItem value={'firstName'} primaryText="First Name" />
                <MenuItem value={'emailAddress'} primaryText="Email" />
              </DropDownMenu>
            </Col>
            <Col xs={12} sm={12} md={6} lg={8}>
              <FormEditWrapper
                value={this.filter}
                onChange={this.handleInputChange}
                singleValue
              >
                <TextField
                  className={'searchBox'}
                  ref="searchField"
                  floatingLabelText="Search"
                  value={this.filter}
                />
              </FormEditWrapper>
            </Col>
          </Row>
        </CardMedia>
        <Divider />
        <CardMedia>
          <RenderPeople
            badge={this.badge}
            people={people.findPeople(this.filter, this.searchType, (this.group) ? this.group : null, true)}
            onTap={this.menuItemTap}
            nameFormat={this.formatName}
            rightAvatar={this.avatar}
          />
        </CardMedia>
      </Card>
    );
  }
}
