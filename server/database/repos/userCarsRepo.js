import db from "../connection.js";



export async function getUserCarsByUserId(userId) {
  const result = await db.all("SELECT * FROM user_cars WHERE user_id = ?", [userId]);

  return result;
}
