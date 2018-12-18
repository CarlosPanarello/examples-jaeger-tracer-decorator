import { traceable } from "jaeger-tracer-decorator";

@traceable()
export class Child {
  private myLastName: string;
  private myName: string;

  constructor(fathersLastName: string, myName: string) {
    this.myLastName = fathersLastName;
    this.myName = myName;
  }

  @traceable()
  public sayMyFullName() {
    this.fakeProcess();
    return "My name is " + this.myName + " " +  this.myLastName;
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private fakeProcess(){
    let limit = this.getRandomInt(1000000, 100000000);
    while(limit) {
      limit--;
    }
  }
}
