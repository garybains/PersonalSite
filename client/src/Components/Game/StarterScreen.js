import React, { Component } from 'react';

import NameInput from './NameInput';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';


class StarterScreen extends Component {

    render(){

        const styles = {
            heading: {
                paddingTop: '50px'
            },
            section: {
                display: 'inline-block',
                width: '100%',
                padding: '0',
                margin: '0'
            },
            gameBtn: {
                width: '60%',
                margin: '5px'
            }

        }

        const games = this.props.allGames.map((game, i) => {
            return(
                <RaisedButton label={game} key={i}
                    onClick={() => this.props.gameJoinClick(game)}
                    style={styles.gameBtn}
                />
            )
        });

        return(
            <div>
                <h2 style={styles.heading}>Create a new Game </h2>
                <div style={styles.section}>
                    <NameInput title={"New Game"} onClick={this.props.createNewGameClick} />
                </div>
                <div style={styles.section}>
                    <h2>OR</h2>
                    <Divider />
                    <h3>Play one of these Game</h3>
                        {games.length > 0 ? games : "No games are online Why not create your own above"}
                    <br />
                    <br />
                </div>
            </div>
        )
    }

}

export default StarterScreen;
