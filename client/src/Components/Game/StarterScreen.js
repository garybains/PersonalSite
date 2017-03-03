import React, { Component } from 'react';

import NameInput from './NameInput';


class StarterScreen extends Component {

    render(){

        const styles = {
            heading: {
                width: '100%'
            },
            section: {
                display: 'inline-block',
                width: '40%',
                padding: '5%'
            }
        }

        const games = this.props.allGames.map((game, i) => {
            return(
                <li key={i}>
                    <button onClick={() => this.props.gameJoinClick(game)}>{game}</button>
                </li>
            )
        });

        return(
            <div>
                <h2 style={styles.heading}>Starter Screen</h2>
                <div style={styles.section}>
                    <h3>Play Game</h3>
                    <ul>
                        {games}
                    </ul>
                </div>
                <div style={styles.section}>
                    <NameInput title={"New Game"} onClick={this.props.createNewGameClick} />
                </div>
            </div>
        )
    }

}

export default StarterScreen;
