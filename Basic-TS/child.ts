
export class Child {
  private myLastName: string;
  private myName: string;

  constructor(fathersLastName: string, myName: string) {
    this.myLastName = fathersLastName;
    this.myName = myName;
  }

  public sayMyFullName() {
    return "My name is " + this.myName + " " +  this.myLastName;
  }
}
