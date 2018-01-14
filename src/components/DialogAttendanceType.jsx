import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
};

@inject('worship')
@observer
export default class extends Component {

  onSelectChange = (event, key, payload) => {
    const { onChange } = this.props;
    onChange('absent', payload);
  }

  onTextChange = (event, payload) => {
    const { onChange } = this.props;
    onChange('title', payload);
  }

  onToggleChange = (event, payload) => {
    const { onChange } = this.props;
    onChange('defaultType', payload);
  }

  render() {
    const { open, onClose, worship, type, onChange } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={((...args) => onClose('cancel', ...args))}
        id="cancel"
      />,
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={((...args) => onClose('ok', ...args))}
        id="ok"
      />,
    ];

    return (
      <div>
        <Dialog
          title="Attendance Type"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          {(type) ?
            <div>
              <TextField
                hintText="Enter attendance type title"
                value={type.title}
                onChange={this.onTextChange}
                floatingLabelText="Title"
              />
              <br />
              <SelectField
                floatingLabelText="Select type"
                value={type.absent}
                onChange={this.onSelectChange}
              >
                <MenuItem
                  value={false}
                  primaryText="Present"
                />
                <MenuItem
                  value={true}
                  primaryText="Absent"
                />
              </SelectField>
              <br />
              <div style={styles.block}>
                <Toggle
                  label="Type Default"
                  value={type.defaultType}
                  toggled={type.defaultType}
                  onToggle={this.onToggleChange}
                />
              </div>
              <div>You can only have one default per type (present or absent)</div>
            </div> : null
          }
        </Dialog>
      </div>
    );
  }
}
