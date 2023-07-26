
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
    return {
      radius: this.radius,
      angle: this.angle + this.speed * this.time_coef * this.clockwise * time_pass,
      orbit_radius: this.orbit_radius,
      orbit_angle: this.orbit_angle + this.orbit_speed * this.time_coef * this.orbit_clockwise * time_pass,
    };
  }
}

// FIXME: 部分参数可能有误，请检查
var planet_coef = {
  solar: {
    radius: 0.0046491, // AU
    speed: 14.713, // degree/day
    angle: 0,
    clockwise: 1,
    orbit_radius: 0, // 太阳可以视为固定在原点
    orbit_speed: 0,
    orbit_angle: 0,
    orbit_clockwise: 1,
  },
  earth: {
    radius: 0.000042634, // AU
    speed: 0.0041781, // degree/s
    angle: 0,
    clockwise: 1, // 北极上空俯视呈逆时针方向旋转
    orbit_radius: 1, // AU
    orbit_speed: 0.986, // degree/day
    orbit_angle: 0,
    orbit_clockwise: 1,
  },
  lunar: {
    radius: 0.000011264, // AU
    speed: 0.0041781, // degree/s
    angle: 0,
    clockwise: 1, // 北极上空俯视呈逆时针方向旋转
    orbit_radius: 0.00257, // AU
    orbit_speed: 13.176358, // degree/day
    orbit_angle: 0,
    orbit_clockwise: 1,
  },
};

var time_coef = 10 / 86400; // 1s = 10day

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
