export var password = {
  get : function(fn) {
          chrome.storage.sync.get('walletpassword', fn);
        },
  set : function(pwd, fn) {
          chrome.storage.sync.set({walletpassword : pwd} , fn);
        },
};
