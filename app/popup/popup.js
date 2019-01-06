// To communicate with backgroundScript
import {Client} from '../lib/message.js';

/*************  UI Display ******************/
INIT.style.display = 'none';
LOGIN.style.display = 'none';
MAIN.style.display = 'none';

function changeStatus(stat) {
  var state = {
    INIT : 0,
    LOGIN : 1,
    MAIN: 2,
  };
  INIT.style.display = 'none';
  LOGIN.style.display = 'none';
  MAIN.style.display = 'none';

  if (stat == state.INIT) {
    INIT.style.display = 'block';
  } else if (stat == state.LOGIN) {
    LOGIN.style.display = 'block';
  } else if (stat == state.MAIN) {
    MAIN.style.display = 'block';
  }
}
/********************************************/

/************* Message Loop *****************/
// messageLoop from backgroundScript.
function messageLoop(msg) {
  var message = msg.message;
  if (message.type == 'init') {
    if (message.result) {
      client.postMessage({message: {type:'state'}});
    }
  } else if (message.type == 'state') {
    changeStatus(message.result);
  } else if (message.type == 'login') {
    if (message.result) {
      client.postMessage({message: {type:'state'}});
    } else {
      errorLoginMessage("the password is wrong!!");
    }
  }
}
/*********************************************/

window.client = new Client('Event', messageLoop);

// Get the state of the application.
client.postMessage({message: {type:'state'}});


/************** Step 1 InitWindow Event *****************/

var continueInitButton = document.getElementById('continueInitButton');

function errorInitMessage(msg) {
  var errorMessage = document.getElementById('initError');
  errorMessage.textContent = msg;
}

continueInitButton.onclick = function() {
  var initPassword = document.getElementById('initPassword');
  var initRepeatPassword = document.getElementById('initRepeatPassword');

  if (initPassword.value != initRepeatPassword.value) {
    errorInitMessage('Invalied the repeat password');
    return;
  }

  if (initPassword.value.length < 2) {
    errorInitMessage('Cantains at least two characters');
    return;
  }

  var port = chrome.runtime.connect({ name: 'tronContentScript' });
  var pw = initPassword.value;

  // Send the message to 'backgroundScript' to store 'password'.
  client.postMessage({message: {type:'init', password: pw}});
}

/********************************************************/

/************** Step 2 Login Window Event *****************/

function errorLoginMessage(msg) {
  var errorMessage = document.getElementById('loginError');
  errorMessage.textContent = msg;
}

continueLoginButton.onclick = function() {
  var loginPassword = document.getElementById('loginPassword');
  var pw = loginPassword.value;
  // Send the message to 'backgroundScript' to get 'password'.
  client.postMessage({message: {type:'login', password: pw}});
}

/**********************************************************/
