import React from 'react';

export const jsxHelper = {

  render: (caller, callback) => {
    try {
      return callback();
    } catch (error) {
      return (
        <div className="render-error">
          {error.message || error} in&nbsp;
          {caller.name || caller.constructor?.name || caller}
        </div>
      );
    }
  },

  handleClick: (event, props, ...args) => {
    if (!props.disabled && props.onClick) {
      jsxHelper.alertWhenError(props.onClick, ...args);
    }
  },

  handleContextMenu: (event, props, ...args) => {
    event.preventDefault();

    if (!props.disabled && props.onContextMenu) {
      jsxHelper.alertWhenError(props.onContextMenu, ...args);
    }
  },

  handleChange: (event, props, ...args) => {
    if (!props.disabled && props.onChange) {
      jsxHelper.alertWhenError(props.onChange, ...args);
    }
  },

  handleSubmit: (event, props, ...args) => {
    event.preventDefault();

    if (!props.disabled && props.onSubmit) {
      jsxHelper.alertWhenError(props.onSubmit, new FormData(event.target), ...args);
    }
  },

  alertWhenError: (callback, ...args) => {
    try {
      return callback(...args);
    } catch (error) {
      window.alert(error.message || error);
      throw error;
    }
  }
}
