import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet } from 'react-native';
let Formelement = require('./formelement');
class PizzaTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {nametext:{names:'姓      名',textcontent:'请输入您的姓名'},passtext:{names:'密      码',textcontent:'请输入您的密码'},apasstext:{names:'确认密码',textcontent:'请输入您的密码'},emailtext:{names:'邮      箱',textcontent:'请输入您的邮箱'},addresstext:{names:'地      址',textcontent:'请输入您的地址'}}}
    render() {
        return (  <View style={styles.container}>
                <Formelement {...this.state.nametext} />
                <Formelement {...this.state.passtext} />
                <Formelement {...this.state.apasstext} />
                <Formelement {...this.state.emailtext} />
                <Formelement {...this.state.addresstext} />
                
                </View>
                
                );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        position:'absolute',
        left:10,
        top:30,
        },
});
module.exports = PizzaTranslator;