import React, { Component } from 'react';
import './Caption.css';

export default class Caption extends Component {
  render() {
    return (
      <div className="caption">
        <div className="caption__text">{this.props.text}</div>
      </div>
    );
  }
}