import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import NavToolBar from '../../components/NavToolBar';
import { Grid, Row, Col } from 'react-bootstrap';

@inject('utils')
@observer
export default class Main extends Component {
  resetDatabase = async () => {
    const { utils } = this.props;
    await utils.resetDatabase();
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <NavToolBar navLabel="Settings" goBackTo="/dashboard" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Card>
                <CardHeader
                  title={'Settings'}
                  subtitle={'Update configuration of Evangelize'}
                  avatar={<Avatar>{'S'}</Avatar>}
                />
                <CardMedia>
                  <RaisedButton
                    label="Reset Database"
                    secondary
                    onClick={this.resetDatabase}
                  />
                </CardMedia>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
