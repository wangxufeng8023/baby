import React, { Component } from 'react';
import { AppRegistry,Text,TextInput, ActivityIndicator,RefreshControl,Image,View,TouchableHighlight, StyleSheet,ListView,PixelRatio,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dimensions from 'Dimensions';
import request from '../common/request';
const {width,height}=Dimensions.get('window');
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {rowData: this.props.rowData,up:this.props.rowData.state}
    }
    
    _up=()=>{

        var self=this;
        console.log("up",self.state.up);
        console.log("up",this.state.rowData)
        let up=!self.state.up;
        let rowData=this.state.rowData;
        let url='';
        let param={
            up:up?'yes':'no'
        }
         request.post('http://localhost:3000/home/up',param,null,function(response){
           if(response){
            console.log(response);
             self.setState({up:up})
           }else{
            alert('网络错误')
           }
         
       });
    }

    render() {
        let rowData=this.state.rowData;
        return (
              
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.item}>
            <Text style={styles.title}>{rowData.title}</Text>
            <View style={styles.imageShow}>
                <Image style={styles.image} source={{uri:rowData.http}} >
                  
              </Image>
               <Image style={styles.image} source={{uri:rowData.http}} >
                  
              </Image>
               <Image style={styles.image} source={{uri:rowData.http}} >
                  
              </Image>
            </View>
            <View style={styles.itemFotter}>
              <View style={styles.handleBox} >
                <Icon style={[styles.up,this.state.up?null:styles.down]} name={this.state.up?'ios-heart':'ios-heart-outline'} size={25} onPress={this._up} />
                <Text style={styles.handleText} onPress={this._up}>点赞</Text>
              </View>

             <View style={styles.handleBox} >
                <Icon style={styles.up} name={'ios-chatbubbles'} size={25} />
                <Text style={styles.handleText}>评论</Text>
             </View>
           </View>

        </View>

      </TouchableHighlight>
                );
    }
}
const styles = StyleSheet.create({
   item:{
      width:width,
      marginBottom:10,
      backgroundColor:'white',
      borderBottomColor:'#ed7b66',
      borderBottomWidth:1/PixelRatio.get(),
  },
  title:{
     fontSize:18,
     padding:10,
     color:'#333'
  },
  image:{
     width:width/3.4,
     height:width*0.27,
     margin:4,
  },
  imageShow:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center'
  },
  play:{
    position:'absolute',
    bottom:14,
    right:14,
    width:46,
    height:46,
    paddingTop:9,
    paddingLeft:18,
    backgroundColor:'transparent',
    borderRadius:23,
    borderWidth:1,
    borderColor:'#000',
    color:'#ed7b66',

  },
  itemFotter:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#eee'
  },
  handleBox:{
    padding:10,
    flexDirection:'row',
    width:width/2-0.5,
    justifyContent:'center',
    backgroundColor:'white'
  },
  up:{
    fontSize:22,
    color:'#ed7b66',
   
  },
  handleText:{
 fontSize:15,
  paddingLeft:10

  },
  down:{
    fontSize:22,
    color:'#333'
  }

});
module.exports = Item;
