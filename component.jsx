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

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.alertWhenError(this.props.onClick, ...(this.createArgsOnClick(event)));
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
