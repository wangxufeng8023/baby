import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet,PixelRatio } from 'react-native';
let Mlist = require('./list/list');
let Login=require('./login');
let Button =require('../module/button');
import Dimensions from 'Dimensions';
class Mime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nametext:{textContent:'关注',sources:'../../../image/a.png'},
            passtext:{textContent:'喜好',sources:'../../../image/a.png'},
            apasstext:{textContent:'相册',sources:'../../../image/a.png'},
            emailtext:{textContent:'卡包',sources:'../../../image/a.png'},
            ddresstext:{textContent:'表情',sources:'../../../image/a.png'}
        }
    }
    
    render() {
        return (
           
                <View style={styles.container}>
                <Login />
                </View>
                );
    }
}
const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'#E8E8E8'

    },
    

});
module.exports = Mime;
