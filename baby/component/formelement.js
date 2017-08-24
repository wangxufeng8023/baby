import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet,PixelRatio } from 'react-native';

class Formelement extends Component {
    constructor(props) {
        super(props);     this.state = {text: ''}
    }
    
    render() {
        return (
                <View style={styles.container}>
                    <Text>{this.props.names}:</Text>
                    <View style={styles.inputText}>
                        <TextInput placeholder={this.props.textcontent}
                           onChangeText={(text) => this.setState({text})}/>
                </View>
                <Text>
                {this.state.text}
                </Text>
                </View>
                );
    }
}
const styles = StyleSheet.create({ container: {flex:1,
                                 alignItems:'center',
                                 flexDirection:'row',
                                 margin:10},

                                 inputText: {
                                 fontSize:10,
                                 borderBottomWidth:1/PixelRatio.get(),
                                 borderColor:'black'
                                   },
});
module.exports = Formelement;
