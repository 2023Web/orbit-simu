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
    // TODO: 俯视图
    $(".solar-system").toggleClass("view_3d view_2d");
  } else if (view == 'side') {
    // TODO: 侧视图
  } else if (view == '3d') {
    // TODO: 3d视图
    $(".solar-system").toggleClass("view_3d view_2d");
  }
}

$(document).ready(function() {
  $('input[name="earth_texture"]').change(earth_texture_changed);
  $('input[name="view"]').change(view_changed);
});
