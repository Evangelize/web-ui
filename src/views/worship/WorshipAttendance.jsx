import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { ToolbarGroup } from 'material-ui/Toolbar';
import { Grid, Row, Col } from 'react-bootstrap';
import NavToolBar from '../../components/NavToolBar';
import DialogWorshipAttendance from '../../components/DialogWorshipAttendance';
import DatePicker from 'material-ui/DatePicker';


@inject('worship', 'routing')
@observer
export default class extends Component {
  @observable sortable = false;
  @observable worshipDate = moment();
  @observable service;
  @observable isEdit = false;
  @observable dialogOpen = false;
  @observable classGrouping;
  @observable start = moment(moment().format('YYYY-MM-01') + ' 00:00:00').subtract(3, 'month').valueOf();
  @observable end = moment(moment().format('YYYY-MM-01') + ' 00:00:00').add(1, 'month').valueOf();
  componentWillMount() {
    const { worship } = this.props;
  }

  handleChange = (type, value) => {
    if (type === 'date') {
      this.worshipDate = moment(value);
    } else if (type === 'service') {
      this.service = value;
    }
  }

  handleOpenDialog = () => {
    this.isEdit = false;
    this.newStart = moment();
    this.dialogOpen = true;
  }

  handleEdit = (date) => {
    const { worship } = this.props;
    /*
    const div = worship.getAttendance(id);
    this.isEdit = true;
    this.start = moment(div.start);
    this.dialogOpen = true;
    */
  }

  handleClose = (type) => {
    const { routing } = this.props;
    this.dialogOpen = false;
    if (type === 'ok') {
      const path = `/worship/attendance/${this.worshipDate.valueOf()}/${this.service}`;
      routing.push(path);
    }
  }

  toggleSortable = () => {
    this.sortable = !this.sortable;
  }

  handleEditAttendance = (day, index, e) => {
    const { routing } = this.props;
    const path = `/worship/attendance/${day.date.split('|')[0]}/${day.date.split('|')[1]}`;
    routing.push(path);
  }

  changeDate = (type, ...args) => {
    console.log(args);
    this[type] = moment(args[1]).valueOf();
  }

  selectedDivisionConfig = (event, selectedIndex, value) => {
    const { worship } = this.props;
    this.classGrouping = worship.getDivisionConfig(value);
    // console.log(menuItem);
  }

  clickManageTypes = () => {
    const { routing } = this.props;
    routing.push('/worship/attendance/types');
  }

  render() {
    const { worship } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <NavToolBar navLabel="Worship Attendance" goBackTo="/dashboard">
              <ToolbarGroup key={3} style={{ float: 'right' }} lastChild>
                <RaisedButton
                  label="Add Attendance"
                  secondary
                  onClick={this.handleOpenDialog}
                />
                <IconMenu
                  iconButtonElement={
                    <IconButton touch>
                      <NavigationExpandMoreIcon />
                    </IconButton>
                  }
                >
                  <MenuItem
                    primaryText="Manage Attendance Types"
                    onClick={this.clickManageTypes}
                  />
                </IconMenu>
              </ToolbarGroup>
            </NavToolBar>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader
                title="Worship Service Attendance"
                subtitle="By Worship Service"
                avatar={
                  <Avatar>W</Avatar>
                }
              />
              <Divider />
              <CardText>
                <Row>
                  <Col xs={12} sm={4} md={6} lg={6}>
                    <DatePicker
                      hintText="Start Date"
                      floatingLabelText="Start Date"
                      value={moment(this.start).toDate()}
                      onChange={((...args) => this.changeDate('start', ...args))}
                    />
                  </Col>
                  <Col xs={12} sm={4} md={6} lg={6}>
                    <DatePicker
                      hintText="End Date"
                      floatingLabelText="End Date"
                      value={moment(this.end).toDate()}
                      onChange={((...args) => this.changeDate('end', ...args))}
                    />
                  </Col>
                </Row>
              </CardText>
              <CardMedia>
                <List>
                  {worship.getAttendanceByService(this.start, this.end).map((day, index) =>
                    <div key={index}>
                      <Divider />
                      <ListItem
                        key={index}
                        rightAvatar={<Avatar>{day.count}</Avatar>}
                        onClick={((...args) => this.handleEditAttendance(day, index, ...args))}
                        primaryText={worship.getService(day.date.split('|')[1]).title}
                        secondaryText={moment(day.date.split('|')[0], 'x').format('MMMM Do YYYY')}
                      />
                    </div>
                  )}
                </List>
              </CardMedia>
            </Card>
            <DialogWorshipAttendance
              open={this.dialogOpen}
              isEdit={this.isEdit}
              start={this.worshipDate}
              onClose={this.handleClose}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
