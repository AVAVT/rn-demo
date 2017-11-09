//import liraries
import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import Sound from 'react-native-sound';

import { randomInt } from "../utilities/MathUtilities";
import ColorButton from '../components/ColorButton';

// create a component
class GamePlayScreen extends PureComponent {
  state = {
    score: 0,
    input: []
  };

  componentDidMount = () => {
    Sound.setCategory('Playback');
    this._initGame();
  };

  _initGame = () => {
    this.setState(
      {
        input: [],
        userInput: [],
        score: 0
      },
      this._next
    );
  };

  _next = (scoreIncrement = 0) => {
    this.setState({
      input: this.state.input.concat(randomInt(0, 4)),
      userInput: [],
      score : this.state.score + scoreIncrement
    });
  };

  _handleButtonTap = id => {
    const { input, userInput } = this.state;

    input[userInput.length] === id
      ? this._onInputCorrect(id)
      : this._initGame();
  };

  _onInputCorrect = id => {
    this.setState(
      {
        userInput: this.state.userInput.concat(id)
      },
      () => {
        this.state.userInput.length === this.state.input.length && this._next(1);
      }
    );
  };

  _createButtonHandler = id => () => this._handleButtonTap(id);

  render() {
    const { height, width } = Dimensions.get("window");
    const halfShortSide = Math.min(width, height) / 2;

    return (
      <View style={styles.container}>
        <Text>{this.state.input.join(", ")}</Text>
        <Text>Score : {this.state.score}</Text>
        <View style={styles.row}>
          <ColorButton
            onPress={this._createButtonHandler(0)}
            backgroundColor="#D32F2F"
            size={halfShortSide}
            soundName="pling1.mp3"
          />
          <ColorButton
            onPress={this._createButtonHandler(1)}
            backgroundColor="#303F9F"
            size={halfShortSide}
            soundName="pling2.mp3"
          />
        </View>
        <View style={styles.row}>
          <ColorButton
            onPress={this._createButtonHandler(2)}
            backgroundColor="#388E3C"
            size={halfShortSide}
            soundName="pling3.mp3"
          />
          <ColorButton
            onPress={this._createButtonHandler(3)}
            backgroundColor="#7B1FA2"
            size={halfShortSide}
            soundName="pling4.mp3"
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  row: {
    flex: 0,
    flexDirection: "row"
  }
});

//make this component available to the app
export default GamePlayScreen;
