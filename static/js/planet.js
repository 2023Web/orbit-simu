$(document).ready(setInterval(function() {
  // 获取solar的eclipse_rate
  fetch('/api/eclipse/solar')
    .then(response => response.json())
    .then(data => {
      const solarEclipseRate = data.data.eclipse_rate_solar;

      // 设置CSS动画持续时间
      const solarAnimationDuration = `${solarEclipseRate * 5}s`; 
      document.documentElement.style.setProperty('--animation-duration-solar', solarAnimationDuration);
    })
    .catch(error => {
      console.error('Failed to fetch solar eclipse_rate:', error);
    });

  // 获取lunar的eclipse_rate
  fetch('/api/eclipse/lunar')
    .then(response => response.json())
    .then(data => {
      const lunarEclipseRate = data.data.eclipse_rate_lunar;

      // 设置CSS动画持续时间
      const lunarAnimationDuration = `${lunarEclipseRate * 5}s`; 
      document.documentElement.style.setProperty('--animation-duration-lunar', lunarAnimationDuration);
    })
    .catch(error => {
      console.error('Failed to fetch lunar eclipse_rate:', error);
    });
}), 10);

