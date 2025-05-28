import db from "../connection.js";
import { encrypt, compare } from "../../utils/hashing.js";

export async function getUserById(id) {
  const result = await db.get("SELECT * FROM users WHERE id = ?", [
    id,
  ]);

  return result;
}

export async function emailExists(email) {
  const result = await db.get("SELECT email FROM users WHERE email = ? COLLATE NOCASE", [
    email,
  ]);

  return !!result;
}

export async function nicknameExists(nickname) {
  const result = await db.get("SELECT nickname FROM users WHERE nickname = ?", [
    nickname,
  ]);

  return !!result;
}

export async function userCredentialsMatches(email, password) {
  const result = await db.get("SELECT password FROM users WHERE email = ? COLLATE NOCASE", [
    email,
  ]);

  return await compare(password, result?.password); // hvis der ikke er et result vil compare køre simulateCompareDelay()
}

export async function addUser(email, password, nickname) {
  const hashedPassword = await encrypt(password);
  await db.run(
    "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
    [email, hashedPassword, nickname]
  );
}



export async function getNicknameByEmail(email) {
  const { nickname } = await db.get(
    "SELECT nickname FROM users WHERE email = ?",
    [email]
  );

  return nickname;
}

export async function getUserIdByEmail(email) {
  const { id } = await db.get("SELECT id FROM users WHERE email = ?", [email]);

  return id;
}



export async function getCashBalanceByEmail(email) {
  const { cash_balance } = await db.get(
    "SELECT cash_balance FROM users WHERE email = ?",
    [email]
  );

  return cash_balance;
}

export async function updateCashBalanceByEmail(email, newBalance) {
  const result = await db.run(
    "UPDATE users SET cash_balance = ? WHERE email = ?",
    [newBalance, email]
  );
  
  return result.changes > 0;

}






export async function addToCashBalanceByEmail(email, amount) {
  const oldBalance = await getCashBalanceByEmail(email);
  if (amount < 0 && Math.abs(amount) > oldBalance) {
    return false;
  }
  const result = await updateCashBalanceByEmail(email, oldBalance + amount)
  if (!result) throw new Error("DB error"); 
  return true;
}

