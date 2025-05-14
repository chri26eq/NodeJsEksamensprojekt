import db from "../connection.js";

export async function getUserCarsByUserId(userId) {
  const result = await db.all("SELECT * FROM user_cars WHERE user_id = ?", [
    userId,
  ]);

  return result;
}

export async function addCarsToUser(userId, carIds) {
  const placeholders = carIds.map(() => `(?, ?)`).join(", ");
  const flatValues = carIds.flatMap((carId) => [userId, carId]);

  const query = `INSERT INTO user_cars (user_id, car_model_id) VALUES ${placeholders}`;

  await db.run(query, flatValues);
}


