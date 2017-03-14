import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImagePanoramaFishEye from 'material-ui/svg-icons/image/panorama-fish-eye';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {grey200, blueA200, greenA200} from 'material-ui/styles/colors';


class Square extends Component {
  
  _value() {
    if (this.props.value === "X") {
        return <NavigationClose/>
    } else if (this.props.value === "O") {
        return <ImagePanoramaFishEye/>
    } else {
        return;
    }
  }

  _iconColor() {
    if (this.props.value === "X") {
        return blueA200;
    } else if (this.props.value === "O") {
        return greenA200;
    } else {
        return grey200;
    }
  }

  render() {
     const style = {
        padding: '0',
        margin: '1%'
    }

    return (
      <FloatingActionButton style={style} onClick={() => this.props.onClick()}
         iconStyle={{backgroundColor: this._iconColor()}}>
          {this._value()}
      </FloatingActionButton>
    );
  }
}

export default Square;
