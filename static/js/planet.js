$(document).ready(function() {
  $("#solar_shadow").attr("style", "opacity: 0;");
  $("#lunar_shadow").attr("style", "opacity: 1;");
});

const eclipse_rate = 0.7; 
const animationDuration = `${eclipse_rate * 5}s`; 
document.documentElement.style.setProperty('--animation-duration', animationDuration);