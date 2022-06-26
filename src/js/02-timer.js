import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    fieldDays: document.querySelector('span[data-days]'),
    fieldHours: document.querySelector('span[data-hours]'),
    fieldMins: document.querySelector('span[data-minutes]'),
    fieldSecs: document.querySelector('span[data-seconds]')
}
const dateInput = document.querySelector('#datetime-picker');
let currentDate = 0;

refs.startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date) {
            Notiflix.Report.warning('Sorry!', 'Please choose a date in the future', '>', { width: '360px', svgSize: '120px', });
            return;
        };
        refs.startBtn.removeAttribute('disabled');
        currentDate = selectedDates[0];
    
    }
};

flatpickr(dateInput, options);

function pad(value) {
    return String(value).padStart(2, '0');
}

const timer = {
    start() {

        const timerId = setInterval(() => {
            const startTime = Date.now();
            let deltaTime = currentDate - startTime;
            const timeComponents = getTimeComponents(deltaTime);
            
            console.log(timeComponents);
            updateClockFace(deltaTime);

            if (deltaTime <= 0) {
                clearInterval(timerId);
                updateClockFace(0);
        }

        }, 1000);
        
    }
};
refs.startBtn.addEventListener('click', () => {
        timer.start();
   
});

function getTimeComponents(time) {

    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;
    
    const days = pad(Math.floor(time / day));
    const hours = pad(Math.floor((time % day) / hour));
    const mins = pad(Math.floor(((time % day) % hour) / min));
    const secs = pad(Math.floor((((time % day) % hour) % min) / sec));

    return { days, hours, mins, secs };
}
function updateClockFace(deltaTime) {
    refs.fieldDays.textContent = getTimeComponents(deltaTime).days;
    refs.fieldHours.textContent = getTimeComponents(deltaTime).hours;
    refs.fieldMins.textContent = getTimeComponents(deltaTime).mins;
    refs.fieldSecs.textContent = getTimeComponents(deltaTime).secs;

}

