import { calcPerformancePoints } from "../../utils/gameLogic/performancePointsCalc.js";
import db from "../connection.js";

export async function getCarModels() {
  let result = await db.all("SELECT * FROM car_models");
  result = result.map((car) => ({ ...car, pp: calcPerformancePoints(car) }));
  return result;
}

export async function getCarModelById(id) {
  let result = await db.get("SELECT * FROM car_models WHERE id = ?", [id]);
  result = { ...result, pp: calcPerformancePoints(result) };
  return result;
}


