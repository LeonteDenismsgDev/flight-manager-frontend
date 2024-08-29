import { environment } from "environment";
import SecureStorage from 'secure-web-storage';
import CryptoJS from 'crypto-js'
const SECRET_KEY = environment.securityKey;

export const UserSecurity = new SecureStorage(localStorage, {
    hash: function(key: any) {
      return CryptoJS.SHA256(key, SECRET_KEY).toString();
    },
    encrypt: function(data: any) {
      return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    },
    decrypt: function(data: any) {
      return CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
  });