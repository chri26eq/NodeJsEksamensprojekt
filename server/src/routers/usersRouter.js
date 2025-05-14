import { Router } from "express";
import { getCashBalanceByEmail } from "../database/repos/usersRepo.js";



const router = Router();

router.all("/{*splat}", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
});

router.get("/cashbalance", async (req, res) => {
  const userEmail = req.session.user.email;
  try {
    const cashBalance = await getCashBalanceByEmail(userEmail)
    res.send({cashBalance: cashBalance})
  } catch (error) {
    console.error("Error during /cashbalance:", error);
    res.status(500).send({ error: "Internal server error" });
  }

});

router.patch("/userscontent", (req, res) => {
  const userEmail = req.session.user.email;
  const userContent = req.body;
  updateUserContent(userEmail, userContent);

  res.sendStatus(200)
});

export default router;
