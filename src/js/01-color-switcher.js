const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
const timerId = 0;

startBtn.addEventListener("click", isStartBtnPush)

function isStartBtnPush() {
    startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => {bodyEl.style.backgroundColor = getRandomHexColor()}, 1000);
};

stopBtn.addEventListener("click", () => {
    startBtn.removeAttribute('disabled');
  clearInterval(timerId);
  });


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}