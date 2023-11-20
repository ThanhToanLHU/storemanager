function EventDispatcher() {
    this.listeners = {};
  
    this.addEventListener = function (event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    };
  
    this.removeEventListener = function (event, callback) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
      }
    };
  
    this.dispatchEvent = function (event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(listener => {
          listener(data);
        });
      }
    };
  }