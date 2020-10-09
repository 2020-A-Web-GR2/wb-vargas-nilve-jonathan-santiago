import { AES } from 'crypto-ts';
let CryptoTS = require("crypto-ts");

export class CryptoClass {
  key = 'bioapp'
  constructor() {
  }

  encriptar(plaintext:string):string{
    return AES.encrypt(plaintext,this.key).toString()
  }

  desencriptar(ciphertext:string):string{
    const bytes  = AES.decrypt(ciphertext,this.key);
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext
  }
}