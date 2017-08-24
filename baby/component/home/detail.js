import React, { Component } from 'react';
import { AppRegistry, Text,ListView, TouchableOpacity,ScrollView,TextInput,View, StyleSheet,PixelRatio,Image} from 'react-native';
const {width,height}=Dimensions.get('window');
import Dimensions from 'Dimensions';
import request from '../common/request';
import Icon from 'react-native-vector-icons/Ionicons';
class Detail extends Component {
    constructor(props) {
        super(props);  
           this.state = {rowData: this.props.rowData,dataSource:new ListView.DataSource({
                rowHasChanged: (r1, r2)=> r1 !== r2  
            })}
        this.renderRow=this.renderRow.bind(this);
    }
      state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        controls: false,
        paused: true,
        skin: 'custom',
        ignoreSilentSwitch: null,
        isBuffering: false,
  };
  componentDidMount(){
    this._fetchData();
  }
  
  renderRow(rowData_replay){
    console.log(rowData_replay,"rowData_replay");
    return(
        <View style={styles.replyBox}>
            <Image style={styles.replyAvatar}
                   source={{uri:rowData_replay.avatar}}
            ></Image>
            <View style={styles.reply}>
                <Text style={styles.replyNickname}>{rowData_replay.nickname}</Text>
                <Text style={styles.replyComment}>{rowData_replay.comment}</Text>
            </View>
            <Text>slfsldjfsldf</Text>
        </View>
        );
  }
  _fetchData(){
    var self=this;
        request.get('http://localhost:3000/home/comments',null,function(response){
           return response.json()
            .then(function(data) {
                console.log(data.data);
                if(data.ret){
                    self.setState({dataSource: self.state.dataSource.cloneWithRows(data.data)});
                }   
            })
        })
  }
    render() {
        let rowData = this.state.rowData;
        return (
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.backBox} onPress={this._backToHome.bind(this)}>
                    <Icon name="ios-arrow-back"
                          style={styles.backIcon}
                    />
                    <Text style={styles.backText}>返回</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>{this.props.rowData.title}</Text>
              </View>
             
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        style={styles.listView}
                        automaticallyAdjustContentInsets={false}
                        enableEmptySections={true}
                       
                />   

            </View>
        );
    }
    _backToHome=()=>{
         let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:10
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        width:width,
        height:20,
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderColor:'rgba(255,0,0,0.2)',
        backgroundColor:'#fff',
        marginTop:17,
    },
    listView: {
      paddingTop: 20,
      backgroundColor: 'white',
    },
    backBox:{
        position:'absolute',
        left:12,
        top:0,
        width:60,
        flexDirection:'row',
        alignItems:'center'
    },
    backIcon:{
        color:'#999',
        fontSize:16,
        marginRight:5
    },
    backText:{
        color:'#999',
        fontSize:16
    },
    headerText:{
        textAlign:'center',
        fontSize:18,
        color:'red',
        width:width-120,
    },
    comments:{
        flex:1
    },
    replyBox:{
        flexDirection:'row',
        justifyContent:'center',
        width:width,
       marginTop:10,
    },
    replyAvatar:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10,
        marginLeft:10
    },
    reply:{
        flex:1
    },
    replyNickname:{
        color:'red'
    },
    replyComment:{
        marginTop:5,
        color:'blue'
    }


});
module.exports = Detail;
