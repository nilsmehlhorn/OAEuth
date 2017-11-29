import {Injectable} from '@angular/core';
import ZeroClientProvider from 'web3-provider-engine/zero'

@Injectable()
export class IdentityService {

  private _opts;

  constructor() {
  }

  getAccount(): string {
    return "0x5aeda56215b167893e80b4fe645ba6d5bab767de";
  }

  performTx() {
    return ""
  }

  signMessage(message: string) {
    return "";
  }

  generateToken(): string {
    const tx = this.performTx();
    // assemble header
    const header = {
      alg: "secp256k1",
      typ: "JWT"
    };
    // assemble payload
    const payload = {
      iss: tx,
      sub: "address"
    };
    const encodedHeader = IdentityService.b64EncodeUnicode(JSON.stringify(header));
    const encodedPayload = IdentityService.b64EncodeUnicode(JSON.stringify(payload));
    const message = encodedHeader + "." + encodedPayload;
    const signature = this.signMessage(message);
    const encodedSig = IdentityService.b64EncodeUnicode(JSON.stringify(signature));
    return message + "." + encodedSig;
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
