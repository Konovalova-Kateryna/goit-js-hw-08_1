import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayEl = form.elements['delay'];
const stepEl = form.elements['step'];
const amountEl = form.elements['amount'];
const buttonEl = document.querySelector('button');

buttonEl.addEventListener('click', submitForm);

function submitForm(evt) {
  evt.preventDefault();
  
  let delay = Number(delayEl.value);
  const delayStep = Number(stepEl.value);
  const total = Number(amountEl.value);
  
  for (let i = 1; i <= total; i += 1) {
    
    createPromise({i, delay})
      .then(onSuccess)
      .catch(onError);

    delay += delayStep;
  }
  form.reset();
};

function createPromise({i, delay}) {
  return new Promise((resolve, reject) => {
    

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({i, delay});
      }
      reject({i, delay});
    }, delay);
  });
  
};

function onSuccess({i, delay}) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
  console.log(`✅ Fulfilled promise ${i} in ${delay}ms`);
  }
function onError({i, delay}) {
  Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
  console.log(`❌ Rejected promise ${i} in ${delay}ms`);
}


