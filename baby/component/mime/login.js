import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet,PixelRatio } from 'react-native';
import request from '../common/request';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: '',
            codeAlreadySend:false,
            vertifyCode:'22222',
            seconds:10,
            logined:false,
            user:null
        }
        this._showVerityfy=this._showVerityfy.bind(this);
        this._getVerifyCode=this._getVerifyCode.bind(this);
        this._login=this._login.bind(this);
        
    }
    
    _showVerityfy=()=>{
        var self=this;
         self.setState({codeAlreadySend:true,seconds:10});
         this._interval=setInterval(()=>{
            if(this.state.seconds===0){
                return clearInterval(this._interval)
            }
            this.setState({
            seconds:this.state.seconds-1
         })},1000);
    }
    componentWillUnmount(){
        this._interval&& clearInterval(this._interval);
    }
    _login=()=>{
         var self=this;
         
        let phoneNumber = this.state.phoneNumber;
        console.log('phoneNumber',phoneNumber);
        let vertifyCode =self.state.vertifyCode;
        if(!phoneNumber){
            alert('验证码不能为空');
        }
        let params={
            phoneNumber:phoneNumber
        };
        request.get('http://localhost:3000/home/submit',null,function(response){
           return response.json()
           .then((data)=>{
            if(data&&data.ret){
                console.log("登陆 ",data);
                self.props.afterLogin(data);
            }
            else{
                alert('网络失败，请尝试')
            }
           })
        }
        )

    }
    _getVerifyCode=()=>{
       
        var self=this;
       // self._showVerityfy();
        let phoneNumber = self.state.phoneNumber;
        if(!phoneNumber){
            alert('验证码不能为空');
        }
        let params={
            phoneNumber:phoneNumber
        };
        request.get('http://localhost:3000/home/reg',null,function(response){
           return response.json()
           .then((data)=>{
            if(data&&data.ret){
                console.log(data);
                self._showVerityfy();
                console.log(self.state.codeAlreadySend);
            }
            else{
                self._showVerityfy();
                alert('网络失败，请尝试')
            }
           })
        }
        )
    }
    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.singupBox}>
                    <Text style={styles.title}>快速登录</Text>
                    <TextInput 
                        placeholder='输入手机号'
                        autoCapitalize={'none'}
                        auotCorrect={false}
                        style={styles.inputField}
                        onChangeText={(text)=>{this.setState({phoneNumber:text})}}/>
                    {this.state.codeAlreadySend?
                    <View style={styles.vertifyCodeBox}>
                        <TextInput 
                            placeholder='输入验证码'
                            autoCapitalize={'none'}
                            auotCorrect={false}
                            style={styles.other}
                            onChangeText={(text)=>{this.setState({vertifyCode:text})}}
                        />
                        {this.state.seconds===0?<View style={styles.countDownBox}>
                            <Text style={styles.countDownText} onPress={this._getVerifyCode}>重新获取</Text>
                        </View>:<View style={styles.countDownBox}>
                            <Text style={styles.countDownText}>剩余{this.state.seconds}s</Text>
                        </View>}
                        
                    </View>:null}

                    {this.state.codeAlreadySend?<View style={styles.btn}>
                        <Text style={styles.btnText} onPress={this._login}>登陆</Text>
                    </View>:<View style={styles.btn}>
                        <Text style={styles.btnText} onPress={this._getVerifyCode}>获取验证码</Text>
                    </View>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
       backgroundColor:'#F5FCFF'
    },
    singupBox:{
        marginTop:30,
        padding:10,
    },
    title:{
        marginBottom:20,
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#555'
    },
    inputField:{
        height:40,
        padding:5,
        color:'#666',
        fontSize:16,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:4,
        marginBottom:10,

    },
       other:{
        height:40,
        width:200,
        padding:5,
        color:'#666',
        fontSize:16,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:4,
        marginBottom:10,

    },
    btn:{
        height:40,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#ee735d'
    },
    btnText:{
        fontSize:16,
        color:"#ee735d",
        fontWeight:'bold'
    },
    vertifyCodeBox:{
        height:40,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    countDownBox:{
        width:100,
        height:40,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#ee735d',
        backgroundColor:'#ee735d',
        marginLeft:5,
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center',


    },
    countDownText:{
        fontSize:16,
        color:'#fff',
        fontWeight:'600'
    }

});
module.exports = Login;