
let Mime = require('../mime/mime');
let Home = require('../home/home');
let More = require('../more/more');
let Login = require('../mime/login');
let Address = require('../address/address');
let Account = require('../mime/account');
import React, {Component} from 'react';
import TabBarView from './TabBarView'
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    View,
    AsyncStorage,
    
}from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'


const tabTitles = ['首页','地址','更多','我的'];
//Tab图标
const tabIcon = [
'md-home','md-compass','ios-more','md-contact'
]
const tabSelectedIcon = [
    require('../../image/10.png'),
    require('../../image/10.png'),
    require('../../image/10.png'),
    require('../../image/10.png')
 

]

class Main extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            logined:false,
            user:null
        };
        this._asyncGetStatus=this._asyncGetStatus.bind(this);

        this._afterLogin=this._afterLogin.bind(this);
    }
    componentDidMount(){

        this._asyncGetStatus();
        console.log("logined",this.logined);
    }
    _afterLogin(user){
        console.log("hahhah");
        var self =this;
            let user2=JSON.stringify(user);
            console.log("user",user);
            console.log("user2",user2);
        AsyncStorage.setItem('user',user2).then(
            ()=>{
                self.setState({
                    logined:true,
                    user:user
                })
            }).done();
        console.log(self.state.user,"aaaaa");
    }
    onChangeTabs = ({i}) => 'light-content';
    _asyncGetStatus(){
        var self=this;
        AsyncStorage.getItem('user').then((data)=>{
            let user;
            let newState={};
            if(data){
                user=JSON.parse(data);
            }
            if(user && user.accessToken){
                newState.logined=true;
                newState.user=user;
            }else{
                newState.logined=false;
            }
            self.setState(newState);
        }).done();
    }
    render() {
        if(!this.state.logined){
            return(
                <View style={styles.container}>
                    <Login afterLogin={this._afterLogin}/>
                </View>
                ) 
                  
            
        }

        return (
            <ScrollableTabView
                renderTabBar={() =>
                    <TabBarView
                        tabNames={tabTitles}
                        tabIconNames={tabIcon}
                        selectedTabIconNames={tabSelectedIcon}/>
                }
                tabBarPosition='bottom'
                locked={true}
                initialPage={0}
                prerenderingSiblingsNumber={1}
                onChangeTab={this.onChangeTabs}>
                <Navigator
                    tabLabel="home"
                    initialRoute={{ name: 'home', component: Home }}
                    //配置场景
                    configureScene=
                        {
                            (route) => {
                                return ({
                                    ...Navigator.SceneConfigs.PushFromRight,
                                    gestures: null
                                });
                            }
                        }
                    renderScene={
                        (route, navigator) =>
                        {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }
                    } />

              
                <Address tabLabel="Address" navigator={this.props.navigator}/>
                <More tabLabel="More" navigator={this.props.navigator}/>
                <Account tabLabel="Account" navigator={this.props.navigator}/>
               
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 20
    },
    value:{
        paddingHorizontal:10,
        paddingVertical:8,
        width:100,
        marginLeft:120,
    }
});

module.exports=Main;
