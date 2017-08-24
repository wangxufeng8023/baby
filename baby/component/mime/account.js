import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, AsyncStorage, Modal,StyleSheet,TouchableOpacity,PixelRatio,Image} from 'react-native';
import request from '../common/request';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker'
import Dimensions from 'Dimensions';
const {width,height}=Dimensions.get('window');
let options = {
  title: '选择头像',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'本地相册',
  customButtons: [
    {name: 'vip', title: 'Beautiful'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
          logined:false,
          user:null,
        }
             this._asyncGetStatus=this._asyncGetStatus.bind(this);   
             this._pickPhoto=this._pickPhoto.bind(this);   
             this._editAccount=this._editAccount.bind(this);   
    }
    componentDidMount(){

        this._asyncGetStatus();
        console.log("logined",this.logined);
    }
    _editAccount(){

    }
    _pickPhoto(){
        let self=this;
        ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);

              if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let user=self.state.user;
          
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let avatarUri='data:image/jpeg;base64,' + response.data;
                //上传图床

                user.avatar=avatarUri;
                self.setState({
                 user:user
                });
              }
});
    }
    _asyncGetStatus(){
        var self=this;
        AsyncStorage.getItem('user').then((data)=>{
            let user;
            let newState={};
            console.log("拿不到",data);
            if(data){
                user=JSON.parse(data);
            }
            if(user && user.ret){
                newState.logined=true;
                newState.user=user;
            }else{
                newState.logined=false;
            }
            self.setState(newState);
            console.log(self.state.user,"wangxufeng");
        }).done();
    }

    render() {
            let user =this.state.user;
            console.log("i an account");
            if(!user){
                return <View />
            }
            return (
            <View style={styles.container}>
                <View style={styles.toolBar}>
                    <Text style={styles.toolBartitle}>我的账户</Text>
                    <Text style={styles.toolBarEdit} onPress={this._editAccount}>编辑</Text>
                </View> 
                {user.avatar ?<TouchableOpacity onPress={this._pickPhoto} style={styles.avatarContainer}>
                    <Image style={styles.avatarContainer} source={{uri:user.avattar}}>
                        <View style={styles.avatarBox}>
                            <Image style={styles.avatar} source={{uri:user.avatar}}></Image>
                        </View>
                        <Text style={styles.avatarText}>点击这里可以换头像</Text>
                    </Image>
                </TouchableOpacity>:<View style={styles.avatarContainer}>
                    
                    <TouchableOpacity style={styles.avatarBox} onPress={this._pickPhoto}>
                        <Icon 
                            name='md-add'
                            size={40}
                            style={styles.plusIcon} />

                    </TouchableOpacity>
                    <Text style={styles.avatarText}>添加用户头像</Text>
                </View>
}
                
                
            </View>
        );
    }
}
 const styles = StyleSheet.create({
    

    container:{
        flex:1,
        backgroundColor:'#F5FCFF',

        
    },
    toolBar:{
        flexDirection:'row',
        paddingTop:30,
        paddingBottom:12,
        backgroundColor:'#ee735d',
        height:65,
   },
   toolBartitle:{
        fontSize:16,
        flex:1,
        color:'#fff',
        textAlign:'center',
        fontWeight:'600'

   },
   avatarContainer:{
    flexDirection:'row',
    width:width,
    height:80,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#666'
   },
   avatarText:{
    fontSize:14,
    fontWeight:'600',
    color:'#fff',
    backgroundColor:'transparent'
   },
   avatarBox:{
    margin:10,
    alignItems:'center',
   },
   plusIcon:{
    padding:20,
    paddingLeft:25,
    paddingRight:25,
    borderRadius:10,
    color:'#666',
    backgroundColor:'#fff'
   },
   avatar:{
    marginBottom:10,
    width:width*0.2,
    height:height*0.2,
    borderRadius:width*0.2,
    borderColor:'red',
    borderWidth:1

   },
   toolBarEdit:{
    position:'absolute',
    right:10,
    top:25,
    color:'#fff',
    textAlign:'center',
    fontWeight:'600',
    fontSize:12

   }

});
module.exports = Account;