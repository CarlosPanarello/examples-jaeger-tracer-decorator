"use strict";
require('dotenv').config()
var Parent = require("./parent");
var JaegerTracer = require("jaeger-tracer-decorator").JaegerTracer;

const jaegerTracer = new JaegerTracer();
const parent = new Parent("Homer","Simpson","Bart");

setInterval(() => {
  const sonName = parent.sayYourSonFullName();
  console.log("son's name -->", sonName);
}, 5010);

setInterval(() => {
  const myName = parent.sayYourFullName();
  console.log("my name --> ", myName);
}, 5020);

setInterval(() => {
  const header = parent.myGeneratorHeaderTracerMethod();
  console.log("Header --> ", header);
}, 5030);
