import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as Colors from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader/Subheader';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import ActionGrade from 'material-ui/svg-icons/action/grade';
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
export default class AddFamilyMember extends Component {
  @observable family;
  @observable division;
  @observable divisionYear;
  @observable day;
  @observable searchType = 'lastName';
  @observable people = [];
  @observable searchValue;

  componentDidMount() {
    this.getFamily();
  }

  componentWillReceiveProps() {
    this.getFamily();
  }

  getFamily = () => {
    const { people, match } = this.props;
    if (!this.family) {
      this.family = people.getFamily(match.params.id);
    }
  }

  handleInputChange = (value) => {
    this.searchValue = value;
  }

  handleSelectValueChange = (e, index, value) => {
    this.searchType = value;
  }

  menuItemTap = (person, item, event) => {
    let opts;
    const { people, match } = this.props;

    switch (item) {
    case 'add':
      people.addPersonToFamily(person, this.family.id);
      break;
    case 'delete':
      people.deletePersonFromFamily(person);
      break;
    default:
      break;
    }
  }

  render() {
    const { people, match } = this.props;
    const dropDownStyle = {
      marginTop: '15px',
    };
    const searchResults = (this.searchValue && this.searchValue.length) ? people.findPeople(this.searchValue, this.searchType) : [];
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <NavToolBar navLabel="Add Family Members" goBackTo={(this.family) ? `/people/families/family/${this.family.id}` : null} />
          </Col>
        </Row>
        {(this.family) ?
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Card>
                <CardHeader
                  title={this.family.name}
                  subtitle={this.family.familyName}
                  avatar={(this.family.name) ? <Avatar>{this.family.name.charAt(0)}</Avatar> : null}
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
                        value={this.searchValue}
                        onChange={this.handleInputChange}
                        singleValue
                      >
                        <TextField
                          className={'searchBox'}
                          ref="searchField"
                          floatingLabelText="Search"
                          value={this.searchValue}
                        />
                      </FormEditWrapper>
                    </Col>
                  </Row>
                </CardMedia>
                <CardMedia>
                  {searchResults.length ?
                    <div>
                      <List>
                        <Subheader>Search Results</Subheader>
                        {searchResults.map((person, index) =>
                          <ListItem
                            key={person.id}
                            rightIconButton={
                              <IconMenu iconButtonElement={iconButtonElement}>
                                <MenuItem onClick={((...args) => this.menuItemTap(person, 'add', ...args))}>Add</MenuItem>
                              </IconMenu>
                            }
                            primaryText={`${person.lastName}, ${person.firstName}`}
                          />
                        )}
                      </List>
                    </div> : null
                  }
                  <Subheader>Family Members</Subheader>
                  <RenderPeople
                    people={people.getFamilyMembers(this.family.id)}
                    onTap={this.menuItemTap}
                    rightMenuItems={[
                      'Delete',
                    ]}
                  />
                </CardMedia>
              </Card>
            </Col>
          </Row> : null
        }
      </Grid>
    );
  }
}
