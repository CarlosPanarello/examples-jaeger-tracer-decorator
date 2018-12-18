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
    this.myTag = req.query.value;
    this.internal.myOtherMethod();
    return req.query.value + " receive";
  }

  async send(req: any) {
    try {
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
}
