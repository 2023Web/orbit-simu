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
}

$(document).ready(function() {
  $('input[name="earth_texture"]').change(earth_texture_changed);
  $('input[name="view"]').change(view_changed);
});
