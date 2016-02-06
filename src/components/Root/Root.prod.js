import React, { Component } from 'react';
import App from '../App';

class Root extends Component {
  render() {
    return <App {...this.props} />;
  }
}

export default Root;
