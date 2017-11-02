/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Button } from "react-native";

import GamePlayScreen from './containers/GamePlayScreen';

export default class App extends Component<{}> {
  render() {
    return (
      <GamePlayScreen />
    );
  }
}
