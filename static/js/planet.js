$(document).ready(function() {
  window.last_solar_eclipse = new Date().getTime();
  window.last_lunar_eclipse = new Date().getTime();
  setInterval(function() {
    let now = new Date().getTime();
    // 获取solar的eclipse_rate
    if(now - window.last_solar_eclipse > 5000) {
      fetch('/api/eclipse/solar')
        .then(response => response.json())
        .then(data => {
          const solarEclipseRate = data.data.eclipse_rate;
          // 设置CSS动画持续时间
          const solarAnimationDuration = `${solarEclipseRate * 5}s`; 
          document.documentElement.style.setProperty('--animation-duration-solar', solarAnimationDuration);
        })
        .catch(error => {
          console.error('Failed to fetch solar eclipse_rate:', error);
        });
      window.last_solar_eclipse = now;
    }

    // 获取lunar的eclipse_rate
    if(now - window.last_lunar_eclipse > 5000) {
      fetch('/api/eclipse/lunar')
        .then(response => response.json())
        .then(data => {
          const lunarEclipseRate = data.data.eclipse_rate;

          // 设置CSS动画持续时间
          const lunarAnimationDuration = `${lunarEclipseRate * 5}s`; 
          document.documentElement.style.setProperty('--animation-duration-lunar', lunarAnimationDuration);
        })
        .catch(error => {
          console.error('Failed to fetch lunar eclipse_rate:', error);
        });
      window.last_lunar_eclipse = now;
    }
  }, 100);
});

