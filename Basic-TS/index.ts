import { Parent } from "./parent";
import { JaegerTracer, IJaegerOptions } from "jaeger-tracer-decorator";

const optionsJaeger: IJaegerOptions = {
  serviceName: "Basic_Typescript",
  serviceVersion: "2.0.0",
  disable: false,
  sampler: {
    type: "const",
    param: 1,
  },
  reporter: {
    logSpans: true,
    agentHost: "jaeger",
    agentPort: 6832,
  },
};
const jaegerTracer = new JaegerTracer(undefined, undefined, optionsJaeger);

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
