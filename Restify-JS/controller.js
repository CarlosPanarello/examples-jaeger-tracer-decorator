const axios = require('axios');
var InternalController = require("./internal.controller.js")


class Controller {

  constructor() {
    this.internal = new InternalController();
  }

  receive(req) {
    this.myTag = req.query.value;
    this.internal.myOtherMethod();
    return req.query.value + " receive";
  }

  async send(req) {
    try {
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
}

module.exports = Controller;