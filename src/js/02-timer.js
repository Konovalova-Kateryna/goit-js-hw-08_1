import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    fieldDays: document.querySelector('data-days'),
    fieldHours: document.querySelector('data-hours'),
    fieldMins: document.querySelector('data-minutes'),
    fieldSecs: document.querySelector('data-seconds')
}
const dateInput = document.querySelector('#datetime-picker');

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

console.log(flatpickr(dateInput, options));

function pad(value) {
    return String(value).padStart(2, '0');
}

const timer = {
    start() {
            setInterval(() => {
            
            const deltaTime = currentDate - Date.now();
            const { days, hours, mins, secs } = getTimeComponents(deltaTime);
                
                // updateClockFace(deltaTime);
                
            console.log(`${days}:${hours}:${mins}:${secs}`);
            

        }, 1000);
    }
};
refs.startBtn.addEventListener('click', () => {
    timer.start;
    
});

function getTimeComponents(time) {

    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;
    
    const days = Math.floor(time / day);
    const hours = pad(Math.floor((time % day) / hour));
    const mins = pad(Math.floor(((time % day) % hour) / min));
    const secs = pad(Math.floor((((time % day) % hour) % min) / sec));

    return { days, hours, mins, secs };
}
function updateClockFace({ days, hours, mins, secs }) {
    refs.fieldDays.innerHTML = `${days}`;
    refs.fieldHours.textContent = `${hours}`;
    refs.fieldMins.textContent = `${mins}`;
    refs.fieldSecs.textContent = `${secs}`

}


// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}