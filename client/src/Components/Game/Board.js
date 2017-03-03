import React, { Component } from 'react';

import Square from './Square';


class Board extends Component {
  render() {
    return (
      <div>
        playerX : {this.props.playerX}
        <br />
        playerO : {this.props.playerO}
        <br />
        {'You are : ' + this.props.playerIs}
        <br />
        <Square value={this.props.squares[0]} onClick={() => this.props.squareClicked(0)} />
        <Square value={this.props.squares[1]} onClick={() => this.props.squareClicked(1)} />
        <Square value={this.props.squares[2]} onClick={() => this.props.squareClicked(2)} />
        <br />
        <Square value={this.props.squares[3]} onClick={() => this.props.squareClicked(3)} />
        <Square value={this.props.squares[4]} onClick={() => this.props.squareClicked(4)} />
        <Square value={this.props.squares[5]} onClick={() => this.props.squareClicked(5)} />
        <br />
        <Square value={this.props.squares[6]} onClick={() => this.props.squareClicked(6)} />
        <Square value={this.props.squares[7]} onClick={() => this.props.squareClicked(7)} />
        <Square value={this.props.squares[8]} onClick={() => this.props.squareClicked(8)} />
        <br />
        <p>{this.props.status}</p>
      </div>
    )
  }
}

export default Board;
