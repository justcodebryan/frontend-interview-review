/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout () {
  // your code here
  let id = setTimeout(null, 0);
  while (id > 0) {
    clearTimeout(id);
    id--;
  }
}

const originalTimeout = window.setTimeout;
const timerList = [];

window.setTimeout = function setTimeout (func, delay) {
  let timerId = originalTimeout(func, delay);
  timerList.push(timerId);
};

window.clearAllTimeout = function () {
  timerList.forEach(timer => {
    return window.clearTimeout(timer);
  });
};