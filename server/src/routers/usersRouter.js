import { Router } from "express";
import {
  addToCashBalanceByEmail,
  getCashBalanceByEmail,
  getUserIdByEmail,
} from "../database/repos/usersRepo.js";
import {
  addCarsToUser,
  getUserCar,
  getUserCarsByUserId,
  removeUserCar,
  updateCarIsFavorite,
} from "../database/repos/userCarsRepo.js";
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



router.get("/users/usercars", async (req, res) => {
  try {
    let cars = await getUserCarsByUserId(userId);
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
      message: isFavorite
        ? "Car added to favorites"
        : "Car removed from favorites",
      email: userEmail,
      userCar: userCarId,
    });
  } catch (error) {
    console.error("Error during POST: /users/usercars/favorite:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/users/usercars", async (req, res) => {
  const userCarId = req.body.user_car_id;
  try {
    const car = await getUserCar(userId, userCarId);
    if (!car) {
      return res.status(404).send({ error: "Car not found" });
    }
    const carWasDeleted = await removeUserCar(userId, userCarId);
    if (carWasDeleted) {
      

      await addToCashBalanceByEmail(userEmail, car.value);
      return res.status(200).send({ message: "Car sold", carValue: car.value });
    } else {
      return res.status(400).send({ error: "Car could not be deleted" });
    }
  } catch (error) {
    console.error("Error during DELETE: /users/usercars:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
