import React, { Component } from 'react';

class Square extends Component {
  _value() {
    if (this.props.value) {
      return this.props.value;
    } else {
      return "_";
    }
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this._value()}
      </button>
    );
  }
}

export default Square;
