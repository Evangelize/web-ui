import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

@observer
export default class extends Component {

  onTextChange = (event, payload) => {
    const { onChange } = this.props;
    onChange('title', payload);
  }

  render() {
    const { open, onClose, group, onChange } = this.props;
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
          title="Group"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          {(group) ?
            <div>
              <TextField
                hintText="Enter group title"
                value={group.title}
                onChange={this.onTextChange}
                floatingLabelText="Title"
              />
            </div> : null
          }
        </Dialog>
      </div>
    );
  }
}
