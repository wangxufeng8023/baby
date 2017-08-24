/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import Provider from 'react-redux';

let Main = require('./component/main/main');
export default class baby extends Component {
  render() {
      return (
        <View style={styles.container}>
          <Main />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
 
});

AppRegistry.registerComponent('baby', () =>baby);
