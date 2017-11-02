//import liraries
import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

// const AnotherText = (props) => ( <Text>{props.children}</Text>)
const ColorButton = props => (
  <TouchableOpacity
    style={{
      padding: 10,
      width: props.size,
      height: props.size
    }}
    onPress={props.onPress}
  >
    <View
      style={{
        flex: 1,
        borderRadius: 4,
        backgroundColor: props.backgroundColor
      }}
    />
  </TouchableOpacity>
);

// create a component
class GamePlayScreen extends PureComponent {
  state = {
    score : 0,
    input : []
  }

  componentDidMount = () => {
    this.setState({
      input : [1,2,0]
    })

    // this.state.input.concat( [3] ) => [1,2,0,3]
  }

  _handleButtonTap = id => {
    this.setState({
      score : this.state.score + 1
    });

    // Object.assign({}, this.state, {
    //   score : this.state.score + 1
    // });
    // this.state.score += 1; DONT DO THIS
  };
  
  // currying
  _createButtonHandler = id => () => this._handleButtonTap(id);

  render() {
    const { height, width } = Dimensions.get("window");
    const halfShortSide = Math.min(width, height) / 2;

    return (
      <View style={styles.container}>
        <Text>{this.state.input.join(', ')}</Text>
        <Text>Score : {this.state.score}</Text>
        <View style={styles.row}>
          <ColorButton
            onPress={this._createButtonHandler(0)}
            backgroundColor="#D32F2F"
            size={halfShortSide}
          />
          <ColorButton
            onPress={this._createButtonHandler(1)}
            backgroundColor="#303F9F"
            size={halfShortSide}
          />
        </View>
        <View style={styles.row}>
          <ColorButton
            onPress={this._createButtonHandler(2)}
            backgroundColor="#388E3C"
            size={halfShortSide}
          />
          <ColorButton
            onPress={this._createButtonHandler(3)}
            backgroundColor="#7B1FA2"
            size={halfShortSide}
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
