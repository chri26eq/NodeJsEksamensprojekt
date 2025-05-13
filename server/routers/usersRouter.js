import { Router } from "express";



const router = Router();

router.all("/{*splat}", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
});

router.get("/userscontent", async (req, res) => {
  const userEmail = req.session.user.email;
  

  res.send({ data: userContent });
});

router.patch("/userscontent", (req, res) => {
  const userEmail = req.session.user.email;
  const userContent = req.body;
  updateUserContent(userEmail, userContent);

  res.sendStatus(200)
});

export default router;
