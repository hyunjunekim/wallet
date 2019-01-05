// To communicate with backgroundScript
import {Client} from '../lib/message.js';

function messageLoop(msg) {
  if (msg.result) {
    console.log('OK');
  } else {
    errorMessage('Invalied');
  }
}

window.client = new Client('Event', messageLoop);
// Init UI.

// InitWindow Event
var continueInitButton = document.getElementById('continueInitButton');

function errorMessage(msg) {
  var errorMessage = document.getElementsByClassName('errorMessage');
  errorMessage[0].textContent = msg;
}

continueInitButton.onclick = function() {
  var initPassword = document.getElementById('initPassword');
  var initRepeatPassword = document.getElementById('initRepeatPassword');

  if (initPassword.value != initRepeatPassword.value) {
    errorMessage('Invalied the repeat password');
    return;
  }

  if (initPassword.value.length < 2) {
    errorMessage('Cantains at least two characters');
    return;
  }

  var port = chrome.runtime.connect({ name: 'tronContentScript' });
  var pw = initPassword.value;

  // Send the message to 'backgroundScript'
  client.postMessage({message: {type:'init', password: pw}});
}

// Update the state of 'web app'.
