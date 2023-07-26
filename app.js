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
      message: "success",
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
}, packjson, function(req, res) {
  res.json_send(req.planet.get_planet());
});

// /api/eclipse/:id
app.get('/api/eclipse/:id', function(req, res, next) {
  let id = req.params.id;
  if(id == "solar" || id == "lunar") {
    req.planet = id;
    next();
  } else {
    next('invalid eclipse id');
  }
}, packjson, function(req, res) {
  let planet = req.planet;
  let solar = planet_hdl["solar"].get_planet();
  let earth = planet_hdl["earth"].get_planet();
  let lunar = planet_hdl["lunar"].get_planet();
  
  let solar_radius = solar.radius; // 太阳半径
  let earth_radius = earth.radius; // 地球半径
  let lunar_radius = lunar.radius; // 月球半径

  let earth_orbit_radius = earth.orbit_radius; // 地球公转半径
  let lunar_orbit_radius = lunar.orbit_radius; // 月球公转半径

  let earth_angle = earth.angle; // 地球自转角度
  let earth_orbit_angle = earth.orbit_angle; // 地球公转角度
  let lunar_orbit_angle = lunar.orbit_angle; // 月球公转角度

  // TODO: 通过以上信息，计算日食月食程度（eccipse_rate）
  let eclipse_rate = 0; // 0~1: 0表示没发生eclipse，1表示完全eclipse
  if(planet == "solar") {
    // 判断日食程度
  } else {
    // 判断月食程度
  }
  res.json_send({
    eclipse_rate: eclipse_rate,
  });
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