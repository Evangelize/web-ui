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
import { Grid, Row, Col } from 'react-bootstrap';


export default inject('auth')(observer(() => (
  <Card>
    <CardHeader
      title={'Unknown User Profile'}
      subtitle={'Evangelize is unable to find your user profile'}
      avatar={<Avatar>{'U'}</Avatar>}
    />
    <CardText>
      <div>Please select your Congregation</div>
    </CardText>
  </Card>
  )));
