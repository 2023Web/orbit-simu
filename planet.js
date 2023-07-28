
class Planet {
  constructor(
      radius, speed, angle, clockwise, // 半径，自转速度，自转角度，顺时针 
      orbit_radius, orbit_speed, orbit_angle, orbit_clockwise, // 轨道半径，公转速度，公转角度， 顺时针
      time_coef, // 时间系数
  ) {
    this.radius = radius;
    this.speed = speed;
    this.angle = angle;
    this.clockwise = clockwise;
    this.orbit_radius = orbit_radius;
    this.orbit_speed = orbit_speed;
    this.orbit_angle = orbit_angle;
    this.orbit_clockwise = orbit_clockwise;
    this.time_coef = time_coef;
    this.init_time = new Date().getTime();
  }
  get_planet() {
    let time_pass = new Date().getTime() - this.init_time;
    let res_angle = this.angle + this.speed * this.time_coef * this.clockwise * time_pass;
    let res_orbit_angle = this.orbit_angle + this.orbit_speed * this.time_coef * this.orbit_clockwise * time_pass;
    res_angle = res_angle - Math.floor(res_angle / 360) * 360;
    res_orbit_angle = res_orbit_angle - Math.floor(res_orbit_angle / 360) * 360;
    return {
      radius: this.radius,
      angle: res_angle,
      orbit_radius: this.orbit_radius,
      orbit_angle: res_orbit_angle,
      cycle: 360 / this.speed * this.time_coef,
      orbit_cycle: 360 / this.orbit_speed * this.time_coef,
    };
  }
}

// FIXME: 为了方便演示，采用的参数并真实值
var planet_coef = {
  solar: {
    radius: 0.0046491, // AU  695500 km = 0.0046491 AU
    speed: 0.0001126, // degree/s   360 degree / 2194560 s 
    angle: 0,
    clockwise: 1,
    orbit_radius: 0, // 太阳可以视为固定在原点
    orbit_speed: 0,
    orbit_angle: 0,
    orbit_clockwise: 1,
  },
  earth: {
    radius: 0.000042587, // AU   6371 km = 0.000042587 AU
    speed: 0.0041781, // degree/s
    angle: 0,
    clockwise: 1, // 北极上空俯视呈逆时针方向旋转
    orbit_radius: 1, // AU
    orbit_speed: 0.986, // degree/day  360 degree / 365 day = 0.986
    orbit_angle: 0,
    orbit_clockwise: 1,
  },
  lunar: {
    radius: 0.000011611, // AU   1737.1 km = 0.000011611 AU
    speed: 0.0001525, // degree/s   360 degree / 2360591 s = 0.00015250418
    angle: 0,
    clockwise: 1, // 北极上空俯视呈逆时针方向旋转
    orbit_radius: 0.00226, // AU    384403 km = 0.002262084336 AU
    orbit_speed: 13.177159, // degree/day  360 degree / 27.32 day = 13.177159
    orbit_angle: 0,
    orbit_clockwise: 1,
  },
};
// var planet_coef = {
//   solar: {
//     radius: 1, // 1 for 100px
//     speed: 360/10, // deg/s
//     angle: 0,
//     clockwise: 1,
//     orbit_radius: 0, // 太阳可以视为固定在原点
//     orbit_speed: 0,
//     orbit_angle: 0,
//     orbit_clockwise: 1,
//   },
//   earth: {
//     radius: 0.8,
//     speed: 360/5, // deg/s
//     angle: 0,
//     clockwise: 1,
//     orbit_radius: 6, // 1 for 100px
//     orbit_speed: 360/10, // deg/s
//     orbit_angle: 0,
//     orbit_clockwise: 1,
//   },
//   lunar: {
//     radius: 0.5,
//     speed: 360/2, // deg/s
//     angle: 0,
//     clockwise: 1,
//     orbit_radius: 2, // 1 for 100px
//     orbit_speed: 360/5, // deg/s
//     orbit_angle: 0,
//     orbit_clockwise: 1,
//   },
// };

// var time_coef = 1 / 864000; // 1s = 10day   1  /  864000
var time_coef = 1;

module.exports = {
  solar: new Planet(
    planet_coef.solar.radius,
    planet_coef.solar.speed,
    planet_coef.solar.angle,
    planet_coef.solar.clockwise,
    planet_coef.solar.orbit_radius,
    planet_coef.solar.orbit_speed,
    planet_coef.solar.orbit_angle,
    planet_coef.solar.orbit_clockwise,
    time_coef,
  ),
  earth: new Planet(
    planet_coef.earth.radius,
    planet_coef.earth.speed,
    planet_coef.earth.angle,
    planet_coef.earth.clockwise,
    planet_coef.earth.orbit_radius,
    planet_coef.earth.orbit_speed,
    planet_coef.earth.orbit_angle,
    planet_coef.earth.orbit_clockwise,
    time_coef,
  ),
  lunar: new Planet(
    planet_coef.lunar.radius,
    planet_coef.lunar.speed,
    planet_coef.lunar.angle,
    planet_coef.lunar.clockwise,
    planet_coef.lunar.orbit_radius,
    planet_coef.lunar.orbit_speed,
    planet_coef.lunar.orbit_angle,
    planet_coef.lunar.orbit_clockwise,
    time_coef,
  ),
};
