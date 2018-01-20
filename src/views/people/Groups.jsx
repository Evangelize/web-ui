import React, { Component } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import NavToolBar from '../../components/NavToolBar';
import DialogGroup from '../../components/DialogGroup';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import { Grid, Row, Col } from 'react-bootstrap';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

@inject('people', 'routing')
@observer
class Groups extends Component {
  @observable people = [];
  @observable filter = '';
  @observable group;
  @observable deleteId = null;
  @observable dialogOpen = false;
  @observable dialogDeleteOpen = false;

  addGroupClick = () => {
    const now = moment().valueOf();
    this.group = {
      id: null,
      entityId: null,
      title: 'New Group',
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    this.dialogOpen = true;
  }

  handleChange = (type, value) => {
    this.group[type] = value;
  }

  handleClose = (type) => {
    const { people } = this.props;
    this.dialogOpen = false;
    if (type === 'ok') {
      people.updateGroup(this.group);
    }
    this.type = null;
  }

  handleInputChange = (e, value) => {
    this.filter = value;
  }

  handleGroupClick = (group, e, item) => {
    if (item.props.value === 'edit') {
      this.group = group;
      this.dialogOpen = true;
    } else if (item.props.value === 'add') {
      this.navigate(`/people/groups/group/${group.id}/add`);
    } else if (item.props.value === 'delete') {
      this.deleteId = group.id;
      this.dialogDeleteOpen = true;
    }
  }

  navigate = (path, e) => {
    const { routing } = this.props;
    routing.push(path);
  }

  handleDeleteClose = (type) => {
    const { people } = this.props;
    this.dialogDeleteOpen = false;
    if (type === 'ok') {
      people.deleteRecord('groups', this.deleteId);
    }
    this.deleteId = null;
  }

  render() {
    const { people } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <NavToolBar navLabel="Groups" goBackTo="/dashboard">
                <ToolbarGroup key={2} lastChild style={{ float: 'right' }}>
                  <RaisedButton
                    label="Add Group"
                    secondary
                    onClick={this.addGroupClick}
                  />
                </ToolbarGroup>
              </NavToolBar>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Card>
                <CardHeader
                  title={'Groups'}
                  subtitle={'Search for groups'}
                  avatar={<Avatar>{'G'}</Avatar>}
                />
                <CardText>
                  <TextField
                    className={'searchBox'}
                    floatingLabelText="Search"
                    value={this.filter}
                    onChange={this.handleInputChange}
                  />
                </CardText>
                <CardMedia>
                  <List>
                    {people.findGroups(this.filter).map((group, index) =>
                      <div key={group.id}>
                        {(index > 0) ? <Divider /> : null}
                        <ListItem
                          primaryText={`${group.title}`}
                          rightIconButton={
                            <IconMenu
                              iconButtonElement={iconButtonElement}
                              onItemClick={((...args) => this.handleGroupClick(group, ...args))}
                              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            >
                              <MenuItem value="edit">Edit</MenuItem>
                              <MenuItem value="add">Add Members</MenuItem>
                              <MenuItem value="leaders">Select Leaders</MenuItem>
                              <MenuItem value="delete">Delete</MenuItem>
                            </IconMenu>
                          }
                        />
                      </div>
                    )}
                  </List>
                </CardMedia>
              </Card>
            </Col>
          </Row>
        </Grid>
        <DialogConfirmDelete
          open={this.dialogDeleteOpen}
          onClose={this.handleDeleteClose}
        />
        <DialogGroup
          open={this.dialogOpen}
          isEdit={this.isEdit}
          group={this.group}
          onClose={this.handleClose}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Groups;
