/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ProgressViewIOS,
    PanResponder,
    Dimensions,
    
} from 'react-native';
let PizzaTranslator=require('./component/textInput');
let totalWidth=200;      //=Dimensions.get('window').width;

export default class www extends Component {
    constructor(props){super(props);
        this.state={progress:0}
    
    }
    componentWillMount(){
        this.watcher = PanResponder.create({
                                           onStartShouldSetPanResponder:()=>true,
                                           onPanResponderGrant:this._onPanResponderGrant,
                                           onPanResponderMove:this._onPanResponderMove,});
        console.log("componentWillMount");
    }
    
    _onPanResponderGrant = (event,getureState)=>{
        let touchPointX = getureState.x0;
        let progress;
        if(touchPointX<20)progress=0;
        else{
            if(touchPointX>(totalWidth-20)) progress=1;
            else
            {
                progress=(touchPointX-20)/(totalWidth-40);
            }
            
            
        }
        this.setState({progress});
        console.log(this.state.progress);
        
    }
    
    
    
    _onPanResponderMove = (event,getureState)=>{
        let touchPointX = getureState.moveX;
        let progress;
        if(touchPointX<20)progress=0;
        else{
            if(touchPointX>(totalWidth-20)) progress=1;
            else
            {
                progress=(touchPointX-20)/(totalWidth-40);
            }
            
            
        }
        this.setState({progress});
        console.log(1);
        
    }
    show=()=>{alert(1);console.log('wangxufeng');}
    render() {
        return (
                <View style={styles.container}>
                { /*<ProgressViewIOS progress={this.state.progress} style={styles.ProgressViewStyle} />
                <Text style={styles.welcome} onPress={this.show.bind(this)}>
                你选择了{Math.round(this.state.progress*100)}%
                </Text>
                <View style={styles.touchViewStyle} {...this.watcher.panHandlers} >
                </View>*/}
                < PizzaTranslator/>
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F5FCFF',
                                 },
                                 welcome: {
                                 fontSize: 20,
                                 textAlign: 'center',
                                 top:70,
                                 left:20,
                                 margin: 10,
                                 },
                                 ProgressViewStyle: {
                                 width:totalWidth-40,
                                 left:20,
                                 top:50,
                                 },
                                 
                                 touchViewStyle: {
                                 
                                 width:totalWidth-20,
                                 height:40,
                                 //backgroundColor:'transparent',
                                 position:'absolute',
                                 left:10,
                                 top:30,
                                 },
                                 instructions: {
                                 textAlign: 'center',
                                 color: '#333333',
                                 marginBottom: 5,
                                 },
                                 });

AppRegistry.registerComponent('www', () => www);
