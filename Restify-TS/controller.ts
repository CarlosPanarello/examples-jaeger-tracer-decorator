import Axios from "axios";
import { InternalController } from "./internal.controller";

export class Controller {
  public internal: InternalController;
  public myTag: string;
  public mygetHeaderSpan: any;

  constructor() {
    this.myTag = "";
    this.internal = new InternalController();
  }

  receive(req: any) {
    this.fakeProcess();
    this.myTag = req.query.value;
    this.internal.myOtherMethod();
    return req.query.value + " receive";
  }

  async send(req: any) {
    try {
      this.fakeProcess();
      const headers = this.mygetHeaderSpan;
      const opts = { timeout: 3000, headers};
      this.myTag = req.query.value;

      const response = await Axios.get(req.query.value, opts);
      return response.data.toString();
    } catch (error) {
      console.error(error);
      throw error;
    }
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
