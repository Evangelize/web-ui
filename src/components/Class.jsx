import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

@inject('routing')
@observer
class Class extends Component {
  navigate(path, e) {
    const { routing } = this.props;
    routing.push(path);
  }

  render() {
    const { item, selected, type, onSelect } = this.props;
    let Item = (
      <ListItem
        onClick={((...args) => this.navigate(`/classes/class/${item.id}`, ...args))}
        primaryText={item.title}
      />
    );
    Item = (type === 'add') ? (
      <ListItem
        leftCheckbox={
          <Checkbox
            checked={selected > -1}
            onCheck={((...args) => onSelect(item.id, ...args))}
          />
        }
        primaryText={item.title}
      />
    ) : Item;
    return (
      <div
        key={item.id}
      >
        <Divider />
        {Item}
      </div>
    );
  }
}
export default Class;
