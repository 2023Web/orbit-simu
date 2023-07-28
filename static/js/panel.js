// 处理按钮事件

function earth_texture_changed() {
  var texture = $('input[name="earth_texture"]:checked').val();
  console.log('earth_texture_changed: ' + texture);
  if (texture == 'satellite') {
    $("img[name='earth_texture']").attr("src", "static/img/earth_cloud.jpg");
  } else if (texture == 'geographic') {
    $("img[name='earth_texture']").attr("src", "static/img/earth_2K.jpg");
  }
}

function view_changed() {
  var view = $('input[name="view"]:checked').val();
  console.log('view_changed: ' + view);
  if (view == 'top') {
    // 俯视图
    $(".solar-system").removeClass("view_side view_3d");
    $(".solar-system").addClass("view_top");
  } else if (view == 'side') {
    // 侧视图
    $(".solar-system").removeClass("view_top view_3d");
    $(".solar-system").addClass("view_side");
  } else if (view == '3d') {
    // 3d视图
    $(".solar-system").removeClass("view_top view_side");
    $(".solar-system").addClass("view_3d");
  }


  // ajax请求 /api/planet/earth
  $.ajax({
    url: '/api/planet/earth',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      return; 
      let earth_info = data.data;
      // 设置:root元素内部参数
      let radius = earth_info.radius*100;
      let orbit_radius = earth_info.orbit_radius*100;
      let earth_orbit_radius = earth_info.orbit_radius;
      let earth_cycle = earth_info.cycle;
      let earth_orbit_cycle = earth_info.orbit_cycle;
      let earth_angle = earth_info.angle;
      let earth_orbit_angle = earth_info.orbit_angle;
      console.log('earth_cycle: ' + earth_cycle);
      // 设置半径
      document.documentElement.style.setProperty('--earth-radius', radius + 'px');
      document.documentElement.style.setProperty('--earth-orbit-radius', orbit_radius + 'px');
      // 设置周期
      document.documentElement.style.setProperty('--earth-cycle', earth_cycle + 's');
      document.documentElement.style.setProperty('--earth-orbit-cycle', earth_orbit_cycle + 's');
      // 设置起始角
      document.documentElement.style.setProperty('--earth-angle', earth_angle + 'deg');
      document.documentElement.style.setProperty('--earth-orbit-angle', earth_orbit_angle + 'deg');
    },
  });

  // ajax请求 /api/planet/lunar
  $.ajax({
    url: '/api/planet/lunar',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      return; 
      let lunar_info = data.data;
      // 设置:root元素内部参数
      let radius = lunar_info.radius*100;
      let orbit_radius = lunar_info.orbit_radius*100;
      let lunar_orbit_radius = lunar_info.orbit_radius;
      let lunar_cycle = lunar_info.cycle;
      let lunar_orbit_cycle = lunar_info.orbit_cycle;
      let lunar_angle = lunar_info.angle;
      let lunar_orbit_angle = lunar_info.orbit_angle;
      console.log('lunar_cycle: ' + lunar_cycle);
      // 设置半径
      document.documentElement.style.setProperty('--lunar-radius', radius + 'px');
      document.documentElement.style.setProperty('--lunar-orbit-radius', orbit_radius + 'px');
      // 设置周期
      document.documentElement.style.setProperty('--lunar-cycle', lunar_cycle + 's');
      document.documentElement.style.setProperty('--lunar-orbit-cycle', lunar_orbit_cycle + 's');
      // 设置起始角
      document.documentElement.style.setProperty('--lunar-angle', lunar_angle + 'deg');
      document.documentElement.style.setProperty('--lunar-orbit-angle', lunar_orbit_angle + 'deg');
    },
  });

  // ajax请求 /api/planet/solar
  $.ajax({
    url: '/api/planet/solar',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      return; 
      let solar_info = data.data;
      // 设置:root元素内部参数
      let radius = solar_info.radius*100;
      let orbit_radius = solar_info.orbit_radius*100;
      let solar_orbit_radius = solar_info.orbit_radius;
      let solar_cycle = solar_info.cycle;
      let solar_orbit_cycle = solar_info.orbit_cycle;
      let solar_angle = solar_info.angle;
      let solar_orbit_angle = solar_info.orbit_angle;
      console.log('solar_cycle: ' + solar_cycle);
      // 设置半径
      document.documentElement.style.setProperty('--solar-radius', radius + 'px');
      document.documentElement.style.setProperty('--solar-orbit-radius', orbit_radius + 'px');
      // 设置周期
      document.documentElement.style.setProperty('--solar-cycle', solar_cycle + 's');
      document.documentElement.style.setProperty('--solar-orbit-cycle', solar_orbit_cycle + 's');
      // 设置起始角
      document.documentElement.style.setProperty('--solar-angle', solar_angle + 'deg');
      document.documentElement.style.setProperty('--solar-orbit-angle', solar_orbit_angle + 'deg');
    },
  });

  // :root {
  //   /* 公转半径 */
  //   --lunar-orbit-radius: 200px;
  //   --earth-orbit-radius: 600px;
  //   /* 星体半径 */
  //   --earth-radius: 80px;
  //   --lunar-radius: 50px;
  //   --solar-radius: 100px;
  //   /* 自转周期 */
  //   --solar-cycle: 10s;
  //   --earth-cycle: 5s;
  //   --lunar-cycle: 2s;
  //   /* 公转周期 */
  //   --earth-orbit-cycle: 10s;
  //   --lunar-orbit-cycle: 5s;
  // }
}

$(document).ready(function() {
  $('input[name="earth_texture"]').change(earth_texture_changed);
  $('input[name="view"]').change(view_changed);
});
