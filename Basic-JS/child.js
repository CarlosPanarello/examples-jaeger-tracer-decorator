"use strict";
var decorators = require("jaeger-tracer-decorator");

class Child {

  constructor(fathersLastName, myName) {
    this.myLastName = fathersLastName;
    this.myName = myName;
  }

  sayMyFullName() {
    return "My name is " + this.myName + " " +  this.myLastName;
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

Child = decorators.decorateClass(Child);
decorators.decorateMethod(Child, "sayMyFullName");

module.exports = Child;