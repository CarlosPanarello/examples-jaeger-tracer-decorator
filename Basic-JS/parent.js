"use strict";
var Child = require("./child")

class Parent {

  constructor(first, last, sonName) {
    this.child = new Child(last, sonName);
    this.fullName = first + " " + last;
  }

  sayYourSonFullName() {
    let sonName = this.child.sayMyFullName();
    this.myOtherTag = sonName;
    return sonName;
  }

  sayYourFullName() {
    this.myTag = this.fullName;
    return this.fullName;
  }

  myGeneratorHeaderTracerMethod(){
    let headers = {"x-api-key": "mySecret"};
    headers = {...this.mygetHeaderSpan, ...headers};
    let opts = { timeout: 3000, headers};
    return opts;
  }
}

module.exports = Parent;