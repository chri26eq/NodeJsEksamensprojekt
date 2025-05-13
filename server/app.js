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


const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () =>
  console.log("Server running on port", server.address().port)
);
