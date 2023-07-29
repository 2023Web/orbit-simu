# 太阳和月亮日食动画计算

## 后端实现（app.js）

在后端代码中，我们定义了两个函数来计算太阳日食和月食的动画持续时间：

1. `calculateSolarEclipseRate(earth, solar, lunar)`: 用于计算太阳日食的动画持续时间。
2. `calculateLunarEclipseRate(earth, lunar)`: 用于计算月食的动画持续时间。

这两个函数分别接收地球、太阳和月亮的参数，并根据公式计算出太阳和月亮的日食动画持续时间（eclipse_rate_solar 和 eclipse_rate_lunar）。其中，太阳和月亮的半径、地球的公转半径和角度在函数内部进行计算。

接着，在后端代码中，我们使用了Express框架来创建API端点，用于获取太阳和月亮日食动画持续时间的数据。具体地，我们使用了以下路由：

- `GET /api/eclipse/:id`: 该端点接收一个参数`:id`，用于标识是太阳日食还是月食。然后，根据参数选择对应的函数计算日食动画持续时间，并将结果以JSON格式返回给前端。

在处理请求时，为了实时更新动画持续时间，我们使用了`setInterval`函数，每100毫秒更新一次动画。同时，我们还设置了`res.on("finish")`事件来在请求结束时清除定时器。

## 前端实现

前端代码主要使用了JavaScript和CSS来实现日食动画的更新效果。

1. `getEclipseRate(planet)`: 这是一个封装了Ajax请求的函数，用于从后端获取太阳和月亮日食动画持续时间的数据。它接收一个参数`planet`，用于指示是太阳日食还是月食，然后根据参数发起相应的请求，并递归调用自身以实现定时更新。获取数据后，它还会调用`updateAnimationDuration`函数更新CSS动画的持续时间。
2. `updateAnimationDuration(eclipseRate, planet)`: 这个函数用于根据获取的日食动画持续时间更新CSS动画的持续时间，使动画能够实时更新。
3. CSS样式：在CSS样式中，我们定义了`.eclipse`类用于设置日食图形的基本样式，以及`.eclipse-after-solar`、`.eclipse-before-solar`、`.eclipse-after-lunar`和`.eclipse-before-lunar`类来设置不同动画阶段的样式。动画的持续时间通过CSS变量`--animation-duration-planet`来控制，其中`planet`会在前端代码中根据日食类型进行替换。

## 使用方法

1. 后端部分需要在Node.js环境中运行，确保安装了Express等相关依赖，并在后端服务器上监听相应的端口，例如`localhost:3000`。
2. 前端代码会自动从后端获取太阳和月亮日食动画持续时间，并实时更新CSS动画的持续时间，从而展示出日食的动画效果。