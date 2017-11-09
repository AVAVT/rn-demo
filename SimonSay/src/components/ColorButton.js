import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
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
    }),
    opacity: new Animated.Value(1)
  };

  componentWillUpdate(props) {
    props.flashing && this._flash();
  }

  _flash = () => {
    this.state.sound.stop(() => this.state.sound.play());
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing : Easing.in
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }

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
        disabled={this.props.disabled}
        onPress={this._onPress}
      >
        <Animated.View
          style={{
            flex: 1,
            borderRadius: 4,
            opacity: this.state.opacity,
            backgroundColor: this.props.backgroundColor
          }}
        />
      </TouchableOpacity>
    );
  }
}

//make this component available to the app
export default ColorButton;
