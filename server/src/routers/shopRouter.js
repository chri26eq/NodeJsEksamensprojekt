import { Router } from "express";
import {
  getCashBalanceByEmail,
  getUserIdByEmail,
  updateCashBalanceByEmail,
} from "../database/repos/usersRepo.js";
import { addCarsToUser } from "../database/repos/userCarsRepo.js";
import { generateCarPack } from "../utils/gameLogic/carPacks.js";

const router = Router();

const packPrice = 5000;

let userEmail;
let userId;
let cashBalance;

router.all("/shop/{*splat}", async (req, res, next) => {
  //retrieves all necessities
  userEmail = req.session.user.email;
  userId = await getUserIdByEmail(userEmail);
  cashBalance = await getCashBalanceByEmail(userEmail);
  next();
});

router.post("/shop/buypack", async (req, res) => {
  try {
    if (cashBalance < packPrice) {
      res.status(402).send({
        message: "Insufficient funds",
        email: userEmail,
      });
      return;
    }
    updateCashBalanceByEmail(userEmail, cashBalance - packPrice);
    const cars = await generateCarPack(5);
    const carIds = cars.map((car) => car.id);

    await addCarsToUser(userId, carIds);
    res.send({
      message: "Pack bought",
      email: userEmail,
      cars: carIds,
    });
  } catch (error) {
    console.error("Error during POST: /shop/buypack:", error);
    res.status(500).send({ error: "Internal server error" });
  }

});

export default router;
