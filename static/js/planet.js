// 获取eclipse_rate数据的函数
function getEclipseRate(planet) {
  return fetch(`/api/eclipse/${planet}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(`Failed to fetch ${planet} eclipse_rate:`, error);
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
    const eclipseRate = data.eclipse_rate;
    updateAnimationDuration(1, "solar");
  });

// 使用Ajax获取月球eclipse_rate数据并更新动画持续时间
getEclipseRate("lunar")
  .then((data) => {
    const eclipseRate = data.eclipse_rate;
    updateAnimationDuration(0.5, "lunar");
  });
