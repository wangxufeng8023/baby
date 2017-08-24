import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet,TouchableOpacity,AlertIOSH } from 'react-native';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    methods(){
        AlertIOS.alert('提示','选择提示',[{text:'取消',onPress:()=>{alert('取消')}},{text:'确定',onPress:()=>{alert('确定')}}]);
    }
    render() {
        return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.methods.bind(this)}>  
                       <View>
                        <Text>{this.props.textContent}</Text>
                       </View>
                    </TouchableOpacity>
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
module.exports = Button;
