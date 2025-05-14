import { Router } from "express";
import {
  getCashBalanceByEmail,
  getUserIdByEmail,
} from "../database/repos/usersRepo.js";
import { addCarsToUser } from "../database/repos/userCarsRepo.js";

const router = Router();

let userEmail;
let userId;

router.all("/{*splat}", async (req, res, next) => {
  if (req.session.user) {
    userEmail = req.session.user.email;
    userId = await getUserIdByEmail(userEmail);
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
});

router.get("/cashbalance", async (req, res) => {
  
  try {
    const cashBalance = await getCashBalanceByEmail(userEmail);
    res.send({ cashBalance: cashBalance });
  } catch (error) {
    console.error("Error during GET: /cashbalance:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/usercars", async (req, res) => {
  const carIds = req.body.carIds;
  try {
    await addCarsToUser(userId, carIds);
    res.send({
      message: "Cars added",
      email: userEmail,
      cars: carIds
    });
  } catch (error) {
    console.error("Error during POST: /usercars:", error);
    res.status(500).send({ error: "Internal server error" });
  }
  


  res.sendStatus(200);
});

export default router;
