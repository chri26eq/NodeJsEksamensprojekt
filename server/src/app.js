import "dotenv/config";

import express from "express";

const app = express();

app.use(express.static("public")); //bruges ikke
app.use(express.json());

import cors from "cors";
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

import session from "express-session";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(sessionMiddleware);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import gameContentRouter from "./routers/gameContentRouter.js";
app.use(gameContentRouter);
import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);
import shopRouter from "./routers/shopRouter.js";
app.use(shopRouter);

// HTTP server
import http from "http";
const server = http.createServer(app);

import { initSocket } from "./socketServer.js";
initSocket(server, sessionMiddleware);

const PORT = Number(process.env.PORT) || 8080;
server.listen(PORT, () =>
  console.log("Server running on port", server.address().port)
);
