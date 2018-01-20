import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import MediaQuery from 'react-responsive';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { Grid, Row, Col } from 'react-bootstrap';
import Timeline from 'react-calendar-timeline';
import NavToolBar from '../../components/NavToolBar';
import DisplayDivisionClasses from '../../components/DisplayDivisionClasses';

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',    // key for item div content
  itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
  itemGroupKey: 'class',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
};

const defaultTimeStart = moment();
const defaultTimeEnd = moment().add(3, 'months');

@inject('classes')
@observer
export default class AcademicYearTimeline extends Component {
  @observable openMenu = false;
  @observable anchorEl = {};
  @observable division;
  @observable academicYear;
  @observable divisionConfig;
  @observable classes = [];

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps() {
    this.getData();
  }

  getData = () => {
    const { classes } = this.props;
    const divisionConfigs = classes.getDivisionConfigs();
    if (!this.academicYear && divisionConfigs) {
      const year = (divisionConfigs.length) ? classes.getCurrentDivisionYear(divisionConfigs[0].id) : [];
      const division = (year) ? classes.getCurrentDivisionSchedule(year.id) : null;
      this.academicYear = (year) ? year.id : null;
      this.divisionConfig = (divisionConfigs.length) ? divisionConfigs[0].id : null;
      this.division = (division) ? division.id : null;
      this.classes = classes.getCurrentDivisionClasses(this.division);
    }
  }

  selectedYear = (event, selectedIndex, value) => {
    const { classes } = this.props;
    this.academicYear = value;
    const divisions = classes.getDivisionSchedules(value);
    this.division = (divisions.length > 0) ? divisions[0].id : null;
  }

  selectedDivisionConfig = (event, selectedIndex, value) => {
    const { classes } = this.props;
    this.divisionConfig = value;
    const year = classes.getCurrentDivisionYear(value);
    const division = (year) ? classes.getCurrentDivisionSchedule(year.id) : null;
    this.academicYear = (year) ? year.id : null;
    this.division = (division) ? division.id : null;
  }

  selectedDivision = (event, selectedIndex, value) => {
    this.division = value;
  }

  formatDateRange(division) {
    return moment(division.start).format('MMM D YYYY') + ' - ' + moment(division.end).format('MMM D YYYY');
  }

  confirmTeacher(divClass, classDay, teacher, event) {
    const { classes } = this.props;
    const confirmed = !teacher.divClassTeacher.confirmed;
    classes.confirmTeacher(confirmed, divClass.divisionClass.id, teacher.divClassTeacher.id);
  }

  itemSelected = (item, type, e) => {
    console.log(item, type);
    this[type] = item.id;
  }

  goToManageSchedule = (e) => {
    browserHistory.push('/classes/schedule/manage/');
  }

  handleOpenMenu = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.openMenu = true;
    this.anchorEl = event.currentTarget;
  }

  handleRequestClose = () => {
    this.openMenu = false;
  }

  printPlacards = async (event) => {
    const { classes } = this.props;
    const data = await classes.printDivisionPlacards(this.division);
    console.log(data);
    if (data) {
      const filename = `pdf-${new Date().getTime()}.pdf`;
      if (typeof window.chrome !== 'undefined') {
          // Chrome version
        const link = document.createElement('a');
        const contentType = 'application/pdf';
        const blob = b64toBlob(data, contentType);
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE version
        const blob = new Blob([data], { type: 'application/pdf' });
        window.navigator.msSaveBlob(blob, filename);
      } else {
          // Firefox version
        const file = new File([data], filename, { type: 'application/force-download' });
        window.open(URL.createObjectURL(file));
      }
    }
  }

  handleCanvasClick = (groupId, time, event) => {
    console.log('Canvas clicked', groupId, time)
  }

  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, time)
  }

  handleItemClick = (itemId) => {
    console.log('Clicked: ' + itemId)
  }

  handleItemSelect = (itemId) => {
    console.log('Selected: ' + itemId)
  }

  handleItemDoubleClick = (itemId) => {
    console.log('Double Click: ' + itemId)
  }

  handleItemContextMenu = (itemId) => {
    console.log('Context Menu: ' + itemId)
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: dragTime,
        end: dragTime + (item.end - item.start),
        group: group.id
      }) : item)
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: edge === 'left' ? time : item.start,
        end: edge === 'left' ? item.end : time
      }) : item)
    })

    console.log('Resized', itemId, time, edge)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  moveResizeValidator = (action, item, time, resizeEdge) => {
    if (time < new Date().getTime()) {
      const newTime = Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  render() {
    const { configs, classes } = this.props;
    const items = [];
    const tableStyle = {
      displayRowCheckbox: false,
      deselectOnClickaway: true,
      stripedRows: false,
      showRowHover: false,
      fixedHeader: true,
      fixedFooter: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      height: '300px',
      adjustForCheckbox: false,
      displaySelectAll: false,
    };

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader
                title={'Classes'}
                subtitle={'Timeline'}
                avatar={<Avatar>C</Avatar>}
              />
              <CardMedia>
                <Timeline
                  groups={this.classes}
                  items={items}
                  keys={keys}
                  fixedHeader="fixed"
                  fullUpdate

                  sidebarWidth={150}
                  sidebarContent={<div>Classes</div>}
                  rightSidebarWidth={150}
                  rightSidebarContent={<div>Classes</div>}

                  canMove={false}
                  canResize={false}
                  canSelect

                  itemsSorted
                  itemTouchSendsClick={false}
                  stackItems
                  itemHeightRatio={0.75}

                  showCursorLine

                  // resizeDetector={containerResizeDetector}

                  defaultTimeStart={defaultTimeStart}
                  defaultTimeEnd={defaultTimeEnd}

                  // itemRenderer={this.itemRenderer}
                  // groupRenderer={this.groupRenderer}

                  onCanvasClick={this.handleCanvasClick}
                  onCanvasContextMenu={this.handleCanvasContextMenu}

                  onItemClick={this.handleItemClick}
                  onItemSelect={this.handleItemSelect}
                  onItemContextMenu={this.handleItemContextMenu}

                  onTimeChange={this.handleTimeChange}

                  moveResizeValidator={this.moveResizeValidator}
                />
              </CardMedia>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
