import { Injectable } from '@angular/core';
import {CurrentUserModel} from "../model/currentUserModel";
import { AES, enc } from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private readonly intranetStorageName: string =
    'eyJ-Aa5.sq4x38fw191&_xy7x:70x';

  constructor() {
  }
  set currentUser(values: any) {
    this.setLocalStorageStorage(
      this.intranetStorageName,
      new CurrentUserModel(values)
    );
  }

  get currentUser(): any {
    return this.getLocalStorage(this.intranetStorageName);
  }

  setLocalStorageStorage(key: string, value: any): void {
    const values = {
      ...this.getLocalStorage(key),
      ...value,
    };

    const encrypt = AES.encrypt(
      JSON.stringify(values),
      '4xy4_570x4x3'
    ).toString();

    localStorage.setItem(key, encrypt);
  }

  getLocalStorage(key: string): any {
    const session = localStorage.getItem(key);

    if (!session) {
      return undefined;
    }

    const decrypt = AES.decrypt(session, '4xy4_570x4x3');
    const originalText = decrypt.toString(enc.Utf8);
    return JSON.parse(originalText);
  }
}
