import bcrypt from "bcryptjs";

const saltRounds = 14;

export async function encrypt(password) {
  return await bcrypt.hash(password, saltRounds);
}

export async function compare(password, encryptedPassword) {
  if (encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
  } else {
    await simulateCompareDelay();
    return false;
  }
}

async function simulateCompareDelay() {  // when password is encrypted using 14 salt rounds
  const baseTime = 2050;
  const variation = Math.random() * 50;
  const delay = baseTime + variation;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
