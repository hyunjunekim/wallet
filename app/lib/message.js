// https://developer.chrome.com/extensions/messaging
export function Server(fn) {
  var _this = this;
  this.ports = [];

  chrome.runtime.onConnect.addListener(function(port) {
    _this.ports.push(port);
    fn = fn.bind(port);
    port.onMessage.addListener(fn);
    // When port is disconnected, it will be removed from the list.
    port.onDisconnect.addListener(function(obj) {
                                    var index = _this.ports.indexOf(obj);
                                    if (index >= 0) {
                                        console.log('index :' + index);
                                        _this.ports.splice(index, 1);
                                    }
                                  });
  });
}

export function Client(id, fn) {
  this.port = chrome.runtime.connect({name: id});
  fn = fn.bind(this.port);
  this.port.onMessage.addListener(fn);
  this.postMessage = function(msg) {
                       this.port.postMessage(msg);
                     };
}
