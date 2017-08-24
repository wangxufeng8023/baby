/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    View
}
from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
class TabBarView extends Component {


    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}) {
        console.log(value);
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? '#ee735d' : '#ADADAD';
                    let icon =this.props.tabIconNames[i];
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={()=>this.props.goToPage(i)}>
                            <View style={styles.tabItem}>
                                <Icon
                                    style={styles.icon}
                                    name={icon}
                                    size={25}
                                    color={color}
                                    />
                                <Text style={{color: color, fontSize: 12, justifyContent:'center',
        alignItems:'center'}}>
                                    {this.props.tabNames[i]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 20
    },
    tabs: {
        flexDirection: 'row',
        height: 45,
        borderTopColor: '#d9d9d9',
        borderTopWidth:2
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 25,
        height: 25,
        marginBottom: 2,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default TabBarView;