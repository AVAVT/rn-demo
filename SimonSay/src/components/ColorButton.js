import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Sound from "react-native-sound";

class ColorButton extends PureComponent {
  state = {
    sound: new Sound(this.props.soundName, Sound.MAIN_BUNDLE, error => {
      error && console.log(
          "failed to load the sound",
          this.props.soundName,
          ": ",
          error
        );
    })
  };

  _onPress = () => {
    this.state.sound.stop(() => this.state.sound.play());
    this.props.onPress();
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          width: this.props.size,
          height: this.props.size
        }}
        onPress={this._onPress}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 4,
            backgroundColor: this.props.backgroundColor
          }}
        />
      </TouchableOpacity>
    );
  }
}

//make this component available to the app
export default ColorButton;
