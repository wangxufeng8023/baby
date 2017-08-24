import React, { Component } from 'react';
import { AppRegistry, Text,WebView, TextInput, View, StyleSheet,PixelRatio } from 'react-native';

class Address extends Component {
    constructor(props) {
        super(props); 
        this.state = {text: ''}
    }
    
    render() {
        return (
                <View style={styles.container}>
                  <WebView source={{uri:"https://www.baidu.com"}}/>
                </View>
                );
    }
}
const styles = StyleSheet.create({
    container: {flex:1,
        alignItems:'center',
        flexDirection:'row',
        margin:10
    },
      webView: {
    backgroundColor:'red',
    height: 350,
  },

});
module.exports = Address;
