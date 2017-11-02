//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

// const AnotherText = (props) => ( <Text>{props.children}</Text>)
const ColorButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={{
        backgroundColor: props.backgroundColor,
        width: props.size,
        height: props.size
      }}
    />
  </TouchableOpacity>
);

// create a component
class GamePlayScreen extends Component {
  render() {
    const { height, width } = Dimensions.get("window");
    const halfShortSide = Math.min(width, height) / 2;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <ColorButton
            onPress={() => {}}
            backgroundColor="red"
            size={halfShortSide}
          />
          <ColorButton
            onPress={() => {}}
            backgroundColor="blue"
            size={halfShortSide}
          />
        </View>
        <View style={styles.row}>
          <ColorButton
            onPress={() => {}}
            backgroundColor="yellow"
            size={halfShortSide}
          />
          <ColorButton
            onPress={() => {}}
            backgroundColor="magenta"
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
    flexDirection : 'row'
  }
});

//make this component available to the app
export default GamePlayScreen;
