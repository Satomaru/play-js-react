import React from 'react';

export class Component extends React.Component {

  alertWhenError = (callback, ...args) => {
    try {
      return callback(...args);
    } catch (error) {
      window.alert(error.message || error);
      throw error;
    }
  }

  createEventArgs = (event, callback) => (callback) ? callback(event) : [];

  handleChange = (event) => {
    if (!this.props.disabled && this.props.onChange) {
      const args = this.createEventArgs(event, this.argsOnChange);
      this.alertWhenError(this.props.onChange, ...args);
    }
  }

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      const args = this.createEventArgs(event, this.argsOnClick);
      this.alertWhenError(this.props.onClick, ...args);
    }
  }

  handleContextMenu = (event) => {
    event.preventDefault();

    if (!this.props.disabled && this.props.onContextMenu) {
      const args = this.createEventArgs(event, this.argsOnContextMenu);
      this.alertWhenError(this.props.onContextMenu, ...args);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.props.disabled && this.props.onSubmit) {
      const args = this.createEventArgs(event, this.argsOnSubmit);
      this.alertWhenError(this.props.onSubmit, new FormData(event.target), ...args);
    }
  }

  render() {
    try {
      return this.createView();
    } catch (error) {
      return (
        <div className="render-error">
          {error.message || error} in {this.constructor.name}
        </div>
      );
    }
  }
}
