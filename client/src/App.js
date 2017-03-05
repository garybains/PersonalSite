import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import Game from './Components/Game/Game';


class App extends Component {

  render() {

    const style = {
      width: '80%',
      margin: '2% 10%',
      textAlign: 'center'
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>RealTime Multiplayer Tic Tac Toe Game</h2>
          <span className="App-subheading">Powered by React, Node/Express and Socket.io</span>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <MuiThemeProvider>
          <Paper style={style} zDepth={1}>
            <Game />
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
