import React, { Component } from 'react';
import { AppRegistry,Text,Navigator,TextInput, ActivityIndicator,RefreshControl,Image,View,TouchableHighlight, StyleSheet,ListView,PixelRatio,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/request';
import Detail from './detail'
import _ from 'lodash';//导入
import Item from './item';



let cacheResults={
  nextPage:0,
  items:[],
  total:0
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (r1, r2)=> r1 !== r2  
            }),
            isLoadingTail:false,
            isRefreshing:false,
            text:'Beautiful',
        
        };
    }

    componentWillMount() {

        this.dsfetchData();
        this.setState({text:'美丽'});

    }
    componentDidMount(){
      var self =this;
      this._fetchData(1);
    }
    //网络请求
  _fetchData(page){
      var self=this;
      if(page!==0){
           self.setState({
        isLoadingTail:true
      });
      }
      else{
           self.setState({
         isRefreshing:true
      });
      }
   

      request.get('http://localhost:3000/home/data',{page:page},function(response){
           return response.json()
           .then(function(newData) {
             let items = cacheResults.items.slice();
             if(page!==0){
                  items =items.concat(newData.data.array);
              cacheResults.nextPage=cacheResults.nextPage+1;
             }
            else{
                   items=newData.data.array.concat(items);
            }
            cacheResults.items=items;
             cacheResults.total=newData.data.total;
             console.log("cacheResults,item",cacheResults.items);
             console.log("totlal",cacheResults.total);
             console.log("length",cacheResults.items.length)+1;
            setTimeout(()=>{
                if(page!==0){
                    self.setState({
                        dataSource: self.state.dataSource.cloneWithRows(cacheResults.items),
                        isLoadingTail:false
                    });
               }else{
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(cacheResults.items),
                    isRefreshing:false
                });
               }
            },2000)
             
          })  

      });
  }
  //初时数据
  dsfetchData(){
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows([
            {"id":"ssdfsdf","title":"小清新","http":"https://dummyimage.com/1280x400/000/0011ff"},
            {"id":"ssdfsdf","title":"小清新","http":"https://dummyimage.com/1280x400/000/0011ff"},
            {"id":"ssdfsdf","title":"小清新","http":"https://dummyimage.com/1280x400/000/0011ff"}
          ]),
      });
  }
//加载更多，上拉
_fetchMoreData=()=>{
      if(!this._hasMore()||this.state.isLoadingTail){
        return 
      }
      let page=cacheResults.nextPage;
      this._fetchData(page);
      

}
//下来刷新
_onRefresh=()=>{

    if(!this._hasMore()|| this.state.isRefreshing){
      return
    }
    this._fetchData();

}
//是否还有数据
_hasMore(){
  console.log();
  return cacheResults.items.length!==cacheResults.total

}

_renderFooter=()=>{
  if(!this._hasMore()&&cacheResults.total!=0){
    return(
     <View style={styles.loadingMore}>
         <Text style={styles.loadingText}>没有更多数据。。。。
         </Text>
      </View>
      );
  }
  if(!this.state.isLoadingTail){
    return <View style={styles.loadingMore} />
  }
  return (
    <ActivityIndicator style={[styles.centering, {backgroundColor: '#eeeeee'}]}/>
    )
}
    render() {
      
   
        return (
          <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.text}>{this.state.text}</Text>

                <TextInput style={styles.input} returnKeyType="search"
                placeholder="请输入关键字" 
                />
              </View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                style={styles.listView}
                automaticallyAdjustContentInsets={false}
                enableEmptySections={true}
                onEndReached={this._fetchMoreData}
                onEndReactedThreshold={20}
                removeClippedSubviews={false}
                renderFooter={this._renderFooter}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={this._onRefresh}
                    />
                }
                />
          </View>
        );
    }

        _loadPage(rowData){
           
        let {navigator}=this.props;
        if(navigator){
            navigator.push({
                name:'detail',
                component:Detail,
                params:{
                  rowData:rowData
                }
            });
        }
    }

    renderRow=(rowData)=>{
    return (
    
        <Item rowData={rowData} onSelect={this._loadPage.bind(this,rowData)}/>

      );

  }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#F5FCFF',
    },
  header: {
      paddingTop:25,
      paddingBottom:12,
      alignItems: 'flex-start',
      backgroundColor: '#ee735c',
      marginTop:Platform.OS=='ios'?20:'',
      flexDirection:'row'
  }, 
  text: {
      height:30,
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      justifyContent:'center'
  },

  input:{
      paddingLeft:20,
      width:180,
      height:30,
      borderWidth:1,
      borderColor:'#ccc',
      borderRadius:8,
      backgroundColor:'#fff'
  },
  listView: {
      paddingTop: 20,
      backgroundColor: 'white',
    },
  
  loadingMore:{
    marginVertical:20
  },
  loadingText:{
    color:'#777',
    fontSize:18,
    textAlign:'center'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

});


module.exports = Home;
