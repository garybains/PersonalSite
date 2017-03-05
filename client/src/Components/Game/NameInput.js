import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class NameInput extends Component {

  constructor() {
    super();
    this.state = {value : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
  }
  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.state.value);
  }
  render() {
    return(
      <div>
        <TextField
          hintText={"Please type in " + this.props.title}
          floatingLabelText={this.props.title}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <br />
        <RaisedButton onClick={this.handleClick}>O.K</RaisedButton>
        <br />
        <br />
      </div>
    )
  }
}

export default NameInput;
