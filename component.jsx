import React from 'react';

export class Component extends React.Component {

  static alertWhenError = (callback, ...args) => {
    try {
      return callback(...args);
    } catch (error) {
      window.alert(error.message || error);
      throw error;
    }
  }

  setStateOrAlert = (callback) => {
    this.setState((state, props) => Component.alertWhenError(callback, state, props));
  }

  createEventArgs = (callback, event) => {
    return (callback) ? Component.alertWhenError(callback, event) : [];
  }

  handleChange = (event) => {
    if (!this.props.disabled && this.props.onChange) {
      const args = this.createEventArgs(this.argsOnChange, event);
      Component.alertWhenError(this.props.onChange, ...args);
    }
  }

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      const args = this.createEventArgs(this.argsOnClick, event);
      Component.alertWhenError(this.props.onClick, ...args);
    }
  }

  handleContextMenu = (event) => {
    event.preventDefault();

    if (!this.props.disabled && this.props.onContextMenu) {
      const args = this.createEventArgs(this.argsOnContextMenu, event);
      Component.alertWhenError(this.props.onContextMenu, ...args);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.props.disabled && this.props.onSubmit) {
      const args = this.createEventArgs(this.argsOnSubmit, event);
      Component.alertWhenError(this.props.onSubmit, new FormData(event.target), ...args);
    }
  }

  render() {
    try {
      const view = this.createView();

      if (!view) {
        throw new Error("illegal view.");
      }

      return view;
    } catch (error) {
      return (
        <div className="render-error">
          {error.message || error} in {this.constructor.name}
        </div>
      );
    }
  }
}
