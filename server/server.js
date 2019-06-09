const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const path = require("path");

//引入本地模块
const model = require('./model');
const userRouter = require("./user");
const ChatModel = model.getModel('chat') 

//express实例
const app = express();

//端口
const PORT = 8088;

//socket.io和express配合使用，需要将socket.io和http的接口统一
const server = require('http').Server(app);
const socket = socketIO(server);

socket.on('connection', function(instance) { //监听前端socket连接
    console.log('有连接进来')
    instance.on('sendMsg', function(data) { //连接建立后，连接实例监听sendMsg的广播消息
        const { from, to, msg } = data;
        const chat_id = [from, to].sort().join('_');
        ChatModel.create({chat_id, from, to, msg}, function(err, doc) {
            socket.emit('receiveMsg', Object.assign({}, doc._doc));
        })
    })
})

//使用body-parser处理请求
app.use(bodyParser.json());

//使用cookie
app.use(cookieParser());

//多级路由
app.use('/user', userRouter);

//静态资源地址
app.use('/', express.static(path.resolve('build')));

app.use(function(req, res, next) {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    return res.sendFile(path.resolve('/build/index.html'));
})

server.listen(PORT, function() {
    console.log("node服务启动成功,端口为:", PORT);
})