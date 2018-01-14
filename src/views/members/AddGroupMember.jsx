import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import * as Colors from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader/Subheader';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import AddBoxIcon from 'material-ui/svg-icons/content/add-box';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-bootstrap';
import NavToolBar from '../../components/NavToolBar';
import RenderPeople from '../../components/RenderPeople';
import FormEditWrapper from '../../components/FormEditWrapper';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

@inject('people')
@observer
export default class AddGroupMember extends Component {
  @observable group;
  @observable division;
  @observable divisionYear;
  @observable day;
  @observable searchType = 'lastName';
  @observable people = [];
  @observable filter = '';

  componentDidMount() {
    const { people, params } = this.props;
    this.group = people.getGroup(params.id);
  }
  componentWillReceiveProps() {
    const { people, params } = this.props;
    if (!this.group) {
      this.group = people.getGroup(params.id);
    }
  }

  error = (e) => {
    console.log(e);
  }

  handleInputChange = (value) => {
    this.filter = value;
  }

  handleSelectValueChange = (e, index, value) => {
    this.searchType = value;
  }

  menuItemTap = (item, person, event) => {
    const { people, params } = this.props;

    switch (item) {
    case 'add':
      people.addPersonToGroup(person.id, this.group.id);
      break;
    case 'delete':
      people.deletePersonFromGroup(person.person.id, this.group.id);
      break;
    default:
      break;
    }
  }

  avatar = (person) => {
    const personPhoto = (person.photoUrl && person.photoUrl.length);
    let CustomAvatar = <Avatar>{person.firstName.charAt(0)}{person.lastName.charAt(0)}</Avatar>;
    if (personPhoto) {
      CustomAvatar = <Avatar src={person.photoUrl} onError={this.error} />;
    }
    return CustomAvatar;
  }

  groupAvatar = (person) => {
    const actualPerson = person.person;
    const personPhoto = (actualPerson.photoUrl && actualPerson.photoUrl.length);
    let CustomAvatar = <Avatar>{actualPerson.firstName.charAt(0)}{actualPerson.lastName.charAt(0)}</Avatar>;
    if (personPhoto) {
      CustomAvatar = <Avatar src={actualPerson.photoUrl} onError={this.error} />;
    }
    return CustomAvatar;
  }

  badge = (person, custom) => {
    return (
      <AddBoxIcon
        onClick={((...args) => this.menuItemTap('add', person, ...args))}
        style={{ fill: Colors.grey400 }}
      />
    );
  }
  formatName = (person) => {
    return `${person.lastName}, ${person.firstName}`;
  }

  formatGroupMemberName = (person) => {
    return `${person.person.lastName}, ${person.person.firstName}`;
  }

  render() {
    const { people, params } = this.props;
    const dropDownStyle = {
      marginTop: '15px',
    };
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <NavToolBar navLabel="Add Group Members" goBackTo="/members/groups" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader
                title={(this.group) ? this.group.title : null}
                avatar={(this.group) ? <Avatar>{this.group.title.charAt(0)}</Avatar> : null}
                subtitle="Add members to group"
              />
              <CardMedia>
                <Row>
                  <Col xs={12} sm={3} md={4} lg={2}>
                    <DropDownMenu
                      value={this.searchType}
                      onChange={this.handleSelectValueChange}
                      style={dropDownStyle}
                    >
                      <MenuItem value={'lastName'} primaryText="Last Name" />
                      <MenuItem value={'firstName'} primaryText="First Name" />
                      <MenuItem value={'emailAddress'} primaryText="Email" />
                    </DropDownMenu>
                  </Col>
                  <Col xs={12} sm={9} md={8} lg={10}>
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
              <CardMedia>
                {this.filter.length ?
                  <div>
                    <Subheader>Search Results</Subheader>
                    <RenderPeople
                      badge={this.badge}
                      people={people.findPeople(this.filter, this.searchType, null, true)}
                      onTap={this.menuItemTap}
                      nameFormat={this.formatName}
                      rightAvatar={this.avatar}
                    />
                    <Divider />
                  </div> : null
                }
                <Subheader>Group Members</Subheader>
                <RenderPeople
                  people={people.getGroupMembers(params.id)}
                  onTap={this.menuItemTap}
                  nameFormat={this.formatGroupMemberName}
                  leftAvatar={this.groupAvatar}
                  rightMenuItems={[
                    'Delete',
                  ]}
                />
              </CardMedia>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
