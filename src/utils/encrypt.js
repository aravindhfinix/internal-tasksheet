import crypto from 'crypto';
import { Session } from '../modules/v1/employee/models/session-model';

const ENCRYPTION_KEY = process.env.SC_ENCRYPTION_KEY || 'agdjhjdhfjdjshkjgfghnbjkggnhhnbv'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text, encryptionKey = ENCRYPTION_KEY) {
  let iv = Buffer.from(crypto.randomBytes(IV_LENGTH)).toString('hex').slice(0, IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv + ':' + encrypted.toString('hex');
}


export function decrypt(text, encryptionKey = ENCRYPTION_KEY) {
  try {
    let textParts = text.includes(':') ? text.split(':') : [];
    let iv = Buffer.from(textParts.shift() || '', 'binary');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  catch (error) {
    if (error) {
      console.log("error in decrypt")
    }
  }
}


export const createSession=(user)=>{
  return new Promise((resolve, reject) => {
    let tokenParams = {
      user: user,
      time: new Date().valueOf()
    }
    const sessionParam = {
      session_token: encrypt(JSON.stringify(tokenParams)),
      user_id: user._id,
    };

    const session = new Session(sessionParam);
    session.save((error, _session) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(_session);
      }
    });
  });
}