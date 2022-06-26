const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId=null;

startBtn.addEventListener("click", isStartBtnPush);
stopBtn.addEventListener("click", isStopBtnPush);

function isStartBtnPush() {
    startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => {bodyEl.style.backgroundColor = getRandomHexColor()}, 1000);
};

    function isStopBtnPush() {
    startBtn.removeAttribute('disabled');
    clearInterval(timerId);
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}