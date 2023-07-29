// 获取eclipse_rate数据的函数（包含定时更新）
function getEclipseRate(planet) {
  return new Promise((resolve, reject) => {
    const fetchData = () => {
      fetch(`/api/eclipse/${planet}`)
        .then((response) => response.json())
        .then((data) => {
          const eclipseRate = data.eclipse_rate;
          updateAnimationDuration(eclipseRate, planet);
          resolve(data); // Resolve the Promise with the data
          // 递归调用，实现定时更新
          setTimeout(fetchData, 1000);
        })
        .catch((error) => {
          console.error(`Failed to fetch ${planet} eclipse_rate:`, error);
          reject(error); // Reject the Promise with the error
          // 请求失败也进行递归调用，继续定时更新
          setTimeout(fetchData, 1000);
        });
    };

    // 初始化第一次请求
    fetchData();
  });
}


// 更新CSS动画持续时间的函数
function updateAnimationDuration(eclipseRate, planet) {
  const animationDuration = `${eclipseRate * 10}s`;
  document.documentElement.style.setProperty(`--animation-duration-${planet}`, animationDuration);
}

// 使用Ajax获取太阳eclipse_rate数据并更新动画持续时间
getEclipseRate("solar")
  .then((data) => {
    const eclipseRate = data.eclipse_rate_solar;
    updateAnimationDuration(eclipseRate, "solar");
  });

// 使用Ajax获取月球eclipse_rate数据并更新动画持续时间
getEclipseRate("lunar")
  .then((data) => {
    const eclipseRate = data.eclipse_rate_lunar;
    updateAnimationDuration(eclipseRate, "lunar");
  });
