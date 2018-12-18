
var decorators = require("jaeger-tracer-decorator");

class InternalController {

  constructor() {
  }

  myOtherMethod() {
    this.fakeProcess();
    return "InternalController";
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  fakeProcess(){
    let limit = this.getRandomInt(100000, 10000000);
    while(limit) {
      limit--;
    }
  }  
}

InternalController = decorators.decorateClass(InternalController);
decorators.decorateMethod(InternalController, "myOtherMethod");

module.exports = InternalController;