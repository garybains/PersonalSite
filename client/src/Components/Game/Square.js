import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageCropSquare from 'material-ui/svg-icons/image/crop-square';
import ImagePanoramaFishEye from 'material-ui/svg-icons/image/panorama-fish-eye';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Square extends Component {
  
  _value() {
    if (this.props.value === "X") {
        return <NavigationClose/>
    } else if (this.props.value === "O") {
        return <ImagePanoramaFishEye/>
    } else {
        return <ImageCropSquare/>;
    }
  }

  render() {

    const style = {
        padding: '0',
        margin: '1%'
    }

    return (
      <FloatingActionButton style={style} onClick={() => this.props.onClick()}
        secondary={this.props.value}>
          {this._value()}
      </FloatingActionButton>
    );
  }
}

export default Square;
