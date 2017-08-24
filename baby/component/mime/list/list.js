import React, { Component } from 'react';
import { AppRegistry, Text, TextInput,PixelRatio, View,Image, StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';
class Mlist extends Component {
    constructor(props) {
        super(props);     this.state = {text: ''}
    }
    componentWillMount(){
        alert(this.props.sources);
        this.setState={text:this.props.sources}
    }
    render() {
        let sources =this.props.sources;
        return (
            <View style={styles.container}>
                <View style={styles.rowStyle}>
                    <Image style={styles.image} source={{url:""}} />      
                    <Text style={styles.textStyle}>{this.props.textContent}</Text>
                </View>
                <Image style={[styles.image,styles.item]} source={require('../../../image/tab.png')} />
            </View>
                
                
                );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'space-between',
        flexDirection:'row',
        height:40,
        width:Dimensions.get('window').width,
        backgroundColor: 'white',
        alignItems:'center',
        borderBottomWidth:1/PixelRatio.get(),
        borderColor:'#A0A0A0'
        


    },
    rowStyle:{
        flexDirection:'row',
        flex:1,
        height:25,
    },
    image: {
        width:20,
        height:20
    },
    item: {
      width:20
    },
    textStyle: {
        justifyContent: 'center',
        textAlign:'center',
        fontSize:17,
        marginLeft:10,
    }

});
module.exports = Mlist;
