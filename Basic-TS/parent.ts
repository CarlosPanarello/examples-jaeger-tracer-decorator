import { Child } from "./child";
import { traceable, setTagSpan, getHeaderSpan } from "jaeger-tracer-decorator";

@traceable()
export class Parent {
  private child: Child;
  private fullName: string;

  @setTagSpan("Rename_Tag")
  private myOtherTag: any;
  
  @setTagSpan()
  private myTag: any;

  @getHeaderSpan()
  private mygetHeaderSpan: any;

  constructor(first: string, last: string, sonName: string) {
    this.child = new Child(last, sonName);
    this.fullName = first + " " + last;
  }

  @traceable()
  public sayYourSonFullName() {
    this.fakeProcess();
    let sonName = this.child.sayMyFullName();
    this.myOtherTag = sonName;
    return sonName;
  }

  @traceable()
  public sayYourFullName() {
    this.fakeProcess();
    this.myTag = this.fullName;
    return this.fullName;
  }

  @traceable()
  public myGeneratorHeaderTracerMethod(){
    this.fakeProcess();
    let headers = {"x-api-key": "mySecret"};
    headers = {...this.mygetHeaderSpan, ...headers};
    let opts = { timeout: 3000, headers};
    return opts;
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private fakeProcess(){
    let limit = this.getRandomInt(100000, 10000000);
    while(limit) {
      limit--;
    }
  }
}
