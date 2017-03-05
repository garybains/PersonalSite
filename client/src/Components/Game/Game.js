import React, { Component } from 'react';
import io from 'socket.io-client';

import Board from './Board';
import NameInput from './NameInput';
import StarterScreen from './StarterScreen';

const socket = io();


class Game extends Component {

  constructor() {
    super();
    this.state = {
      allGames: [],
      gameName: null,
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      playerX: null,
      playerO: null,
      playerIs: null,
      startGame: false
    };

    this._squareClicked = this._squareClicked.bind(this);
    this._setPlayerX = this._setPlayerX.bind(this);
    this._setPlayerO = this._setPlayerO.bind(this);
    this._serverSetPlayerX = this._serverSetPlayerX.bind(this);
    this._serverSetPlayerO = this._serverSetPlayerO.bind(this);
    this._serverUpdate = this._serverUpdate.bind(this);
    this._playerIsNext = this._playerIsNext.bind(this);
    this._createNewGameClick = this._createNewGameClick.bind(this);
    this._newGame = this._newGame.bind(this);
    this._serverGames = this._serverGames.bind(this);
    this._setGameName = this._setGameName.bind(this);
    this._serverStartGame = this._serverStartGame.bind(this);

    socket.on('server:playerX', this._serverSetPlayerX);
    socket.on('server:playerO', this._serverSetPlayerO);
    socket.on('server:update', this._serverUpdate);
    socket.on('server:allGames', this._serverGames);
    socket.on('server:startGame', this._serverStartGame);
  }

  _serverGames(data) {
    this.setState({
      allGames: data.allGames
    });
  }

  _serverStartGame(data) {
    if (data.gameName === this.state.gameName) {
      this.setState({
        startGame: true,
        playerO: data.playerO,
        playerX: data.playerX
      });
    }
  }

  _serverUpdate(data) {
    if (data.gameName === this.state.gameName) {
      this.setState({
        squares: data.game.squares,
        xIsNext: data.game.xIsNext
      });
    }
  }

  _serverSetPlayerX(data) {
    this.setState({
      playerX: data.playerX
    })
    console.log("_serverSetPlayerX ran");
  }

  _serverSetPlayerO(data) {
    this.setState({
      playerO: data.playerO
    })
    console.log("_serverSetPlayerO ran");
  }

  _setPlayerX(playerX) {
    this.setState({
      playerX: playerX,
      playerIs: "X"
    });
    socket.emit('client:newGame', {gameName: this.state.gameName, playerX});
  }

  _setPlayerO(playerO) {
    this.setState({
      playerO: playerO,
      playerIs: "O"
    });
    socket.emit('client:playerO', {gameName: this.state.gameName, playerO});
  }

  _calculateWinner(squares) {
    
    let winningCases = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [6, 4, 2] // crossed
    ];
          
    // If first second and third winning position are all the same and
    // not null return that position else null
    for (let i=0; i < winningCases.length; i += 1) {
      let firstPos = winningCases[i][0];
      let secondPos = winningCases[i][1];
      let thirdPos = winningCases[i][2];
      if ((squares[firstPos] === squares[secondPos] &&
          squares[secondPos] === squares[thirdPos]) &&
          squares[firstPos] !== null){
        return squares[firstPos];
      }
    }
    return null;
  }

  _squareClicked(idx) {
    // return if there is already a winner or the square has already been taken
    const squares = this.state.squares.slice();
    let winner = this._calculateWinner(this.state.squares);
    if ( winner || (squares[idx] !== null) ) {return;}
    
    // return if current turn belong to the other player
    const NextPlayerIs = this.state.xIsNext ? 'X' : 'O';
    if (NextPlayerIs !== this.state.playerIs) {return;}

    squares[idx] = NextPlayerIs;

    const xIsNextNegative = !this.state.xIsNext;

    socket.emit('client:update', {
      gameName: this.state.gameName,
      squares: squares,
      xIsNext: xIsNextNegative,
    });
    this.setState({
      squares: squares,
      xIsNext: xIsNextNegative,
      winner: this._calculateWinner(this.state.squares)
    });
  }

  _playerIsNext() {
    return this.state.playerIs === (this.state.xIsNext ? 'X' : 'O');
  }

  _createNewGameClick(gameName) {
    this.setState({
      gameName: gameName,
      playerIs: "X"
    });
  }

  _newGame(name) {
    console.log("Game: "+name);
  }

  _setGameName(gameName) {
    this.setState({
      gameName: gameName,
      playerIs: "O"
    });
  }

  render() {

    if (! this.state.startGame) {
        if (! this.state.playerIs) {
            return (
              <StarterScreen
                allGames={this.state.allGames}
                gameJoinClick={this._setGameName}
                createNewGameClick={this._createNewGameClick}
              />
            )
        } else if (this.state.playerIs === "X") {
            if ( ! this.state.playerX) {
                return (
                  <NameInput title="Your Name" onClick={this._setPlayerX} />
                )
            } else {
                return (
                  <div>
                    <br />
                    <br />
                    <br />
                    <h3>{"Ask for other player to join the Game : " + this.state.gameName}</h3>
                    <br />
                    <br />
                    <br />
                  </div>
                );
            }
        } else if (this.state.playerIs === "O") {
            if ( ! this.state.playerO) {
                return (
                  <div>
                    <NameInput title="Your Name" onClick={this._setPlayerO} />
                    <br />
                  </div>
                );
            } else {
              return(<div>More to come...</div>)
            }
        }
    } else {
        let winner = this._calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = this.state.playerIs === winner ?
                      "You Won !!" : "Lost it, better luck next time";
        } else {
          status = this._playerIsNext() ?
                      "Play ... make a move" :
                      "Wait for other player to play their turn";
        }
        return (
          <Board playerX={this.state.playerX} playerO={this.state.playerO}
              playerIs={this.state.playerIs} squares={this.state.squares}
              squareClicked={this._squareClicked} status={status} />
        )
    }
  }
}

export default Game;
