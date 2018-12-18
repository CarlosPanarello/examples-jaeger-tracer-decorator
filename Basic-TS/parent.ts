import { Child } from "./child";

export class Parent {
  private child: Child;
  private fullName: string;

  private myOtherTag: any;

  private myTag: any;

  private mygetHeaderSpan: any;

  constructor(first: string, last: string, sonName: string) {
    this.child = new Child(last, sonName);
    this.fullName = first + " " + last;
  }

  public sayYourSonFullName() {
    let sonName = this.child.sayMyFullName();
    this.myOtherTag = sonName;
    return sonName;
  }

  public sayYourFullName() {
    this.myTag = this.fullName;
    return this.fullName;
  }

  public myGeneratorHeaderTracerMethod(){
    let headers = {"x-api-key": "mySecret"};
    headers = {...this.mygetHeaderSpan, ...headers};
    let opts = { timeout: 3000, headers};
    return opts;
  }
}
