import { applyCarEnhancements } from "../../utils/gameLogic/carEnhancements.js";
import db from "../connection.js";

export async function getUserCarsByUserId(userId) {
  const result = await db.all(
    `
    SELECT 
      user_cars.id AS user_car_id,
      user_cars.upgraded,
      user_cars.favorite,

      car_models.name AS model_name,
      car_models.top_speed,
      car_models.accel_0_to_100,
      car_models.handling,
      car_models.drivetrain,
      car_models.tyres,

      car_brands.name AS brand_name,

      countries.name AS country_name

    FROM user_cars
    JOIN car_models ON user_cars.car_model_id = car_models.id
    JOIN car_brands ON car_models.car_brand_id = car_brands.id
    LEFT JOIN countries ON car_brands.country_code = countries.code
    WHERE user_cars.user_id = ?
    ORDER BY user_cars.favorite DESC
    `,
    [userId]
  );

  return result.map(applyCarEnhancements);
}

export async function getUserCarById(userCarId) {
  const result = await db.get(
    `
    SELECT 
      user_cars.id AS user_car_id,
      user_cars.upgraded,
      user_cars.favorite,

      car_models.name AS model_name,
      car_models.top_speed,
      car_models.accel_0_to_100,
      car_models.handling,
      car_models.drivetrain,
      car_models.tyres,

      car_brands.name AS brand_name,

      countries.name AS country_name

    FROM user_cars
    JOIN car_models ON user_cars.car_model_id = car_models.id
    JOIN car_brands ON car_models.car_brand_id = car_brands.id
    LEFT JOIN countries ON car_brands.country_code = countries.code
    WHERE user_cars.id = ?
    `,
    [userCarId]
  );

  return result ? applyCarEnhancements(result) : null;
}

export async function addCarsToUser(userId, carIds) {
  const placeholders = carIds.map(() => `(?, ?)`).join(", ");
  const flatValues = carIds.flatMap((carId) => [userId, carId]);

  const query = `INSERT INTO user_cars (user_id, car_model_id) VALUES ${placeholders}`;

  await db.run(query, flatValues);
}

export async function updateCarIsFavorite(userCarId, favorite) {
  const result = await db.run(
    "UPDATE user_cars SET favorite = ? WHERE id = ?",
    [favorite ? 1 : 0, userCarId]
  );
  return result.changes > 0;
}

export async function updateCarIsUpgraded(userCarId, upgraded) {
  const result = await db.run(
    "UPDATE user_cars SET upgraded = ? WHERE id = ?",
    [upgraded ? 1 : 0, userCarId]
  );
  return result.changes > 0;
}

export async function removeUserCar(userId, userCarId) {
  const result = await db.run(
    "DELETE FROM user_cars WHERE id = ? AND user_id = ?",
    [userCarId, userId]
  );
  return result.changes > 0;
}


export async function getNewestUserCarsByUserId(userId, nrOfCars) {
  
  const result = await db.all(
    `
    SELECT 
      user_cars.id AS user_car_id,
      user_cars.upgraded,
      user_cars.favorite,

      car_models.name AS model_name,
      car_models.top_speed,
      car_models.accel_0_to_100,
      car_models.handling,
      car_models.drivetrain,
      car_models.tyres,

      car_brands.name AS brand_name,
      countries.name AS country_name

    FROM user_cars
    JOIN car_models ON user_cars.car_model_id = car_models.id
    JOIN car_brands ON car_models.car_brand_id = car_brands.id
    LEFT JOIN countries ON car_brands.country_code = countries.code
    WHERE user_cars.user_id = ?
    ORDER BY user_cars.id DESC
    LIMIT ?
    `,
    [userId, nrOfCars]
  );

  return result.map(applyCarEnhancements);
}



