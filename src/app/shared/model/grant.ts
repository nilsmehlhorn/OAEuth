export class Grant {
  target:string;
  issuedAt:number;
  issuerBlock:string;

  constructor(target: string, issuedAt: number, tx: string) {
    this.target = target;
    this.issuedAt = issuedAt;
    this.issuerBlock = tx;
  }
}
