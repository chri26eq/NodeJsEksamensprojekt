import { Router } from "express";
import {
  addToCashBalanceByEmail,
  getCashBalanceByEmail,
  getUserIdByEmail,
  updateCashBalanceByEmail,
} from "../database/repos/usersRepo.js";
import {
  addCarsToUser,
  getNewestUserCarsByUserId,
  updateCarIsUpgraded,
} from "../database/repos/userCarsRepo.js";
import { generateCarPack } from "../utils/gameLogic/carPacks.js";

const router = Router();


let userEmail;
let userId;
let cashBalance;

router.all("/shop/{*splat}", async (req, res, next) => {
  if (req.session.user) {
    userEmail = req.session.user.email;
    userId = req.session.user.id;
    cashBalance = await getCashBalanceByEmail(userEmail);
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
});

router.post("/shop/buypack", async (req, res) => {
  const price = req.body.price;
  const packSize = req.body.packSize;
  try {
    const sufficientFunds = await addToCashBalanceByEmail(
      userEmail,
      -price
    );
    if (!sufficientFunds) {
      res.status(402).send({
        message: "Insufficient funds",
        email: userEmail,
      });
      return;
    }
    
    updateCashBalanceByEmail(userEmail, cashBalance - price);
    const packCars = await generateCarPack(packSize);
    const carIds = packCars.map((car) => car.id);

    await addCarsToUser(userId, carIds);
    const newCars = await getNewestUserCarsByUserId(userId, packSize)
    
    res.send({
      message: "Pack bought",
      email: userEmail,
      cars: newCars,
    });
  } catch (error) {
    console.error("Error during POST: /shop/buypack:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/shop/upgradecar", async (req, res) => {
  const userCarId = req.body.user_car_id;

  try {
    const sufficientFunds = await addToCashBalanceByEmail(userEmail, -2000);
    if (!sufficientFunds) {
      res.status(402).send({
        message: "Insufficient funds",
        email: userEmail,
      });
      return;
    }
    await updateCarIsUpgraded(userCarId, true);
    res.send({
      message: "Car upgraded",
      email: userEmail,
      userCar: userCarId,
    });
  } catch (error) {
    console.error("Error during POST: /shop/upgradecar:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
