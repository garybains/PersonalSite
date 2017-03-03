import React, { Component } from 'react';
//import RaisedButton from 'material-ui/RaisedButton';


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
        <label>
          {this.props.title} : 
          <input type="text" value={this.state.value} onChange={this.handleChange}
              placeholder={"Enter a name for " + this.props.title } />
        </label>
        <button onClick={this.handleClick}>Set</button>
      </div>
    )
  }
}

export default NameInput;
