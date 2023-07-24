
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

// TODO: 需要添加判断日食月食的代码


module.exports = {
  // FIXME: 为了方便测试，这里的参数都是乱写的
  solar: new Planet(50, 0.01, 0, 1, 0, 0, 0, 1, 1),
  earth: new Planet(10, 0.02, 0, 1, 200, 0.01, 0, 1, 1),
  lunar: new Planet(5, 0.03, 0, 1, 50, 0.02, 0, 1, 1),
};
