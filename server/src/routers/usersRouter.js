import { Router } from "express";
import {
  getCashBalanceByEmail,
  getUserIdByEmail,
} from "../database/repos/usersRepo.js";
import {
  addCarsToUser,
  getUserCarsByUserId,
  updateCarIsFavorite,

} from "../database/repos/userCarsRepo.js";
import { applyUpgradeBonus } from "../utils/gameLogic/carUpgrade.js";
import { applyPerformancePoints } from "../utils/gameLogic/performancePointsCalc.js";
const router = Router();

let userEmail;
let userId;

router.all("/users/{*splat}", async (req, res, next) => {
  if (req.session.user) {
    userEmail = req.session.user.email;
    userId = await getUserIdByEmail(userEmail);
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
});

router.get("/users/cashbalance", async (req, res) => {
  try {
    const cashBalance = await getCashBalanceByEmail(userEmail);
    res.send({ cashBalance: cashBalance });
  } catch (error) {
    console.error("Error during GET: /users/cashbalance:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/users/usercars", async (req, res) => {
  const carIds = req.body.carIds;
  try {
    await addCarsToUser(userId, carIds);
    res.send({
      message: "Cars added",
      email: userEmail,
      cars: carIds,
    });
  } catch (error) {
    console.error("Error during POST: /users/usercars:", error);
    res.status(500).send({ error: "Internal server error" });
  }

  res.sendStatus(200);
});

router.get("/users/usercars", async (req, res) => {
  try {
    let cars = await getUserCarsByUserId(userId);
    cars = cars.map(applyPerformancePoints).map(applyUpgradeBonus); //upgrade ændrer ikke performanceppoints, derfor rækkefølgen.
    res.send({
      email: userEmail,
      userCars: cars,
    });
  } catch (error) {
    console.error("Error during GET: /users/usercars:", error);
    res.status(500).send({ error: "Internal server error" });
  }
  
});

router.post("/users/usercars/favorite", async (req, res) => {
  const userCarId = req.body.user_car_id;
  const isFavorite = req.body.favorite;
  try {
    
    updateCarIsFavorite(userCarId, isFavorite);
    res.send({
      message: isFavorite ? "Car added to favorites" : "Car removed from favorites",
      email: userEmail,
      userCar: userCarId,
    });
  } catch (error) {
    console.error("Error during POST: /users/usercars/favorite:", error);
    res.status(500).send({ error: "Internal server error" });
  }

  
});

export default router;
