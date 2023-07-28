var express = require("express");
var planet_hdl = require("./planet.js");
const path = require("path");
var app = express();

app.use("/static", express.static(path.join(__dirname, "static")));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});
app.get("/index.html", function (req, res) {
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
  };
  next();
}

// /api/planet/:id
app.get(
  "/api/planet/:id",
  function (req, res, next) {
    let id = req.params.id;
    if (planet_hdl.hasOwnProperty(id)) {
      req.planet = planet_hdl[id];
      next();
    } else {
      next("invalid planet id");
    }
  },
  packjson,
  function (req, res) {
    res.json_send(req.planet.get_planet());
  }
);

// 计算太阳日食的eclipse_rate
function calculateSolarEclipseRate(earth, solar, lunar) {
  let solar_radius = solar.radius; // 太阳半径
  let earth_radius = earth.radius; // 地球半径
  let lunar_radius = lunar.radius; // 月球半径

  let earth_orbit_radius = earth.orbit_radius; // 地球公转半径
  let earth_angle = earth.angle; // 地球自转角度
  let earth_orbit_angle = earth.orbit_angle; // 地球公转角度

  let eclipse_angle = Math.abs(earth_orbit_angle - earth_angle);
  let solar_eclipse_radius = solar_radius - earth_orbit_radius;
  let shadow_length = Math.sqrt(
    solar_eclipse_radius ** 2 +
      earth_radius ** 2 -
      2 * solar_eclipse_radius * earth_radius * Math.cos(eclipse_angle)
  );

  let eclipse_rate_solar = 0;
  if (shadow_length <= lunar_radius) {
    eclipse_rate_solar = 1;
  } else if (shadow_length < solar_radius + lunar_radius) {
    eclipse_rate_solar = 1 - (shadow_length - lunar_radius) / solar_radius;
  }
  return eclipse_rate_solar;
}

// 计算月食的eclipse_rate
function calculateLunarEclipseRate(earth, lunar) {
  let earth_radius = earth.radius; // 地球半径
  let lunar_radius = lunar.radius; // 月球半径

  let earth_orbit_radius = earth.orbit_radius; // 地球公转半径
  let earth_orbit_angle = earth.orbit_angle; // 地球公转角度
  let lunar_orbit_angle = lunar.orbit_angle; // 月球公转角度

  let eclipse_angle = Math.abs(lunar_orbit_angle - earth_orbit_angle);
  let lunar_eclipse_radius = lunar_radius - earth_orbit_radius;
  let shadow_length = Math.sqrt(
    lunar_eclipse_radius ** 2 +
      earth_radius ** 2 -
      2 * lunar_eclipse_radius * earth_radius * Math.cos(eclipse_angle)
  );

  let eclipse_rate_lunar = 0;
  if (shadow_length <= lunar_radius) {
    eclipse_rate_lunar = 1;
  } else if (shadow_length < lunar_radius + lunar_radius) {
    eclipse_rate_lunar = 1 - (shadow_length - lunar_radius) / lunar_radius;
  }
  return eclipse_rate_lunar;
}

app.get(
  "/api/eclipse/:id",
  function (req, res, next) {
    let id = req.params.id;
    if (id == "solar" || id == "lunar") {
      req.planet = id;
      next();
    } else {
      next("invalid eclipse id");
    }
  },
  packjson,
  function (req, res) {
    function calculateEclipseRate() {
      let planet = req.planet;
      let solar = planet_hdl["solar"].get_planet();
      let earth = planet_hdl["earth"].get_planet();
      let lunar = planet_hdl["lunar"].get_planet();

      let eclipse_rate = 0;
      if (planet === "solar") {
        eclipse_rate = calculateSolarEclipseRate(earth, solar, lunar);
      } else {
        eclipse_rate = calculateLunarEclipseRate(earth, lunar);
      }

      res.json({
        eclipse_rate: eclipse_rate,
      });
    }

    // Initial calculation on request
    calculateEclipseRate();

    // Set an interval to update the eclipse rate every 100ms for solar
    if (req.params.id === "solar") {
      let intervalId = setInterval(() => {
        calculateEclipseRate().then((data) => {
          const eclipseRate = data.eclipse_rate;
          updateAnimationDuration(eclipseRate, "solar");
        });
      }, 100);

      res.on("finish", () => {
        clearInterval(intervalId);
      });
    }
  }
);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(400).send({
    code: 400,
    message: err,
  });
});

let server = app.listen(8080, "127.0.0.1", function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("server is hosting on http://%s:%s", host, port);
});
