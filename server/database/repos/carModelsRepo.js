import db from "../connection.js";

export async function getCarModels() {
  const result = await db.all("SELECT * FROM car_models");

  return result;
}

export async function getCarModelById(id) {
  const result = await db.all("SELECT * FROM car_models WHERE id = ?", [id]);

  return result;
}
