const express = require('express');
const mongoose = require('mongoose');

//端口
const PORT = 8088;

//连接mongodb
const DB_URL = "mongodb://localhost:27017/job";
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
    console.log("mongoDB连接成功");
})

const app = express();

app.listen(PORT, function() {
    console.log("node服务启动成功,端口为:", PORT);
})