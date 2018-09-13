// Store the form element
let form = document.getElementsByClassName("js-form")[0],
    phone = document.getElementById('phone'),
    loader = document.getElementById('js-formLoader');


/**
 * [hasWhiteSpace description]
 * @param  {[type]}  string [description]
 * @return {Boolean}        [description]
 */
const hasWhiteSpace = (s) => /\s/g.test(s)

/**
 * [isNumber description]
 * @param  {[type]}  string [description]
 * @return {Boolean}        [description]
 */
const isNumber = (s) => /^\d+$/g.test(s);

/**
 * [CONFIG description]
 * @type {Object}
 */
const CONFIG = {
  'post_location': form.getAttribute('action') ,
  'success_msg': ['Thank you, your interest has been registered and someone will be in touch shortly'],
  'error_msg': []
}

/**
 * [hideFormElements description]
 * @return {[type]} [description]
 */
function hideFormElements() {
  let form_rows = form.getElementsByClassName('form__row'),
      form_button = form.getElementsByClassName('button')[0];

  for(let i = 0; i < form_rows.length; i++) {
    form_rows.item(i).style.display = 'none';
  }
  form_button.style.display = 'none';
}

/**
 * [showMessage description]
 * @param  {[type]} messageArray [description]
 * @param  {[type]} type         [description]
 * @return {[type]}              [description]
 */
function showMessage(messageArray, type){
  let messageEl = form.getElementsByClassName('form__message')[0],
      messageString = '';

  for (let i=0; i < messageArray.length; i++) {
    messageString += `${messageArray[i]}<br />`
  }
  messageEl.innerHTML = messageString;
  messageEl.style.display = 'block';

  if (type === 'error') {
    messageEl.classList.remove('form__message--success')
    messageEl.classList.add('form__message--error')
  } else if (type === 'success') {
    messageEl.classList.remove('form__message--error')
    messageEl.classList.add('form__message--success')
  }

  form.scrollIntoView();
}

/**
 * [sendData description]
 * @return {[type]} [description]
 */
function sendData() {
  let formData = new FormData(form),
      req = new XMLHttpRequest();

  // Define what happens on successful data submission
  req.addEventListener("load", function(event) {
    let response = JSON.parse(req.response);
    CONFIG.error_msg = [];

    loader.style.display = 'none';
    form.classList.remove('form--loading');

    if (req.status === 400 || req.status === 404) {
      for ( let key in response ) {
        CONFIG.error_msg.push(response[key]);
      }
      showMessage(CONFIG.error_msg, 'error');
    } else if (req.status === 404 || req.status === 502) {
      hideFormElements();
    } else {
      showMessage(CONFIG.success_msg, 'success');
      hideFormElements();
    }


  });

  // Set up our request
  req.open("POST", CONFIG.post_location);

  // The data sent is what the user provided in the form
  req.send(formData);
}

/**
 * Handle the form submit event
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
form.addEventListener("submit", function (event) {
  loader.style.display = 'block';
  form.classList.add('form--loading');

  event.preventDefault();
  sendData();
});


/**
 * [description]
 * @return {[type]} [description]
 */
phone.addEventListener('blur', function () {
  /**  Remove any whiteplace from the input **/
  if (hasWhiteSpace(this.value)) {
    this.value = this.value.replace(/\s/g, "");
  }

  /** Add some custom validity messages on conditions **/
  if (this.value.length !== 0) {
    if (this.value.length < 11) {
      this.setCustomValidity(`Number must be at least 11 digits`)
    } else if (this.value.length >= 18) {
      this.setCustomValidity(`Number too long`);
    } else {
      this.setCustomValidity('');
    }
  }
}, false);
