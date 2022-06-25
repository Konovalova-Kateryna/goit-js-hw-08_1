const form = document.querySelector('.form');
const delayEl = form.elements['delay'];
const stepEl = form.elements['step'];
const amountEl = form.elements['amount'];
const buttonEl = document.querySelector('button');

buttonEl.addEventListener('click', submitForm);
// let delay = 0;
// let position = 0;


function submitForm(evt) {
  evt.preventDefault();
  
  let delay = Number(delayEl.value);
  const delayStep = Number(stepEl.value);
  const total = Number(amountEl.value);
  
  for (let position = 1; position = total; position += 1) {
    
    createPromise({position, delay})
      .then(onSuccess)
      .catch(onError);

    delay += delayStep;
  }
};

function createPromise({position, delay}) {
  return new Promise((resolve, reject) => {
    

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      }
      reject({position, delay});
    }, delay);
  });
  
};


function onSuccess({position, delay}) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }
function onError({position, delay}) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}


