import {Injectable} from '@angular/core';
import OAEuthContract from '../../../dapp-scratch-wrapper/OAEuthContract'
import {TokenRequest} from "./model/token-request";
import {Observable} from "rxjs/Observable";
import {TransactionReceipt} from "web3/types";
import {Grant} from "./model/grant";
import {Subject} from "rxjs/Subject";

declare var global: any

@Injectable()
export class IdentityService {

  private _contract;

  private _subjectGrants = new Subject<Grant[]>();

  private _subject;

  constructor() {
    this._contract = new OAEuthContract();
  }

  getGrants(): Observable<Grant[]> {
    this._contract.acc.subscribe(subject => {
      console.log("account: ", subject)
      this._subject = subject;
      this.updateGrants();
    });
    return this._subjectGrants.asObservable();
  }

  updateGrants() {
    const dummies = [
      new Grant("Spotify", 1512086400000, "1234"),
      new Grant("Netflix", 1510444800000, "1234")
    ]
    const gHashes = Observable.fromPromise(this._contract.getSubjectGrants(this._subject)) as Observable<string[]>;
    return gHashes
      .flatMap(h => Observable.from(h))
      .map((gHash: string) => {
        return this._contract.getGrantByHash(gHash, this._subject) as Promise<Grant>;
      })
      .flatMap(o => o).toArray()
      .subscribe(grants => {
        return this._subjectGrants.next(dummies.concat(grants))
      })
  }

  signMessage(message: string): Promise<string> {
    const w3 = this._contract.manager.web3;
    return new Promise((resolve, reject) => {
      resolve("----MOCK-SIGNATURE----")
      // w3.eth.personal.sign(message, this._subject, (err, signed) => {
      //   if(err) {
      //     reject(err);
      //   } else {
      //     resolve(signed);
      //   }
      // })
    });
  }

  generateToken(request: TokenRequest): Observable<string> {
    const grant = Observable.fromPromise(this._contract.issueGrant(request.clientId));
    return grant.flatMap((tx: TransactionReceipt) => {
      console.log("tx", tx)
      // assemble header
      const header = {
        alg: "secp256k1",
        typ: "JWT"
      };
      // assemble payload
      const payload = {
        iss: "aepp-oauth",
        sub: this._subject,
        aud: request.clientId,
        jti: tx.transactionHash
      };
      const encodedHeader = IdentityService.b64EncodeUnicode(JSON.stringify(header));
      const encodedPayload = IdentityService.b64EncodeUnicode(JSON.stringify(payload));
      const message = encodedHeader + "." + encodedPayload;
      return Observable.fromPromise(this.signMessage(message))
        .map(signature => {
          const encodedSig = IdentityService.b64EncodeUnicode(JSON.stringify(signature));
          return message + "." + encodedSig;
        });
    })
  }

  private static b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' as any + p1);
      }));
  }

  private static hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function (a) {
      return String.fromCharCode(parseInt(a, 16));
    }).join(""));
  }
}
