import React, { Component } from 'react';
import App from '../App';
import DevTools from '../DevTools';

class Root extends Component {
  render() {
    return (
      <div>
        <App {...this.props} />
        <DevTools />
      </div>
    );
  };
}

export default Root;
