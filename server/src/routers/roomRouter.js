import { Router } from "express";
import { getUserIdByEmail } from "../database/repos/usersRepo";

const router = Router();

let userEmail;
let userId;

router.all("/rooms/{*splat}", async (req, res, next) => {
  if (req.session.user) {
    userEmail = req.session.user.email;
    userId = await getUserIdByEmail(userEmail);
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
});

router.get("/rooms", async (req, res) => {
    
})

router.post("/rooms", async (req, res) => {
    
})


export default router;
