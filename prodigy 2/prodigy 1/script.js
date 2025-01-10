let timer = null;
let elapsedSeconds = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', () => {
  if (!timer) {
    timer = setInterval(updateTime, 1000);
  }
});

document.getElementById('pause').addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  elapsedSeconds = 0;
  updateDisplay(0);
  laps.innerHTML = '';
});
document.getElementById('lap').addEventListener('click', () => {
    const lapTime = formatTime(elapsedSeconds);
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    laps.appendChild(lapElement);
  });
  
  function updateTime() {
    elapsedSeconds++;
    updateDisplay(elapsedSeconds);
  }
  
  function updateDisplay(seconds) {
    display.textContent = formatTime(seconds);
  }
  
  function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }
  