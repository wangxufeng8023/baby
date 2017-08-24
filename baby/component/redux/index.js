import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet,TouchableOpacity,AlertIOSH } from 'react-native';
import {connect} from 'react-redux';
import {plus} from './action';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    methods(){
       this.props.dispatch(plus(1));
        }
    render() {
        return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.methods.bind(this)}>  
                       <View>
                        <Text>puls</Text>
                       </View>                    </TouchableOpacity>
                    <Text>{this.props.calculate.c}</Text>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        width:60,
        height:30,
        justifyContent:'center',
        backgroundColor:'#18B4FF',
        borderWidth:1,
        borderRadius:10,
        alignItems:'center',
        marginLeft:20,
        marginTop:20,

    },
    

});
const mapStateToProps=state=>{
    return {
calculate:state.calculate
    }
}
let Rbutton =connect(mapStateToProps)(Button);


module.exports = Rbutton;
