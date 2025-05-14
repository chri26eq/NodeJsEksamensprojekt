import db from "../connection.js";

export async function getCarBrands() {
  const result = await db.all("SELECT * FROM car_brands");

  return result;
}

export async function getCarBrandById(id) {
  const result = await db.all("SELECT * FROM car_brands WHERE id = ?", [id]);

  return result;
}
