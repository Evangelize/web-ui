import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, debounce, defaults, defaultTo, values } from 'lodash';

class FormEditWrapper extends Component {
  static propTypes = {
    value : PropTypes.any.isRequired,
    isEditing : PropTypes.bool,
    onChange : PropTypes.func,
    valuePropName : PropTypes.string,
    onChangePropName : PropTypes.string,
    singleValue : PropTypes.bool,
    passIsEditing : PropTypes.bool,
    dispatchDelay : PropTypes.number,
  }
  
  static defaultProps = {
    isEditing: true,
    onChange: noop,
    valuePropName: 'value',
    onChangePropName: 'onChange',
    singleValue: false,
    passIsEditing: true,
    dispatchDelay: 250,
  }

  constructor(props) {
    super(props);
    const boundDispatchAttributes = this.dispatchAttributeChange.bind(this);
    this.dispatchAttributeChange = debounce(boundDispatchAttributes, props.dispatchDelay);
    const value = (props.singleValue) ? '' : {};
    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Reset any component-local changes  Note that the incoming props
    // SHOULD match the changes we just had in local state.
    this.setState({ value: nextProps.value });
  }

  onChildChange = (e, v) => {
    const { isEditing, singleValue } = this.props;

    if (isEditing) {
      const newValues = v;

      if (newValues || typeof newValues === 'string') {
        const change = (singleValue) ? newValues : {
          ...this.state.value,
          ...newValues,
        };

        // Update our component-local state with these changes, so that the child components
        // will re-render with the new values right away
        this.setState({ value : change });

        // Because this is debounced, we will only call the passed-in props.onChange
        // once there is a pause in changes (like letting go of a held-down key)
        this.dispatchAttributeChange(change);
      }
    }
  }

  dispatchAttributeChange(change) {
    this.props.onChange(change);
  }

  render() {
    const { value: propsValue, children } = this.props;
    const { isEditing, passIsEditing, valuePropName, onChangePropName, singleValue } = this.props;
    const { value: stateValue = (singleValue) ? '' : {} } = this.state;

    // Use incoming values from props IF there is no corresponding value
    // in local component state.  This allows local changes to win out.
    const currentValues = (singleValue) ? defaultTo(stateValue, propsValue) : defaults({}, stateValue, propsValue);

    let valueToPassDown = currentValues;

    //if (singleValue) {
    //  valueToPassDown = currentValues;
    //}

    const editingValue = passIsEditing ? { isEditing } : {};

    // Force the child form to re-render itself with these values
    const child = React.Children.only(children);

    const updatedChild = React.cloneElement(child, {
      [valuePropName]: valueToPassDown,
      [onChangePropName]: this.onChildChange,
    });

    return updatedChild;
  }
}

export default FormEditWrapper;
