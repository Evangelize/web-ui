import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import ListClasses from '../../components/ListClasses';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MediaQuery from 'react-responsive';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import { ToolbarGroup } from 'material-ui/Toolbar';
import { Grid, Row, Col } from 'react-bootstrap';
import NavToolBar from '../../components/NavToolBar';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

@inject('classes')
@observer
class Classes extends Component {
  @observable sortable = false;

  formatDateRange(division) {
    return moment(division.start).format('MMM D YYYY') + ' - ' + moment(division.end).format('MMM D YYYY')
  }

  goBack() {
    this.context.router.goBack();
  }

  toggleSortable = () => {
    this.sortable = !this.sortable;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <NavToolBar navLabel="Classes" goBackTo="/dashboard">
                <ToolbarGroup style={{ float: 'right' }} lastChild>
                  <IconMenu
                    iconButtonElement={
                      <IconButton touch>
                        <NavigationExpandMoreIcon />
                      </IconButton>
                    }
                  >
                    <MenuItem
                      primaryText="Sortable"
                      onClick={this.toggleSortable}
                      checked={this.sortable}
                    />
                    <MenuItem
                      primaryText="Add Class"
                      onClick={this.handleNewClass}
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
                  title={'Classes'}
                  subtitle={'All classes'}
                  avatar={<Avatar>{'C'}</Avatar>}
                />
                <CardMedia>
                  <ListClasses sortable={this.sortable} />
                </CardMedia>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Classes;
