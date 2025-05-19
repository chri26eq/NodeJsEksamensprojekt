import { Router } from "express";

import {
  emailExists,
  nicknameExists,
  userCredentialsMatches,
  addUser,
  getNicknameByEmail,
} from "../database/repos/usersRepo.js";

import { sendMail } from "../utils/mailer/mailer.js";
import * as mailTemplate from "../utils/mailer/mailTemplates.js";

const router = Router();

router.post("/auth/signup", async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    if (await emailExists(email)) {
      res.status(409).send({ error: "Email already exists" });
    } else if (await nicknameExists(nickname)) {
      res.status(409).send({ error: "Nickname already exists" });
    } else {
      await addUser(email, password, nickname);
      // sendMail(email, mailTemplate.welcomeSubject, mailTemplate.welcomeContent); // TODO REMOVE COMMENT
      res.send({
        message: "Signup successful",
        email: email,
        nickname: nickname,
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const matches = await userCredentialsMatches(email, password);
    if (matches) {
      const nickname = await getNicknameByEmail(email);
      req.session.user = {
        email: email,
        nickname: nickname
      };
      res.send({
        message: "Login successful",
        email: email,
        nickname: nickname,
      });
    } else {
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: "Logout failed" });
    } else {
      res.send({ message: "Logged out successfully" });
    }
  });
});

router.get("/auth/checksession", (req, res) => {
  if (req.session.user) {
    res.send({ isLoggedIn: true, user: req.session.user });
  } else {
    res.send({ isLoggedIn: false, user: null });
  }
});

export default router;
