import React from 'react';

export class Component extends React.Component {

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
