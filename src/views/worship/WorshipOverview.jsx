import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import NavToolBar from '../../components/NavToolBar';
import RenderPeople from '../../components/RenderPeople';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import { Grid, Row, Col } from 'react-bootstrap';

@inject('people')
@observer
export default class WorshipOverview extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <NavToolBar navLabel="Worship" goBackTo="/dashboard" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
