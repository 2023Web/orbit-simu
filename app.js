var express = require('express');
var planet_hdl = require('./planet.js')
const path = require('path');
var app = express();

app.use('/static',express.static(path.join(__dirname, 'static')));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

// packjson: 将返回的数据包装成json格式
function packjson(req, res, next) {
  res.json_send = function (data) {
    res.status(200).json({
      code: 200,
      message: "请求成功",
      data: data,
    });
  }
  next();
}

// /api/planet/:id
app.get('/api/planet/:id', function(req, res, next) {
  let id = req.params.id;
  if (planet_hdl.hasOwnProperty(id)) {
    req.planet = planet_hdl[id];
    next(); 
  } else {
    next('invalid planet id');
  }
}, packjson, function (req, res) {
  res.json_send(req.planet.get_planet());
});

// /api/eclipse/:id
// TODO: 需要添加判断日食月食的代码
app.get('/api/eclipse/:id', function(req, res, next) {
  let id = req.params.id;
  next();
}, packjson, function (req, res) {
  res.end();
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(400).send({
    code: 400,
    message: err
  });
});

let server = app.listen(8080, '127.0.0.1', function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("server is hosting on http://%s:%s", host, port);
});
