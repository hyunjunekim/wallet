import TronWeb from 'tronweb';
import {Server} from '../lib/message.js';
import {password} from './password.js';
import {state} from './state.js';

// TODO: Clean up the password.
password.get(
  function(result) {
    if (result.walletpassword) {
      state.state = state.LOGIN;
    }
  }
);

// MessageHandler from 'popup'
var server = new Server(function(msg) {
  var ports = this.ports;
  var message = msg.message;
  var type = message.type;

  if (type == 'init') {

    // Init the Window

    var _callback = function() {
    };

    password.get(
      function(result) {
        if (result.walletpassword == undefined) {

          // Create Password.
          password.set(message.password, _callback);

          for (var i = 0; i < ports.length; i++) {
            ports[i].postMessage({message : {type:"init", result: true} });
          }

          // TODO: Clean up, Change the statues.
          state.state = state.LOGIN;
        }
      }
    );
  } else if (type == 'login') {

    password.get(
      function(result) {
        console.log(result.walletpassword);
        var valid = false;
        if (result.walletpassword == message.password) {
          valid = true;
          // TODO: Clean up, Change the statues.
          state.state = state.MAIN;
        }

        for (var i = 0; i < ports.length; i++) {
          ports[i].postMessage({message : {type:"login", result: valid} });
        }
      }
    );
  } else if (type == 'state') {

    // Process the Status.
    for (var i = 0; i < ports.length; i++) {
      ports[i].postMessage({message : {type:"state", result: state.state} });
    }
  }
});
