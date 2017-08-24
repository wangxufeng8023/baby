
var mysql = require('mysql');
var fs = require('fs');
var net = require('net');
var express=require('express');
var path=require('path');
var router = express.Router();
var app=express();
var querystring=require('querystring');
var url = require("url");
router.get("/comments",_comments);
router.get("/data",list);
//数据库
router.get("/user",login);
//点赞
router.post("/up",_up);
// video
router.get("/video",_play);
//注册
router.get("/reg",_reg);
//登陆
router.get("/submit",_submit);
function _submit(req,res){
  var data={};
  data.total=36;
  data.ret=true; 
  var b=JSON.stringify(data);
  console.log(req.query.page);
  res.send(b);
}
function _reg(req,res){
  var data={};
  data.total=36;
  data.ret=true; 
  var b=JSON.stringify(data);
  console.log(req.query.page);
  res.send(b);
}
function _play(req,res){
     if(req.url != "/favicon.ico"){
     var pathname = url.parse(req.url).pathname;
     if(pathname == "/home/video"){
          res.writeHead(200, {'Content-Type': 'video/mp4'});  
          var rs = fs.createReadStream('./play.mp4');  
          
          rs.pipe(res);  
          
          rs.on('end',function(){  
            res.end();  
            console.log('end call');  
          });  

     }else if(pathname == "/sp"){
             var datas = fs.readFileSync("./1.html","utf-8")
             res.writeHead(200, {'Content-Type': 'text/html'}); 
             res.write(datas);
             res.end(" ");

     }
 }

}
function _up(req,res){
   var params=req.body;
   var up=params.up;
   console.log(params);
   res.send('yes');

}
function list(req,res){
	//res.header(200,{'Content-Type':'application/json' });

  	var list={};
  	var data={};
  	var page=req.query.page

  	data.array=[{"title":"sdfsdfs","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},{"title":"完美世界","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},{"title":"完美世界","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},
  	{"title":"完美世等待界sdfsd","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},{"title":"完美世界","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},{"title":"完美世界","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},
  	{"title":"sdfsd","http":"https://dummyimage.com/1280x400/000/0011ff","state":false},{"title":"完美世界","http":"https://dummyimage.com/1280x400/000/0011ff","state":false},{"title":"完美世界","http":"https://dummyimage.com/1280x400/000/0011ff","state":true},
     ];
    data.total=36;
    list.data=data; 
    var b=JSON.stringify(list);
    console.log(req.query.page);
  res.send(b);
}
function _comments(req,res){
  //res.header(200,{'Content-Type':'application/json' });

    var list={};
    var data={};
    var page=req.query.page

    data.array=[{"comment":"这是一个完美的注意","replyBy":"小猪","nickname":"小学生","avatar":"https://dummyimage.com/1280x400/000/0011ff"},
     {"comment":"这是一个完美的注意","replyBy":"小猪","nickname":"小学生","avatar":"https://dummyimage.com/1280x400/000/0011ff"},{"comment":"这是一个完美的注意","replyBy":"小猪","nickname":"小学生","avatar":"https://dummyimage.com/1280x400/000/0011ff"},{"comment":"这是一个完美的注意","replyBy":"小猪","nickname":"小学生","avatar":"https://dummyimage.com/1280x400/000/0011ff"},{"comment":"这是一个完美的注意","replyBy":"小猪","nickname":"小学生","avatar":"https://dummyimage.com/1280x400/000/0011ff"},{"comment":"这是一个完美的注意","replyBy":"小猪","nickname":"小学生","avatar":"https://dummyimage.com/1280x400/000/0011ff"}];
    list.data=data; 
    list.ret=true;
    var b=JSON.stringify(list);
    console.log(req.query.page);
  res.send(b);
}
function login(){

	var connection =connect();
	connection.connect(function(err){
		if(err) {
			console.log("链接失败");
		}else{
			console.log('链接成功');
	 		connection.query("select *from user",function(err,result){
	  	    console.log(result);
	        });
	    }
	});
}
// 链接
function connect(){

	var connection = mysql.createConnection({
	host:'127.0.0.1',
	port:3306,
	database:'localApp',
	user:'root',
	password:'caoyanfang',
	});
	return connection;
}
module.exports = router;