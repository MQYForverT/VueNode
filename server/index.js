//以下实例中我们引入了 express 模块
const express = require('express');
//express()函数是express模块导出的顶级函数。app对象通常表示Express应用程序
const app = express();
// bodyParser:node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
const bodyParser = require('body-parser');

//设置服务器跨域权限
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token, Uid');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});


app.use(bodyParser.json());
//extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tour/auth', require(__dirname + '/module/auth'));
app.use('/tour/user', require(__dirname + '/module/user'));
app.use('/tour/coupon', require(__dirname + '/module/coupon'));
app.use('/tour/region', require(__dirname + '/module/region'));
app.use('/tour/banner', require(__dirname + '/module/banner'));
app.use('/tour/article', require(__dirname + '/module/article'));
app.use('/tour/comment', require(__dirname + '/module/comment'));

app.listen(8091, () => {
  console.log('express listen port 8091');
});
