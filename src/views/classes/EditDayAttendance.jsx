import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import NavToolBar from '../../components/NavToolBar';
import DisplayClassAttendance from '../../components/DisplayClassAttendance';

@inject('classes')
@observer
export default class EditDayAttendance extends Component {
  render() {
    const { classes, match } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <NavToolBar navLabel="Edit Attendance" goBackTo="/classes/attendance" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <DisplayClassAttendance date={parseInt(match.params.date, 10)} divisionConfig={classes.getDivisionConfig(match.params.divisionConfig)} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
