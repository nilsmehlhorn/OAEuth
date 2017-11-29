export class Grant {
  clientId:string;
  issueDate:number;
  iconSrc:string;

  constructor(clientId: string, issueDate: number, iconSrc: string) {
    this.clientId = clientId;
    this.issueDate = issueDate;
    this.iconSrc = iconSrc;
  }
}
