import { applyPerformancePoints } from "../../utils/gameLogic/performancePointsCalc.js";
import db from "../connection.js";

export async function getCarModels() {
  let result = await db.all("SELECT * FROM car_models");
  result = result.map(applyPerformancePoints);

  return result;
}

export async function getCarModelById(id) {
  let result = await db.get("SELECT * FROM car_models WHERE id = ?", [id]);
  result = applyPerformancePoints(result);
  return result;
}


