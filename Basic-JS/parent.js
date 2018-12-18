"use strict";
var Child = require("./child")
var decorators = require("jaeger-tracer-decorator");

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

Parent = decorators.decorateClass(Parent);
decorators.decorateMethod(Parent, "sayYourSonFullName");
decorators.decorateMethod(Parent, "sayYourFullName");
decorators.decorateMethod(Parent, "myGeneratorHeaderTracerMethod");
decorators.decoratePropertyTag(Parent, "myOtherTag", "Rename_tag");
decorators.decoratePropertyTag(Parent, "myTag");
decorators.decoratePropertyHeader(Parent, "mygetHeaderSpan");

module.exports = Parent;