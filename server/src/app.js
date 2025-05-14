import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
import session from "express-session";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import gameContentRouter from "./routers/gameContentRouter.js";
app.use(gameContentRouter);
import usersRouter from "./routers/usersRouter.js"
app.use(usersRouter);


const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () =>
  console.log("Server running on port", server.address().port)
);
