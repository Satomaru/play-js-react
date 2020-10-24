import React from 'react';
import { jsxHelper } from './jsx-helper.jsx';

export class Component extends React.Component {

  render() {
    return jsxHelper.render(this, this.createView);
  }
}
