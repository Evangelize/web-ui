import React, { Component } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import { grey400 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { ToolbarGroup } from 'material-ui/Toolbar';
import { Grid, Row, Col } from 'react-bootstrap';
import NavToolBar from '../../components/NavToolBar';
import DialogAttendanceType from '../../components/DialogAttendanceType';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);


@inject('worship')
@observer
export default class extends Component {
  @observable open = false;
  @observable isEdit = false;
  @observable type;

  handleChange = (type, value) => {
    this.type[type] = value;
  }

  handleClose = (type) => {
    const { worship } = this.props;
    this.open = false;
    if (type === 'ok') {
      worship.updateAttendanceType(this.type);
    }
    this.type = null;
  }

  toggleSortable = () => {
    this.sortable = !this.sortable;
  }

  handleEditType = (type) => {
    this.type = type;
    this.open = true;
  }

  handleMenuClick = (type, event, child) => {
    if (child.props.value === 'edit') {
      this.type = type;
      this.open = true;
    } else if (child.props.value === 'delete') {
      console.log('delete');
    }
  }

  clickAddType = () => {
    const now = moment().valueOf();
    this.type = {
      id: null,
      title: 'New Type',
      absent: false,
      defaultType: false,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    this.open = true;
  }

  render() {
    const { worship } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <NavToolBar navLabel="Attendance Types" goBackTo="/worship/attendance">
              <ToolbarGroup key={3} style={{ float: 'right' }} lastChild>
                <RaisedButton
                  label="Add Type"
                  secondary
                  onClick={this.clickAddType}
                />
              </ToolbarGroup>
            </NavToolBar>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader
                title="Attendance Types"
                subtitle="Attendance status to set a member attendance"
                avatar={
                  <Avatar>T</Avatar>
                }
              />
              <CardMedia>
                <List>
                  {worship.getAttendanceTypes().map((type, index) =>
                    <div key={index}>
                      <Divider />
                      <ListItem
                        key={index}
                        primaryText={type.title}
                        secondaryText={(type.absent) ? 'Type: absent' : 'Type: present'}
                        rightIconButton={
                          <IconMenu
                            iconButtonElement={iconButtonElement}
                            onItemClick={((...args) => this.handleMenuClick(type, ...args))}
                          >
                            <MenuItem value="edit">Edit</MenuItem>
                            <MenuItem value="delete">Delete</MenuItem>
                          </IconMenu>
                        }
                      />
                    </div>
                  )}
                </List>
              </CardMedia>
            </Card>
            <DialogAttendanceType
              open={this.open}
              isEdit={this.isEdit}
              type={this.type}
              onClose={this.handleClose}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
