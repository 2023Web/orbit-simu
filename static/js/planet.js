$(document).ready(function() {
  const eclipse_rate = 0.7; 
  const animationDuration = `${eclipse_rate * 5}s`; 
  document.documentElement.style.setProperty('--animation-duration', animationDuration);
});
