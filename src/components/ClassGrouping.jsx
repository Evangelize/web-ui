import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

@inject('routing')
@observer
class ClassGrouping extends Component {
  render() {
    const { item, routing } = this.props;

    return (
      <div>
        <Divider />
        <ListItem
          onClick={((...args) => routing.push(`/classes/schedule/manage/${item.id}`))}
          primaryText={item.title}
        />
      </div>
    );
  }
}
export default ClassGrouping;
