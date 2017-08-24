import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet,PixelRatio } from 'react-native';

class More extends Component {
    constructor(props) {
        super(props);     this.state = {text: ''}
    }
    
    render() {
        return (
                <View style={styles.container}>
                    <Text> more页面</Text>
                   
                   <Text>
                {this.state.text}
                </Text>
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

});
module.exports = More;
