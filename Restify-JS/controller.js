var decorators = require("jaeger-tracer-decorator");
const axios = require('axios');
var InternalController = require("./internal.controller.js")

class Controller {

  constructor() {
    this.internal = new InternalController();
  }

  receive(req) {
    this.fakeProcess();
    this.myTag = req.query.value;
    this.internal.myOtherMethod();
    return req.query.value + " receive";
  }

  async send(req) {
    try {
      this.fakeProcess();
      const headers = this.mygetHeaderSpan;
      const opts = { timeout: 3000, headers};
      this.myTag = req.query.value;

      const response = await axios.get(req.query.value, opts);
      return response.data.toString();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  fakeProcess(){
    let limit = this.getRandomInt(10000, 1000000);
    while(limit) {
      limit--;
    }
  }  
}

Controller = decorators.decorateClass(Controller);
decorators.decorateMethod(Controller, "receive");
decorators.decorateMethod(Controller, "send");
decorators.decoratePropertyTag(Controller, "myTag");
decorators.decoratePropertyHeader(Controller, "mygetHeaderSpan");

module.exports = Controller;