import TronWeb from 'tronweb';
import {Server} from '../lib/message.js';

// MessageHandler from 'popup'
var server = new Server(function(msg) {
  var message = msg.message;
  var type = message.type;

  if (type == 'init') {
    this.postMessage({result: true});
  } else {
  }
});
