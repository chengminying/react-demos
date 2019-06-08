const mongoose = require('mongoose');

//连接mongodb
const DB_URL = "mongodb://localhost:27017/job";
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
    console.log("mongoDB连接成功");
})

//model
const models = {
    user: {
        'user': {type: String, require: true},//用户名
        'pwd': {type: String, require: true},//密码
        'type': {type: String, require: true},//用户类型
        'avatar': {type: String, require: true},//用户头像
        'desc': {type: String, require: true},//个人简介
        'title': {type: String, require: true},//职位
        'company': {type: String, require: true},//公司
        'money': {type: String, require: true},//薪资
    },
    chat: {
        'chat_id': {type: String, require: true},//聊天信息id
        'from': {type: String, require: true},//发送者
        'to': {type: String, require: true},//接收者
        'msg': {type: String, require: true},//发送内容
        'create_time': {type: Number, default: new Date().getTime()},//时间戳
        'is_read': {type: String, default: false},//消息是否已读

    }
}

for (let i in models) {
    mongoose.model(i, new mongoose.Schema(models[i]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name);
    }
}