"use strict";

class Child {

  constructor(fathersLastName, myName) {
    this.myLastName = fathersLastName;
    this.myName = myName;
  }

  sayMyFullName() {
    return "My name is " + this.myName + " " +  this.myLastName;
  }
}

module.exports = Child;