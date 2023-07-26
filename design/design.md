# 设计说明

## api部分

使用 `node app.js` 运行服务器，访问 `http://127.0.0.1:8080` 访问网页端。

一共设计了两套 `api` 接口。

`http://127.0.0.1:8080/api/planet/:id` 可以访问星球的信息，其中 `:id` 为星球名字，可以为：
- `solar` 太阳
- `earth` 地球
- `lunar` 月球

返回结果为一个 `json` 格式，内容为：
``` json
{
  "code": 200,
  "message": "请求成功",
  "data": {
    "radius": 0.000011264,
    "angle": 48.36974474020833,
    "orbit_radius": 0.00257,
    "orbit_angle": 152542.32140580696
  }
}
``` 
其中，`radius` 表示星球半径（单位为 `AU`）；
`angle`为星球自旋角度，单位为 `°`；
`orbit_radius` 为星球公转半径（单位为 `AU`）；
`orbit_angle` 为星球公转角度，单位为 `°`。

`http://127.0.0.1:8080/api/eclipse/:id` 可以访问日食或者月食信息，这部分还在开发。