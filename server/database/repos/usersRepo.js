import db from '../connection.js';
import { encrypt, compare } from '../../utils/hashing.js';


export async function emailExists(email) {
  const result = await db.get("SELECT email FROM users WHERE email = ?", [email]);
  
  return !!result;
}


export async function userCredentialsMatches(email, password) {
  const result = await db.get("SELECT password FROM users WHERE email = ?", [email]);

  return await compare(password, result?.password); // hvis der ikke er et result vil compare køre simulateCompareDelay()
}


export async function addUser(email, password) {
  const hashedPassword = await encrypt(password);

  await db.run("INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)", [email, hashedPassword, nickname]);
}





