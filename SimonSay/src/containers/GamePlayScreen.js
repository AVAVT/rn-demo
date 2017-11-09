//import liraries
import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Sound from "react-native-sound";

import { randomInt } from "../utilities/MathUtilities";
import ColorButton from "../components/ColorButton";

const PlayState = {
  WAITNG : "WAITING",
  HINTING: "HINTING"
}

// create a component
class GamePlayScreen extends PureComponent {
  state = {
    score: 0,
    input: [],
    flashingButtonIndex: -1,
    gameState : PlayState.HINTING
  };

  componentDidMount = () => {
    Sound.setCategory("Playback");
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
    this.setState(
      {
        input: this.state.input.concat(randomInt(0, 4)),
        userInput: [],
        score: this.state.score + scoreIncrement,
        gameState: PlayState.HINTING
      }, () => setTimeout(() => {
        this._flashButtons(0)
      }, 300)
    );
  };

  _flashButtons = index => {
    this.setState({ flashingButtonIndex: -1 });

    setTimeout(() => {
      this.setState(
        {
          flashingButtonIndex: this.state.input[index]
        },
        () => {
          index < this.state.input.length - 1
            ? this._flashButtons(index + 1)
            : this._onHintingCompleted();
        }
      );
    }, 500);
  };

  _onHintingCompleted = () => {
    this.setState({ 
      flashingButtonIndex: -1,
      gameState: PlayState.WAITNG
    });
  }

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
        this.state.userInput.length === this.state.input.length &&
          this._next(1);
      }
    );
  };

  _createButtonHandler = id => () => this._handleButtonTap(id);

  _createButtonProps = (id, color, soundName, size) => ({
    onPress         : this._createButtonHandler(id),
    backgroundColor : color,
    size            : size,
    soundName       : soundName,
    flashing        : this.state.flashingButtonIndex === id,
    disabled        : this.state.gameState === PlayState.HINTING
  })

  render() {
    const { height, width } = Dimensions.get("window");
    const halfShortSide = Math.min(width, height) / 2;

    return (
      <View style={styles.container}>
        <Text>{this.state.input.join(", ")}</Text>
        <Text>Score : {this.state.score}</Text>
        <View style={styles.row}>
          <ColorButton
            {...this._createButtonProps(0, "#D32F2F", "pling1.mp3", halfShortSide)}
          />
          <ColorButton
            {...this._createButtonProps(1, "#303F9F", "pling2.mp3", halfShortSide)}
          />
        </View>
        <View style={styles.row}>
          <ColorButton
            {...this._createButtonProps(2, "#388E3C", "pling3.mp3", halfShortSide)}
          />
          <ColorButton
            {...this._createButtonProps(3, "#7B1FA2", "pling4.mp3", halfShortSide)}
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
