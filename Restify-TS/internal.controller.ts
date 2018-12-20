import { traceable, getHeaderSpan, setTagSpan } from "jaeger-tracer-decorator";

@traceable()
export class InternalController {

  constructor() {
  }

  @traceable()
  public myOtherMethod() {
    this.fakeProcess();
    return "InternalController";
  }

  @traceable()
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
